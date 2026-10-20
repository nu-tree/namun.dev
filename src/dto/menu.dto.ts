import { EMenuAuth, EMenuCategory, EMenuTarget } from '@/app/(dashboard)/admin/menu-manage/types.menu';
import { EStatus, IBaseDTO } from '@/types/common';

/**
 * NOTE 메뉴 DTO 타입
 */
export interface IMenuDTO extends IBaseDTO {
  parentId: number;
  menuCategory: EMenuCategory;
  menuAuth: EMenuAuth;
  menuStatus: EStatus;
  menuOrder: number;
  menuName: string;
  menuLink: string;
  menuTarget: EMenuTarget;
}
