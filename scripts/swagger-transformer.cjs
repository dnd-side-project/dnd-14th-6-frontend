/**
 * Swagger Transformer
 *
 * 1. ApiResponseDto 래핑(statusCode, success, data)을 벗기고 data 속성만 응답 타입으로 추출
 * 2. SSE 엔드포인트 제거
 * 3. App 태그 엔드포인트 제거 (프론트 불필요)
 */

const { isApiResponseWrapper } = require("./shared.cjs");

/** @param {import('openapi3-ts/oas31').OpenAPIObject} spec */
module.exports = (spec) => {
  const paths = spec.paths ?? {};
  const schemas = spec.components?.schemas ?? {};

  // ── 1. SSE 및 App 엔드포인트 제거 ──
  const removePaths = [];
  for (const [path, methods] of Object.entries(paths)) {
    for (const [method, operation] of Object.entries(methods)) {
      if (typeof operation !== "object" || operation === null) continue;

      const tags = operation.tags ?? [];
      const isSse =
        tags.includes("SSE Sample") ||
        path.includes("/sse-sample") ||
        path === "/api/games/stream";
      const isApp = tags.includes("App");

      if (isSse || isApp) {
        removePaths.push({ path, method });
      }
    }
  }

  for (const { path, method } of removePaths) {
    delete paths[path][method];
    if (Object.keys(paths[path]).length === 0) {
      delete paths[path];
    }
  }

  // ── 2. 컴포넌트 스키마에서 ApiResponse 래핑 벗기기 ──
  // TiersResponseDto 같이 $ref로 참조되는 스키마가 { statusCode, success, data } 패턴인 경우
  for (const [name, schema] of Object.entries(schemas)) {
    if (isApiResponseWrapper(schema)) {
      const dataSchema = schema.properties.data;
      // 스키마를 data 속성의 내용으로 교체
      schemas[name] = dataSchema;
    }
  }

  // ── 3. 응답 스키마에서 allOf ApiResponseDto 래핑 벗기기 ──
  for (const [, methods] of Object.entries(paths)) {
    for (const [, operation] of Object.entries(methods)) {
      if (typeof operation !== "object" || operation === null) continue;
      unwrapOperationResponse(operation);
    }
  }

  // ── 4. ApiResponseDto 스키마 정의 제거 ──
  delete schemas.ApiResponseDto;

  return spec;
};

/**
 * 오퍼레이션의 응답 스키마에서 allOf + ApiResponseDto 래핑을 벗김
 *
 * 패턴: { allOf: [{ $ref: ApiResponseDto }, { properties: { data: <actual> } }] }
 * → data 속성의 스키마로 교체
 */
function unwrapOperationResponse(operation) {
  const responses = operation.responses ?? {};

  for (const [, response] of Object.entries(responses)) {
    const content = response?.content?.["application/json"];
    if (!content?.schema) continue;

    const schema = content.schema;

    // Pattern A: allOf with ApiResponseDto
    // { allOf: [{ $ref: ApiResponseDto }, { properties: { data: <actual> } }] }
    if (Array.isArray(schema.allOf)) {
      const dataObj = schema.allOf.find(
        (item) =>
          item.properties?.data && !item.$ref?.includes("ApiResponseDto"),
      );
      if (dataObj?.properties?.data) {
        content.schema = dataObj.properties.data;
        continue;
      }
    }

    // Pattern B: type: "object" + $ref: ApiResponseDto + properties.data
    // { type: "object", $ref: "#/.../ApiResponseDto", properties: { data: { $ref: "...Dto" } } }
    if (schema.$ref?.includes("ApiResponseDto") && schema.properties?.data) {
      content.schema = schema.properties.data;
    }
  }
}
