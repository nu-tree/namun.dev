export const USER_ROLE = {
  user: '일반 사용자',
  admin: '관리자',
} as const;

export const USER_ROLE_OPTIONS = Object.entries(USER_ROLE).map(([value, label]) => ({
  value,
  label,
}));

export const USER_ROLE_VALUES = Object.keys(USER_ROLE) as Array<keyof typeof USER_ROLE>;

export type UserRole = keyof typeof USER_ROLE;
