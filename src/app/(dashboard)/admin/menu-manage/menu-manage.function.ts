// MenuDTO를 MenuType으로 변환하는 유틸리티 함수

import { IMenuDTO } from '@/dto/menu.dto';
import { ITreeNode } from './types.menu';

/**
 * MenuDTO를 MenuType으로 변환하는 유틸리티 함수
 */
const convertDtoToMenuType = (dto: IMenuDTO): ITreeNode => {
  return {
    id: dto.id,
    key: dto.id.toString(),
    title: dto.menuName,
    parentId: dto.parentId ?? 0,
    menuName: dto.menuName,
    menuCategory: dto.menuCategory,
    menuAuth: dto.menuAuth,
    menuStatus: dto.menuStatus,
    menuOrder: dto.menuOrder,
    menuLink: dto.menuLink,
    menuTarget: dto.menuTarget,
    createdAt: dto.createdAt,
    updatedAt: dto.updatedAt,
    deletedAt: dto.deletedAt,
    // isLeaf: dto.parentId === 0 ? false : true, // 최상위 메뉴면 폴더로
  };
};

/**
 * DTO 배열을 트리 구조로 변환하는 함수
 * @param items - 메뉴 DTO 배열
 * @param parentId - 부모 메뉴 ID (최상위는 0)
 * @returns 트리 구조로 변환된 메뉴 배열
 */
export const buildTree = (items: IMenuDTO[], parentId: number = 0): ITreeNode[] => {
  // 1. 현재 레벨의 아이템들 필터링
  const currentLevelItems = items.filter((item) => item.parentId === parentId);

  // 2. 메뉴 순서로 정렬
  const sortedItems = currentLevelItems.sort((a, b) => a.menuOrder - b.menuOrder);

  // 3. 정렬된 아이템들을 트리 노드로 변환하고 자식 노드들도 처리
  const result: ITreeNode[] = sortedItems.map((item) => {
    // 현재 아이템을 TreeNode로 변환
    const node = convertDtoToMenuType(item);

    // 재귀적으로 자식 노드들을 처리 (자식 노드들도 menuOrder로 정렬됨)
    const children = buildTree(items, item.id);

    // 자식이 있는 경우에만 children 속성 추가
    if (children.length > 0) {
      return {
        ...node,
        children,
      };
    }

    return node;
  });

  return result;
};
