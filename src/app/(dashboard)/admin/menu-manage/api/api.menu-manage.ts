// 더미 데이터를 가공 하는 함수들

import { wf__delay } from '@/lib/utils/utils';
import { IMenuDTO } from '@/dto/menu.dto';
import { buildTree } from '../menu-manage.function';
import { MENU_DTO_DUMMY_DATA } from '../dummy.menu';

export const getMenusAPI = async () => {
  await wf__delay(300);
  return buildTree(MENU_DTO_DUMMY_DATA);
};

export const createMenuAPI = async (menuDTO: IMenuDTO) => {
  await wf__delay(300);

  const newMenuDTO = {
    ...menuDTO,
    id: MENU_DTO_DUMMY_DATA.length + 1,
  };

  return buildTree([...MENU_DTO_DUMMY_DATA, newMenuDTO]);
};

export const updateMenuAPI = async (menuDTO: IMenuDTO) => {
  await wf__delay(300);

  const updatedMenuDTO = MENU_DTO_DUMMY_DATA.map((menu) => {
    if (menu.id === menuDTO.id) {
      return menuDTO;
    }
    return menu;
  });
  return updatedMenuDTO;
};

export const deleteMenuAPI = async (menuDTO: IMenuDTO) => {
  await wf__delay(300);
  const result = MENU_DTO_DUMMY_DATA.filter((menu) => menu.id !== menuDTO.id);
  return buildTree(result);
};

export const reOrderMenuAPI = async (
  selectedNodeId: number,
  selectedNodeParentId: number | null,
  selectedNodeOrder: number,
  targetNodeId: number,
  targetNodeParentId: number | null,
  targetNodeOrder: number,
) => {
  await wf__delay(300);

  if (!selectedNodeId || !selectedNodeOrder || !targetNodeId || !targetNodeOrder) {
    alert('입력 파라미터를 확인해 주세요');
    throw new Error('입력 파라미터를 확인해 주세요');
  }

  // INFO 선택노드의 부모가 없는데(최상위 노드), 타겟노드에 부모가 있는 경우 에러 처리
  if (selectedNodeParentId === 0 && targetNodeParentId !== 0) {
    alert('최상위 메뉴는 하위 메뉴로 이동할 수 없습니다.');
    throw new Error('최상위 메뉴는 하위 메뉴로 이동할 수 없습니다.');
  }

  // NOTE 1. 부모노드가 같다거나 부모노드가 없는 경우 선택노드와 타겟노드의 menuOrder를 교체
  if (selectedNodeParentId === targetNodeParentId || (selectedNodeParentId == null && targetNodeParentId == null)) {
    console.log('NOTE 1. 부모노드가 같다면 선택노드와 타겟노드의 menuOrder를 교체');

    const updatedMenus = MENU_DTO_DUMMY_DATA.map((menu) => {
      if (menu.id === selectedNodeId) {
        menu.menuOrder = targetNodeOrder;
      }
      if (menu.id === targetNodeId) {
        menu.menuOrder = selectedNodeOrder;
      }
      return menu;
    });

    return buildTree(updatedMenus);
  }

  // NOTE 2. 부모노드가 다르다면 선택노드의 부모를 타겟노드로 변경
  if (selectedNodeParentId !== targetNodeParentId) {
    console.log('NOTE 2. 부모노드가 다르다면 선택노드의 부모를 타겟노드로 변경');
    const updatedMenus = MENU_DTO_DUMMY_DATA.map((menu) => {
      if (menu.id === selectedNodeId) {
        menu.parentId = targetNodeId;
      }
      return menu;
    });
    return buildTree(updatedMenus);
  }

  return buildTree(MENU_DTO_DUMMY_DATA);
};
