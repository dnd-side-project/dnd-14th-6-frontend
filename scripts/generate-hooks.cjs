#!/usr/bin/env node

/**
 * API Hook Generator
 *
 * Swagger JSON을 읽고 개별 훅 파일을 생성합니다.
 * - GET → src/hooks/query/useXxx.ts (queryOptions + useSuspenseQuery + useQuery)
 * - POST/PUT/DELETE/PATCH → src/hooks/mutation/useXxx.ts (useMutation)
 *
 * 사용법:
 *   node scripts/generate-hooks.cjs                          # 전체 생성
 *   node scripts/generate-hooks.cjs --path /api/games/options # 특정 API만
 *   node scripts/generate-hooks.cjs --tag Games               # 태그 단위
 *   node scripts/generate-hooks.cjs --force                   # 기존 파일 덮어쓰기
 */

const fs = require("node:fs");
const path = require("node:path");
const {
  EXCLUDED_TAGS,
  EXCLUDED_PATHS,
  parseArgs,
  fetchSwagger,
  runBiomeFormat: runBiome,
} = require("./shared.cjs");

const HOOKS_DIR = path.resolve(__dirname, "../src/hooks");
const QUERY_DIR = path.join(HOOKS_DIR, "query");
const MUTATION_DIR = path.join(HOOKS_DIR, "mutation");
const QUERY_KEYS_FILE = path.resolve(
  __dirname,
  "../src/server/query/query-keys.ts",
);

// Swagger spec의 글로벌 security 존재 여부 (fetchSwagger 후 설정)
let hasGlobalSecurity = false;

async function main() {
  const args = parseArgs(process.argv.slice(2));

  console.log(
    args.spec ? "Reading local Swagger spec..." : "Fetching Swagger spec...",
  );
  const spec = await fetchSwagger(args.spec);
  hasGlobalSecurity = Array.isArray(spec.security) && spec.security.length > 0;
  const operations = extractOperations(spec);

  // 제외 필터링 (SSE, App 등)
  const allFiltered = operations.filter(
    (op) => !EXCLUDED_TAGS.has(op.tag) && !EXCLUDED_PATHS.has(op.path),
  );

  // --path, --tag 필터링
  let filtered = allFiltered;

  if (args.path) {
    filtered = filtered.filter((op) => op.path === args.path);
    if (filtered.length === 0) {
      console.error(`No operation found for path: ${args.path}`);
      console.error(
        "Available paths:",
        operations.map((op) => op.path).join(", "),
      );
      process.exit(1);
    }
  }

  if (args.tag) {
    filtered = filtered.filter(
      (op) => op.tag.toLowerCase() === args.tag.toLowerCase(),
    );
    if (filtered.length === 0) {
      console.error(`No operations found for tag: ${args.tag}`);
      process.exit(1);
    }
  }

  // 디렉토리 생성
  fs.mkdirSync(QUERY_DIR, { recursive: true });
  fs.mkdirSync(MUTATION_DIR, { recursive: true });

  let created = 0;
  let skipped = 0;

  for (const op of filtered) {
    const result = generateHookFile(op, args.force);
    if (result === "created") created++;
    else if (result === "skipped") skipped++;
  }

  // query-keys.ts 증분 생성 (기존 훅 + 현재 배치 기준)
  generateQueryKeysFile(allFiltered, filtered);

  console.log(
    `Done! Created: ${created}, Skipped: ${skipped} (already exists)`,
  );

  // biome 포매팅 (스크립트 내부에서 실행하여 pnpm 인자 누출 방지)
  runBiome(["src/hooks", "src/server/query/query-keys.ts"]);
}

/**
 * Swagger spec에서 오퍼레이션 목록 추출
 */
