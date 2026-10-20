// 게시판 권한 분류
export const BoardRole = {
  ADMIN: 'admin',
  USER: 'user',
  GUEST: 'guest',
} as const;

export type BoardRole = (typeof BoardRole)[keyof typeof BoardRole];

export const BoardRoleOptions = Object.values(BoardRole).map((role) => ({
  label: role,
  value: role,
}));
