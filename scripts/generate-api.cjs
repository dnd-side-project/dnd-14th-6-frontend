#!/usr/bin/env node

/**
 * API Generator (types + hooks)
 *
 * Swagger JSON을 한 번만 fetch한 뒤 임시 파일로 저장하고,
 * generate-types.cjs → generate-hooks.cjs 순서로 실행합니다.
 * 동일한 --path/--tag/--force 인자를 두 스크립트 모두에 전달합니다.
 */

const { execSync } = require("node:child_process");
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { fetchSwagger, SWAGGER_URL } = require("./shared.cjs");

const args = process.argv.slice(2).join(" ");
const cwd = path.resolve(__dirname, "..");

async function main() {
  // Swagger JSON을 한 번만 fetch
  console.log(`Fetching Swagger spec from ${SWAGGER_URL}...`);
  const spec = await fetchSwagger();
  const specFile = path.join(os.tmpdir(), "orvit-swagger-spec.json");
  fs.writeFileSync(specFile, JSON.stringify(spec), "utf-8");

  try {
    execSync(`node scripts/generate-types.cjs --spec ${specFile} ${args}`, {
      stdio: "inherit",
      cwd,
    });
    execSync(`node scripts/generate-hooks.cjs --spec ${specFile} ${args}`, {
      stdio: "inherit",
      cwd,
    });
  } finally {
    // 임시 파일 정리
    fs.unlinkSync(specFile);
  }
}

main().catch((err) => {
  console.error("Error:", err.message);
  process.exit(1);
});
