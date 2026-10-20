/**
 * NOTE 상태는 이것이 기본
 * 특수한 상태가 더 있다면 따로 만들기
 * ex) deleted, etc...
 */
export enum EStatus {
  ACTIVE = 1,
  INACTIVE = 0,
}

/**
 * NOTE 모든 DTO는 이걸로 시작
 */
export interface IBaseDTO {
  id: number;
  createdAt: Date | null;
  updatedAt: Date | null;
  deletedAt: Date | null;
}