function extractOperations(spec) {
  const operations = [];
  const paths = spec.paths ?? {};
  const schemas = spec.components?.schemas ?? {};

  for (const [apiPath, methods] of Object.entries(paths)) {
    for (const [method, operation] of Object.entries(methods)) {
      if (typeof operation !== "object" || operation === null) continue;
      if (!["get", "post", "put", "delete", "patch"].includes(method)) continue;

      const tag = operation.tags?.[0] ?? "Unknown";
      const operationId = operation.operationId ?? "";

      // 파라미터 추출
      const params = extractParams(operation, apiPath);

      // 응답 타입 추출
      const responseType = extractResponseType(operation, schemas);

      // 요청 바디 타입 추출
      const requestType = extractRequestType(operation, schemas);

      // security 기반 public/private 자동 판별
      // - 글로벌 security 없음 → 전체 public
      // - 글로벌 security 있음 + operation에 security: [] → public
      // - 글로벌 security 있음 + operation에 security 없음 → private (글로벌 상속)
      const operationSecurity = operation.security;
      const isPublicOp =
        !hasGlobalSecurity ||
        (Array.isArray(operationSecurity) && operationSecurity.length === 0);

      operations.push({
        path: apiPath,
        method: method.toUpperCase(),
        tag,
        operationId,
        params,
        responseType,
        requestType,
        isPublicOp,
      });
    }
  }

  return operations;
}

function extractParams(operation, apiPath) {
  const params = [];
  const rawParams = operation.parameters ?? [];

  // Path 파라미터
  const pathParams =
    apiPath.match(/\{(\w+)\}/g)?.map((p) => p.slice(1, -1)) ?? [];
  for (const name of pathParams) {
    const paramSpec = rawParams.find((p) => p.name === name);
    params.push({
      name,
      location: "path",
      type:
        paramSpec?.schema?.type === "number" ||
        paramSpec?.schema?.format === "int32"
          ? "number"
          : "string",
      required: true,
    });
  }

  // Query 파라미터
  for (const param of rawParams) {
    if (param.in !== "query") continue;
    let type = "string";
    if (param.schema?.type === "number" || param.schema?.type === "integer") {
      type = "number";
    }
    if (param.schema?.enum) {
      type = param.schema.enum.map((v) => `"${v}"`).join(" | ");
    }
    params.push({
      name: param.name,
      location: "query",
      type,
      required: param.required ?? false,
    });
  }

  return params;
}

function extractResponseType(operation, schemas) {
  const response = operation.responses?.["200"] ?? operation.responses?.["201"];
  if (!response) return null;

  const schema = response.content?.["application/json"]?.schema;
  if (!schema) return null;

  return resolveTypeName(schema, schemas);
}

function extractRequestType(operation, schemas) {
  const body = operation.requestBody?.content?.["application/json"]?.schema;
  if (!body) return null;
  return resolveTypeName(body, schemas);
}

function resolveTypeName(schema, schemas) {
  if (schema.$ref) {
    return schema.$ref.split("/").pop();
  }

  // allOf with ApiResponseDto → data 속성의 타입
  if (Array.isArray(schema.allOf)) {
    const dataObj = schema.allOf.find(
      (item) => item.properties?.data && !item.$ref?.includes("ApiResponseDto"),
    );
    if (dataObj?.properties?.data) {
      return resolveTypeName(dataObj.properties.data, schemas);
    }
  }

  // 직접 properties에 data가 있는 경우
  if (schema.properties?.data && schema.properties?.statusCode) {
    return resolveTypeName(schema.properties.data, schemas);
  }

  // array 타입
  if (schema.type === "array" && schema.items) {
    const itemType = resolveTypeName(schema.items, schemas);
    return itemType ? `${itemType}[]` : null;
  }

  return null;
}

/**
 * 훅 파일 생성
 */
