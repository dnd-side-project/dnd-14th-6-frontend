import type { Options, SearchParamsOption } from "ky";
import type { ApiResponse } from "../types";
import { apiClient } from "./client";

export async function GET_PUBLIC<T>(
  path: string,
  searchParams?: SearchParamsOption,
): Promise<ApiResponse<T>> {
  return apiClient.get(path, { searchParams }).json<ApiResponse<T>>();
}

export async function POST_PUBLIC<T>(
  path: string,
  body?: unknown,
  options?: Options,
): Promise<ApiResponse<T>> {
  return apiClient
    .post(path, { ...options, json: body })
    .json<ApiResponse<T>>();
}

export async function PUT_PUBLIC<T>(
  path: string,
  body?: unknown,
  options?: Options,
): Promise<ApiResponse<T>> {
  return apiClient.put(path, { ...options, json: body }).json<ApiResponse<T>>();
}

export async function DELETE_PUBLIC<T>(
  path: string,
  options?: Options,
): Promise<ApiResponse<T>> {
  return apiClient.delete(path, options).json<ApiResponse<T>>();
}

export async function PATCH_PUBLIC<T>(
  path: string,
  body?: unknown,
  options?: Options,
): Promise<ApiResponse<T>> {
  return apiClient
    .patch(path, { ...options, json: body })
    .json<ApiResponse<T>>();
}
