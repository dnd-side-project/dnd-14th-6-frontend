export interface PaginationMetadataDto {
  /** 현재 페이지 번호 */
  page: number;
  /** 페이지당 항목 수 */
  size: number;
  /** 전체 항목 수 */
  totalItems: number;
  /** 전체 페이지 수 */
  totalPage: number;
}