function generateHookFile(op, force) {
  const isQuery = op.method === "GET";
  const dir = isQuery ? QUERY_DIR : MUTATION_DIR;
  const baseName = buildHookName(op);
  const hookName = isQuery ? `${baseName}Query` : `${baseName}Mutation`;
  const fileName = `${hookName}.ts`;
  const filePath = path.join(dir, fileName);

  if (fs.existsSync(filePath) && !force) {
    console.log(
      `  SKIP ${path.relative(process.cwd(), filePath)} (already exists)`,
    );
    return "skipped";
  }

  const content = isQuery
    ? generateQueryHook(op, hookName)
    : generateMutationHook(op, hookName);

  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`  CREATE ${path.relative(process.cwd(), filePath)}`);
  return "created";
}

/**
 * operationId에서 훅 이름 생성
 * GamesController_getGameOptions → useGetGameOptions
 * GamesController_saveGameSession → useSaveGameSession
 */
function buildHookName(op) {
  const opId = op.operationId;
  // Controller_ prefix 제거
  const name = opId.includes("_") ? opId.split("_").slice(1).join("_") : opId;
  // 첫 글자 대문자
  const pascalName = name.charAt(0).toUpperCase() + name.slice(1);
  return `use${pascalName}`;
}

function isPublic(op) {
  return op.isPublicOp;
}

function buildApiPath(apiPath) {
  // /api/games/options → api/games/options (앞 슬래시 제거)
  return apiPath.startsWith("/") ? apiPath.slice(1) : apiPath;
}

/**
 * 쿼리키 이름 생성
 * /api/games/options → gameOptions
 * /api/users/ranks → ranks
 * /api/users/{userId}/analysis → userAnalysis
 */
function buildQueryKeyName(op) {
  const name = op.operationId;
  const cleanName = name.includes("_")
    ? name.split("_").slice(1).join("_")
    : name;
  // "get" prefix 제거하고 첫 글자 소문자
  const withoutGet = cleanName.startsWith("get")
    ? cleanName.slice(3)
    : cleanName;
  return withoutGet.charAt(0).toLowerCase() + withoutGet.slice(1);
}

/**
 * 쿼리키 팩토리 경로 추출
 * /api/games/options → { domain: "games", detailKey: "options" }
 * /api/tiers → { domain: "tiers", detailKey: "list" }
 */
