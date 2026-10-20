import { IMenuDTO } from '@/dto/menu.dto';
import { EStatus } from '@/types/common';

/**
 * NOTE 메뉴 카테고리
 */
export enum EMenuCategory {
  GNB = 'GNB',
  SIDE = 'SIDE',
  QUICK = 'QUICK',
}

/**
 * NOTE 메뉴 권한
 */
export enum EMenuAuth {
  ALL = 'ALL',
  ADMIN = 'ADMIN',
  MEMBER = 'MEMBER',
}

/**
 * NOTE 메뉴 타겟
 */
export enum EMenuTarget {
  BLANK = '_blank',
  SELF = '_self',
  PARENT = '_parent',
  TOP = '_top',
}

/**
 * NOTE 트리 노드 타입 (MenuDTO 상속)
 */
export interface ITreeNode extends IMenuDTO {
  title: string;
  key: string;
  isLeaf?: boolean;
  children?: ITreeNode[];

  // UI 관련 옵션들
  disabled?: boolean;
  disableCheckbox?: boolean;
  checkable?: boolean;
  menuOnClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
  switcherIcon?: React.ReactNode;
}

export const initialMenuState: IMenuDTO = {
  id: 0,
  parentId: 0,
  menuCategory: EMenuCategory.GNB,
  menuAuth: EMenuAuth.ALL,
  menuStatus: EStatus.INACTIVE,
  menuOrder: 0,
  menuName: '',
  menuLink: '',
  menuTarget: EMenuTarget.SELF,
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null,
};
