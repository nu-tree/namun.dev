// Popup 위치 타입
export const POPUP_POSITION_TYPES = {
  TOP_LEFT: '좌측 상단',
  TOP_CENTER: '중앙 상단',
  TOP_RIGHT: '우측 상단',
  CENTER_LEFT: '좌측 중앙',
  CENTER: '중앙',
  CENTER_RIGHT: '우측 중앙',
} as const;

export const POPUP_POSITION_TYPE_OPTIONS = Object.entries(POPUP_POSITION_TYPES).map(([value, label]) => ({
  value,
  label,
}));

export type PopupPositionType = keyof typeof POPUP_POSITION_TYPES;

// Popup 표시 타입
export const POPUP_DISPLAY_TYPES = {
  PC: 'PC',
  MOBILE: '모바일',
  ALL: '전체',
} as const;

export const POPUP_DISPLAY_TYPE_OPTIONS = Object.entries(POPUP_DISPLAY_TYPES).map(([value, label]) => ({
  value,
  label,
}));

// Popup 크기 타입
export const POPUP_SIZE_TYPES = {
  SMALL: '소형',
  MEDIUM: '중형',
  LARGE: '대형',
} as const;

export const POPUP_SIZE_TYPE_OPTIONS = Object.entries(POPUP_SIZE_TYPES).map(([value, label]) => ({
  value,
  label,
}));