function getQueryKeyFactoryPath(op) {
  const segments = op.path
    .replace(/^\/api\//, "")
    .split("/")
    .filter((s) => !s.startsWith("{"));
  const domain = segments[0];
  const detailKey =
    segments.length > 1 ? segments[segments.length - 1] : "list";
  return { domain, detailKey };
}

/**
 * query-keys.ts 증분 생성
 * 기존 훅 파일이 존재하는 오퍼레이션 + 현재 배치의 GET 오퍼레이션만 포함
 */
function generateQueryKeysFile(allOperations, currentBatchOps) {
  const allGetOps = allOperations.filter((op) => op.method === "GET");

  // 현재 배치의 GET 경로
  const currentBatchPaths = new Set(
    currentBatchOps.filter((op) => op.method === "GET").map((op) => op.path),
  );

  // 기존 훅 파일이 있거나, 현재 배치에 포함된 GET 오퍼레이션만 선택
  const relevantOps = allGetOps.filter((op) => {
    if (currentBatchPaths.has(op.path)) return true;
    const baseName = buildHookName(op);
    const hookPath = path.join(QUERY_DIR, `${baseName}Query.ts`);
    return fs.existsSync(hookPath);
  });

  if (relevantOps.length === 0) {
    fs.writeFileSync(
      QUERY_KEYS_FILE,
      "export const queryKeys = {};\n",
      "utf-8",
    );
    console.log(
      `  CREATE ${path.relative(process.cwd(), QUERY_KEYS_FILE)} (query keys — empty)`,
    );
    return;
  }

  // 도메인별 그룹핑
  const domains = {};
  for (const op of relevantOps) {
    const { domain, detailKey } = getQueryKeyFactoryPath(op);
    const hasParams = op.params.length > 0;

    if (!domains[domain]) {
      domains[domain] = [];
    }
    domains[domain].push({ detailKey, hasParams });
  }

  // 파일 내용 생성
  const domainEntries = Object.entries(domains)
    .map(([domain, entries]) => {
      const entryLines = entries.map((entry) => {
        if (entry.hasParams) {
          if (entry.detailKey === "list") {
            return `    ${entry.detailKey}: (params: unknown) =>\n      [...queryKeys.${domain}.all, params] as const,`;
          }
          return `    ${entry.detailKey}: (params: unknown) =>\n      [...queryKeys.${domain}.all, "${entry.detailKey}", params] as const,`;
        }
        if (entry.detailKey === "list") {
          return `    ${entry.detailKey}: () => [...queryKeys.${domain}.all] as const,`;
        }
        return `    ${entry.detailKey}: () =>\n      [...queryKeys.${domain}.all, "${entry.detailKey}"] as const,`;
      });

      return `  ${domain}: {\n    all: ["${domain}"] as const,\n${entryLines.join("\n")}\n  },`;
    })
    .join("\n");

  const content = `export const queryKeys = {\n${domainEntries}\n};\n`;

  fs.writeFileSync(QUERY_KEYS_FILE, content, "utf-8");
  console.log(
    `  CREATE ${path.relative(process.cwd(), QUERY_KEYS_FILE)} (query keys)`,
  );
}

/**
 * Query 훅 생성 (GET)
 */
function generateQueryHook(op, hookName) {
  const hasParams = op.params.length > 0;
  const fetchFn = isPublic(op) ? "GET_PUBLIC" : "GET";
  const queryKeyName = buildQueryKeyName(op);
  const apiPath = buildApiPath(op.path);
  const baseName = hookName.replace(/Query$/, "");
  const suspenseHookName = `${baseName}SuspenseQuery`;
  const { domain, detailKey } = getQueryKeyFactoryPath(op);

  const pathParams = op.params.filter((p) => p.location === "path");
  const queryParams = op.params.filter((p) => p.location === "query");

  // 파라미터 인터페이스 생성
  let paramsInterface = "";
  let paramsArg = "";
  let searchParamsObj = "";
  let dynamicPath = `"${apiPath}"`;

  if (hasParams) {
    const interfaceName = `${hookName.slice(3)}Params`;
    const fields = op.params.map((p) => {
      const optional = p.required ? "" : "?";
      return `  ${p.name}${optional}: ${p.type};`;
    });
    paramsInterface = `interface ${interfaceName} {\n${fields.join("\n")}\n}\n\n`;
    paramsArg = `params: ${interfaceName}`;

    // path 파라미터 치환
    if (pathParams.length > 0) {
      let pathTemplate = apiPath;
      for (const p of pathParams) {
        pathTemplate = pathTemplate.replace(
          `{${p.name}}`,
          `\${params.${p.name}}`,
        );
      }
      dynamicPath = `\`${pathTemplate}\``;
    }

    // query 파라미터 변환
    if (queryParams.length > 0) {
      const entries = queryParams.map((p) => {
        if (p.required) {
          return `    ${p.name}: String(params.${p.name}),`;
        }
        return `    ...(params.${p.name} != null && { ${p.name}: String(params.${p.name}) }),`;
      });
      searchParamsObj = `{\n${entries.join("\n")}\n  }`;
    }
  }

  // import 구성
  const imports = [
    `import { queryOptions, useQuery, useSuspenseQuery } from "@tanstack/react-query";`,
    `import { ${fetchFn}, queryKeys } from "@/server";`,
  ];

  if (op.responseType) {
    imports.push(`import type { ${op.responseType} } from "@/types/api";`);
  }

  const responseGeneric = op.responseType ? `<${op.responseType}>` : "";

  // queryFn 구성
  let queryFnBody;
  if (searchParamsObj) {
    queryFnBody = `${fetchFn}${responseGeneric}(${dynamicPath}, ${searchParamsObj})`;
  } else {
    queryFnBody = `${fetchFn}${responseGeneric}(${dynamicPath})`;
  }

  // 쿼리키 (중앙 집중화된 queryKeys 사용)
  const queryKeyCall = hasParams
    ? `queryKeys.${domain}.${detailKey}(params)`
    : `queryKeys.${domain}.${detailKey}()`;

  // queryOptions
  const queryOptionsArgs = hasParams ? `(${paramsArg})` : "()";

  // 훅
  const hookArgs = hasParams ? `(${paramsArg})` : "()";
  const optionsCall = hasParams
    ? `${queryKeyName}QueryOptions(params)`
    : `${queryKeyName}QueryOptions()`;

  return `${imports.join("\n")}

const STALE_TIME = 60 * 1000;
const GC_TIME = 5 * 60 * 1000;

${paramsInterface}export const ${queryKeyName}QueryOptions = ${queryOptionsArgs} =>
  queryOptions({
    queryKey: ${queryKeyCall},
    queryFn: () => ${queryFnBody},
    select: (response) => response.data,
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });

export const ${suspenseHookName} = ${hookArgs} =>
  useSuspenseQuery(${optionsCall});

export const ${hookName} = ${hookArgs} =>
  useQuery(${optionsCall});
`;
}

/**
 * Mutation 훅 생성 (POST/PUT/DELETE/PATCH)
 */
function generateMutationHook(op, hookName) {
  const methodFn = isPublic(op) ? `${op.method}_PUBLIC` : op.method;
  const apiPath = buildApiPath(op.path);

  const pathParams = op.params.filter((p) => p.location === "path");

  const imports = [
    `import { useMutation } from "@tanstack/react-query";`,
    `import { ${methodFn} } from "@/server";`,
  ];

  const typeImports = [];
  if (op.requestType) typeImports.push(op.requestType);
  if (op.responseType) typeImports.push(op.responseType);

  if (typeImports.length > 0) {
    imports.push(
      `import type { ${typeImports.join(", ")} } from "@/types/api";`,
    );
  }

  const responseGeneric = op.responseType ? `<${op.responseType}>` : "";

  // path params와 request body를 분리하여 처리
  let mutationFnBody;
  let mutationFnArgs;
  let paramsInterface = "";
  let dynamicPath = `"${apiPath}"`;

  if (pathParams.length > 0) {
    // Variables 인터페이스: path params + body 분리
    const variablesInterfaceName = `${hookName.slice(3)}Variables`;
    const pathParamFields = pathParams.map((p) => `  ${p.name}: ${p.type};`);
    const bodyField = op.requestType ? [`  body: ${op.requestType};`] : [];

    const allFields = [...pathParamFields, ...bodyField];
    paramsInterface = `export interface ${variablesInterfaceName} {\n${allFields.join("\n")}\n}\n\n`;
    mutationFnArgs = `(variables: ${variablesInterfaceName})`;

    let pathTemplate = apiPath;
    for (const p of pathParams) {
      pathTemplate = pathTemplate.replace(
        `{${p.name}}`,
        `\${variables.${p.name}}`,
      );
    }
    dynamicPath = `\`${pathTemplate}\``;

    const bodyArg = op.requestType ? ", variables.body" : "";
    mutationFnBody = `${methodFn}${responseGeneric}(${dynamicPath}${bodyArg})`;
  } else if (op.requestType) {
    mutationFnArgs = `(data: ${op.requestType})`;
    mutationFnBody = `${methodFn}${responseGeneric}(${dynamicPath}, data)`;
  } else {
    mutationFnArgs = "()";
    mutationFnBody = `${methodFn}${responseGeneric}(${dynamicPath})`;
  }

  return `${imports.join("\n")}

${paramsInterface}export const ${hookName} = () =>
  useMutation({
    mutationFn: ${mutationFnArgs} =>
      ${mutationFnBody},
  });
`;
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
