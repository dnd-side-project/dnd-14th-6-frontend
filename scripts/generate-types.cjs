#!/usr/bin/env node

/**
 * API Type Generator
 *
 * Swagger JSON을 읽고 태그별 DTO 타입 파일을 생성합니다.
 * - 각 태그 → src/types/api/{tag}.ts
 * - 공유 스키마 → src/types/api/common.ts
 * - barrel → src/types/api/index.ts
 *
 * 사용법:
 *   node scripts/generate-types.cjs                          # 전체 생성
 *   node scripts/generate-types.cjs --path /api/games/options # 해당 태그만
 *   node scripts/generate-types.cjs --tag Games               # 태그 단위
 */

const fs = require("node:fs");
const path = require("node:path");
const swaggerTransformer = require("./swagger-transformer.cjs");
const {
  EXCLUDED_TAGS,
  EXCLUDED_PATHS,
  parseArgs,
  fetchSwagger,
  runBiomeFormat,
  isApiResponseWrapper,
} = require("./shared.cjs");

const TYPES_DIR = path.resolve(__dirname, "../src/types/api");

// 래퍼 스키마 (타입 생성 대상에서 제외)
const WRAPPER_SCHEMAS = new Set(["ApiResponseDto"]);

async function main() {
  const args = parseArgs(process.argv.slice(2));

  console.log(args.spec ? "Reading local Swagger spec..." : "Fetching Swagger spec...");
  const rawSpec = await fetchSwagger(args.spec);
  const spec = swaggerTransformer(rawSpec);

  const schemas = spec.components?.schemas ?? {};
  const paths = spec.paths ?? {};

  // 래퍼 스키마 판별 후 WRAPPER_SCHEMAS에 추가
  for (const [name, schema] of Object.entries(schemas)) {
    if (isApiResponseWrapper(schema)) {
      WRAPPER_SCHEMAS.add(name);
    }
  }

  // 각 태그별 필요 스키마 수집
  const tagSchemas = {};
  for (const [apiPath, methods] of Object.entries(paths)) {
    if (EXCLUDED_PATHS.has(apiPath)) continue;
    for (const [, operation] of Object.entries(methods)) {
      if (typeof operation !== "object" || operation === null) continue;
      const tag = operation.tags?.[0];
      if (!tag || EXCLUDED_TAGS.has(tag)) continue;

      if (!tagSchemas[tag]) tagSchemas[tag] = new Set();
      collectSchemaRefs(operation, schemas, tagSchemas[tag]);
    }
  }

  // 래퍼 스키마 제거
  for (const schemaSet of Object.values(tagSchemas)) {
    for (const name of WRAPPER_SCHEMAS) {
      schemaSet.delete(name);
    }
  }

  // 공유 스키마 찾기 (2개 이상 태그에서 사용)
  const schemaUsage = {};
  for (const [tag, schemaSet] of Object.entries(tagSchemas)) {
    for (const name of schemaSet) {
      if (!schemaUsage[name]) schemaUsage[name] = new Set();
      schemaUsage[name].add(tag);
    }
  }
  const sharedSchemas = new Set(
    Object.entries(schemaUsage)
      .filter(([, tags]) => tags.size > 1)
      .map(([name]) => name),
  );

  // --path, --tag 필터링
  let tagsToGenerate = Object.keys(tagSchemas);
  let filteredShared = sharedSchemas; // 기본: 전체 공유 스키마

  if (args.path) {
    const tag = findTagForPath(paths, args.path);
    if (!tag) {
      console.error(`No tag found for path: ${args.path}`);
      process.exit(1);
    }

    // 해당 endpoint의 스키마만 수집
    const endpointSchemas = new Set();
    const pathMethods = paths[args.path];
    for (const [, operation] of Object.entries(pathMethods)) {
      if (typeof operation === "object" && operation !== null) {
        collectSchemaRefs(operation, schemas, endpointSchemas);
      }
    }
    for (const name of WRAPPER_SCHEMAS) endpointSchemas.delete(name);

    // 기존 태그 파일의 타입 유지 (증분 추가)
    const tagFile = path.join(TYPES_DIR, `${tag.toLowerCase()}.ts`);
    const existingTagTypes = extractExportedTypeNames(tagFile);
    for (const name of existingTagTypes) {
      if (schemas[name] && !WRAPPER_SCHEMAS.has(name)) {
        endpointSchemas.add(name);
        collectSchemaRefs(schemas[name], schemas, endpointSchemas);
        for (const w of WRAPPER_SCHEMAS) endpointSchemas.delete(w);
      }
    }

    // 기존 common.ts 타입 유지
    const commonFile = path.join(TYPES_DIR, "common.ts");
    const existingCommonTypes = extractExportedTypeNames(commonFile);

    // 필터링된 공유 스키마: 현재 태그에서 필요한 것 + 기존 common
    filteredShared = new Set();
    for (const name of endpointSchemas) {
      if (sharedSchemas.has(name)) filteredShared.add(name);
    }
    for (const name of existingCommonTypes) {
      if (schemas[name] && !WRAPPER_SCHEMAS.has(name)) {
        filteredShared.add(name);
      }
    }

    tagSchemas[tag] = endpointSchemas;
    tagsToGenerate = [tag];
  } else if (args.tag) {
    const matchedTag = Object.keys(tagSchemas).find(
      (t) => t.toLowerCase() === args.tag.toLowerCase(),
    );
    if (matchedTag) {
      tagsToGenerate = [matchedTag];
    } else {
      console.error(`No operations found for tag: ${args.tag}`);
      process.exit(1);
    }
  }

  // 디렉토리 생성
  fs.mkdirSync(TYPES_DIR, { recursive: true });

  let created = 0;

  // common.ts (공유 스키마)
  if (filteredShared.size > 0) {
    writeTagFile("common", filteredShared, schemas, new Set());
    created++;
  }

  // 태그별 파일 생성
  for (const tag of tagsToGenerate) {
    const tagSpecific = new Set(
      [...tagSchemas[tag]].filter((name) => !filteredShared.has(name)),
    );
    writeTagFile(tag.toLowerCase(), tagSpecific, schemas, filteredShared);
    created++;
  }

  // barrel index.ts
  generateBarrelIndex();
  created++;

  console.log(`Done! Generated ${created} type files.`);

  // biome 포매팅
  runBiomeFormat(["src/types/api"]);
}

