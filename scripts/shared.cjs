/**
 * 공통 상수 및 유틸리티
 *
 * generate-types.cjs, generate-hooks.cjs에서 공유하는 코드
 */

const { execSync } = require("node:child_process");
const fs = require("node:fs");
const path = require("node:path");

const SWAGGER_URL = "https://dev-api.orvit.net/api-docs-json";
const ROOT_DIR = path.resolve(__dirname, "..");

const EXCLUDED_TAGS = new Set(["App", "SSE Sample"]);
const EXCLUDED_PATHS = new Set(["/api/games/stream"]);

/**
 * CLI 인자 파싱
 * --path /api/games/options, --tag Games, --force, --spec /tmp/swagger.json
 */
function parseArgs(argv) {
  const args = { path: null, tag: null, force: false, spec: null };
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--path" && argv[i + 1]) args.path = argv[++i];
    else if (argv[i] === "--tag" && argv[i + 1]) args.tag = argv[++i];
    else if (argv[i] === "--spec" && argv[i + 1]) args.spec = argv[++i];
    else if (argv[i] === "--force") args.force = true;
  }
  return args;
}

/**
 * Swagger JSON 가져오기
 * --spec 인자가 있으면 로컬 파일에서 읽고, 없으면 네트워크 fetch
 * @param {string | null} specPath - 로컬 JSON 파일 경로 (없으면 fetch)
 */
async function fetchSwagger(specPath) {
  if (specPath) {
    return JSON.parse(fs.readFileSync(specPath, "utf-8"));
  }
  const response = await fetch(SWAGGER_URL);
  if (!response.ok)
    throw new Error(`Failed to fetch swagger: ${response.status}`);
  return response.json();
}

/**
 * biome check --fix 실행
 * @param {string[]} targets - 포매팅 대상 경로 목록
 */
function runBiomeFormat(targets) {
  const existing = targets.filter((t) =>
    fs.existsSync(path.resolve(ROOT_DIR, t)),
  );
  if (existing.length > 0) {
    console.log("Running biome format...");
    execSync(`npx biome check --fix ${existing.join(" ")}`, {
      stdio: "inherit",
      cwd: ROOT_DIR,
    });
  }
}

/**
 * 스키마가 ApiResponse 래핑 패턴인지 확인
 * { properties: { statusCode: ..., success: ..., data: ... } }
 */
function isApiResponseWrapper(schema) {
  const props = schema?.properties;
  return props?.statusCode && props?.success && props?.data;
}

module.exports = {
  SWAGGER_URL,
  ROOT_DIR,
  EXCLUDED_TAGS,
  EXCLUDED_PATHS,
  parseArgs,
  fetchSwagger,
  runBiomeFormat,
  isApiResponseWrapper,
};
