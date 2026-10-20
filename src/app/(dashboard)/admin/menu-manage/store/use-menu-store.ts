import { create } from 'zustand';
import { Key } from 'rc-tree/lib/interface';
import { ITreeNode } from '../types.menu';
import { createMenuAPI, deleteMenuAPI, getMenusAPI, reOrderMenuAPI } from '../api/api.menu-manage';
import { initialMenuState } from '../types.menu';
import { IMenuDTO } from '@/dto/menu.dto';

// State 타입 정의
interface MenuState {
  menuTreeData: ITreeNode[];
  isLoading: boolean;
  expandedKeys: Key[];
  selectedKeys: Key[];
  selectedMenu?: IMenuDTO;
  currentMenu: IMenuDTO;
}

// Actions 타입 정의
interface MenuActions {
  setMenuTreeData: (data: ITreeNode[]) => void;
  setIsLoading: (loading: boolean) => void;
  setExpandedKeys: (keys: Key[]) => void;
  setSelectedKeys: (keys: Key[]) => void;
  setSelectedMenu: (menu?: IMenuDTO) => void;
  setCurrentMenu: (menu: IMenuDTO) => void;
  resetMenu: () => void;
}

// Thunks 타입 정의
interface MenuThunks {
  loadMenuData: () => Promise<void>;
  handleMenuSelect: (keys: Key[], menu: IMenuDTO) => void;
  handleReOrder: (
    selectedNodeId: number,
    selectedNodeParentId: number | null,
    selectedNodeOrder: number,
    targetNodeId: number,
    targetNodeParentId: number | null,
    targetNodeOrder: number
  ) => Promise<void>;
}

// Store 타입 통합
type MenuStore = MenuState & MenuActions & MenuThunks;

// 초기 상태
const initialState: MenuState = {
  menuTreeData: [],
  isLoading: true,
  expandedKeys: [],
  selectedKeys: [],
  selectedMenu: undefined,
  currentMenu: initialMenuState,
};

// Store 생성
export const useMenuStore = create<MenuStore>((set, get) => ({
  // State
  ...initialState,

  // Actions
  setMenuTreeData: (data) => set({ menuTreeData: data }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  setExpandedKeys: (keys) => set({ expandedKeys: keys }),
  setSelectedKeys: (keys) => set({ selectedKeys: keys }),
  setSelectedMenu: (menu) => set({ selectedMenu: menu }),
  setCurrentMenu: (menu) => set({ currentMenu: menu }),
  resetMenu: () =>
    set({
      selectedMenu: undefined,
      currentMenu: initialMenuState,
    }),

  // Thunks (비즈니스 로직)
  loadMenuData: async () => {
    try {
      const treeData = await getMenusAPI();
      set({ menuTreeData: treeData });
    } finally {
      set({ isLoading: false });
    }
  },

  handleMenuSelect: (keys, menu) => {
    set({
      selectedKeys: keys,
      selectedMenu: menu,
    });
  },

  handleReOrder: async (...params) => {
    try {
      const result = await reOrderMenuAPI(...params);
      set({ menuTreeData: result });
    } catch (error) {
      console.error('메뉴 순서 변경 실패:', error);
      alert('메뉴 순서 변경에 실패했습니다.');
    }
  },
}));