// ── 유틸리티 ──

/**
 * 기존 타입 파일에서 export된 타입 이름 추출 (증분 생성용)
 */
function extractExportedTypeNames(filePath) {
  if (!fs.existsSync(filePath)) return [];
  const content = fs.readFileSync(filePath, "utf-8");
  const names = [];
  const regex = /export (?:interface|type) (\w+)/g;
  for (const match of content.matchAll(regex)) {
    names.push(match[1]);
  }
  return names;
}

function findTagForPath(paths, targetPath) {
  const methods = paths[targetPath];
  if (!methods) return null;
  for (const operation of Object.values(methods)) {
    if (typeof operation === "object" && operation?.tags?.[0]) {
      return operation.tags[0];
    }
  }
  return null;
}

// ── 스키마 참조 수집 ──

/**
 * 객체를 재귀 순회하며 $ref로 참조되는 스키마 이름을 수집
 */
function collectSchemaRefs(obj, schemas, result) {
  if (!obj || typeof obj !== "object") return;
  if (Array.isArray(obj)) {
    for (const item of obj) collectSchemaRefs(item, schemas, result);
    return;
  }
  if (obj.$ref) {
    const name = obj.$ref.split("/").pop();
    if (!result.has(name) && schemas[name]) {
      result.add(name);
      collectSchemaRefs(schemas[name], schemas, result);
    }
    return;
  }
  for (const value of Object.values(obj)) {
    if (typeof value === "object") collectSchemaRefs(value, schemas, result);
  }
}

/**
 * 스키마의 직접 참조만 수집 (재귀 X, import 분석용)
 */
function collectDirectRefs(schema, result) {
  if (!schema || typeof schema !== "object") return;
  if (Array.isArray(schema)) {
    for (const item of schema) collectDirectRefs(item, result);
    return;
  }
  if (schema.$ref) {
    result.add(schema.$ref.split("/").pop());
    return;
  }
  for (const value of Object.values(schema)) {
    if (typeof value === "object") collectDirectRefs(value, result);
  }
}

// ── 타입 변환 ──

/**
 * 스키마를 TypeScript 타입 문자열로 변환
 */
function resolveType(schema) {
  if (!schema) return "unknown";

  if (schema.$ref) return schema.$ref.split("/").pop();

  if (schema.enum) {
    return schema.enum.map((v) => `"${v}"`).join(" | ");
  }

  if (schema.type === "string") return "string";
  if (schema.type === "integer" || schema.type === "number") return "number";
  if (schema.type === "boolean") return "boolean";

  if (schema.type === "array" && schema.items) {
    const itemType = resolveType(schema.items);
    const wrapped = itemType.includes("|") ? `(${itemType})` : itemType;
    return `${wrapped}[]`;
  }

  if (schema.type === "object" && !schema.properties) {
    return "{ [key: string]: unknown }";
  }

  // allOf with single $ref → resolve to that ref
  if (Array.isArray(schema.allOf) && schema.allOf.length === 1) {
    return resolveType(schema.allOf[0]);
  }

  if (schema.allOf) {
    return schema.allOf.map((s) => resolveType(s)).join(" & ");
  }

  if (schema.oneOf || schema.anyOf) {
    return (schema.oneOf || schema.anyOf)
      .map((s) => resolveType(s))
      .join(" | ");
  }

  return "unknown";
}

/**
 * 스키마를 TypeScript 타입 선언 코드로 변환
 */
function generateSchemaCode(name, schema, schemas) {
  if (!schema) return "";

  const nullable = schema.nullable ? " | null" : "";

  // array → type alias
  if (schema.type === "array" && schema.items) {
    const itemType = resolveType(schema.items);
    return `export type ${name} = ${itemType}[]${nullable};\n`;
  }

  // object without properties
  if (schema.type === "object" && !schema.properties) {
    return `export type ${name} = { [key: string]: unknown }${nullable};\n`;
  }

  // $ref alias
  if (schema.$ref) {
    const refType = schema.$ref.split("/").pop();
    return `export type ${name} = ${refType}${nullable};\n`;
  }

  // object with properties → interface
  if (schema.properties || schema.type === "object") {
    const required = new Set(schema.required ?? []);
    const props = schema.properties ?? {};
    const lines = [];

    for (const [propName, propSchema] of Object.entries(props)) {
      const optional = required.has(propName) ? "" : "?";
      let type = resolveType(propSchema);
      if (propSchema.nullable) type += " | null";

      if (propSchema.description) {
        lines.push(`  /** ${propSchema.description} */`);
      }
      lines.push(`  ${propName}${optional}: ${type};`);
    }

    return `export interface ${name} {\n${lines.join("\n")}\n}\n`;
  }

  // allOf → merge or intersection
  if (schema.allOf) {
    const merged = { properties: {}, required: [] };
    let canMerge = true;

    for (const item of schema.allOf) {
      if (item.properties) {
        Object.assign(merged.properties, item.properties);
        merged.required.push(...(item.required ?? []));
      } else if (item.$ref) {
        const refName = item.$ref.split("/").pop();
        const refSchema = schemas[refName];
        if (refSchema?.properties) {
          Object.assign(merged.properties, refSchema.properties);
          merged.required.push(...(refSchema.required ?? []));
        } else {
          canMerge = false;
        }
      } else {
        canMerge = false;
      }
    }

    if (canMerge && Object.keys(merged.properties).length > 0) {
      return generateSchemaCode(name, { type: "object", ...merged }, schemas);
    }

    const types = schema.allOf.map((s) => resolveType(s));
    return `export type ${name} = ${types.join(" & ")}${nullable};\n`;
  }

  // fallback
  const type = resolveType(schema);
  if (type !== "unknown") {
    return `export type ${name} = ${type}${nullable};\n`;
  }

  return `export type ${name} = unknown;\n`;
}

// ── 의존 순서 정렬 ──

function topologicalSort(schemaNames, schemas) {
  const nameSet = new Set(schemaNames);
  const visited = new Set();
  const result = [];

  function visit(name) {
    if (visited.has(name) || !nameSet.has(name)) return;
    visited.add(name);

    const schema = schemas[name];
    if (schema) {
      const refs = new Set();
      collectDirectRefs(schema, refs);
      for (const ref of refs) {
        if (nameSet.has(ref)) visit(ref);
      }
    }
    result.push(name);
  }

  for (const name of schemaNames) visit(name);
  return result;
}

// ── 파일 생성 ──

function writeTagFile(fileName, schemaNames, schemas, sharedSchemas) {
  const filePath = path.join(TYPES_DIR, `${fileName}.ts`);
  const parts = [];

  // 공유 스키마 import
  if (sharedSchemas.size > 0 && fileName !== "common") {
    const allRefs = new Set();
    for (const name of schemaNames) {
      if (schemas[name]) collectDirectRefs(schemas[name], allRefs);
    }
    const neededImports = [...allRefs]
      .filter((name) => sharedSchemas.has(name))
      .sort();
    if (neededImports.length > 0) {
      parts.push(
        `import type { ${neededImports.join(", ")} } from "./common";\n`,
      );
    }
  }

  // 의존 순서로 정렬
  const sorted = topologicalSort(schemaNames, schemas);

  for (const name of sorted) {
    const schema = schemas[name];
    if (!schema) continue;
    parts.push(generateSchemaCode(name, schema, schemas));
  }

  fs.writeFileSync(filePath, parts.join("\n"), "utf-8");
  console.log(`  CREATE ${path.relative(process.cwd(), filePath)}`);
}

function generateBarrelIndex() {
  const files = fs
    .readdirSync(TYPES_DIR)
    .filter((f) => f.endsWith(".ts") && f !== "index.ts")
    .map((f) => f.replace(".ts", ""))
    .sort();

  const content = `${files.map((f) => `export * from "./${f}";`).join("\n")}\n`;
  const indexPath = path.join(TYPES_DIR, "index.ts");
  fs.writeFileSync(indexPath, content, "utf-8");
  console.log(`  CREATE ${path.relative(process.cwd(), indexPath)} (barrel)`);
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
