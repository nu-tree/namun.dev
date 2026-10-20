'use client';
import {
  ClipboardList,
  FileText,
  MenuIcon,
  MessageCircle,
  MessageSquare,
  Presentation,
  Settings,
  ShoppingCart,
  SquareArrowOutUpRight,
  User,
  Users,
} from 'lucide-react';
import { IconType } from 'react-icons/lib';

// 단일 메뉴 타입
type TMenuItem = {
  title: string;
  url: string;
  icon?: IconType; // 아이콘이 있을 수도 있고 없을 수도 있음
  role: string[];
};

export type TMenuGroup = {
  label: string;
  icon?: IconType; // 그룹 아이콘도 선택적으로 변경
  items: TMenuItem[];
  opened?: boolean; // 처음부터 열려 있을지 여부
};
// 최상위 메뉴 타입
export type TMenuStructure = {
  singleItems: TMenuItem[][];
  groupItems: TMenuGroup[];
};

// 메뉴 데이터 구조
export const MenuStructure: TMenuStructure = {
  singleItems: [],
  groupItems: [
    {
      label: '회원관리',
      icon: User,
      opened: true,
      items: [
        {
          title: '회원관리',
          url: '/admin/users',
          icon: User,
          role: ['ADMIN'],
        },
        {
          title: '조직관리',
          url: '/admin/organizations',
          icon: Users,
          role: ['ADMIN'],
        },
      ],
    },
    {
      label: '게시판관리',
      icon: ClipboardList,
      items: [
        {
          title: '게시판관리',
          url: '/admin/boards',
          icon: ClipboardList,
          role: ['ADMIN'],
        },
        {
          title: '게시물관리',
          url: '/admin/posts',
          icon: FileText,
          role: ['ADMIN'],
        },
      ],
    },
    {
      label: '클레임관리',
      icon: MessageCircle,
      items: [
        {
          title: '문의형게시판관리',
          url: '/admin/inquiry-meta',
          icon: MessageSquare,
          role: ['ADMIN'],
        },
        {
          title: '문의관리',
          url: '/admin/inquiry',
          icon: MessageCircle,
          role: ['ADMIN'],
        },
      ],
    },
    {
      label: '사이트 관리',
      icon: Settings,
      items: [
        {
          title: '메뉴관리',
          url: '/admin/menu-manage',
          icon: MenuIcon,
          role: ['ADMIN'],
        },
        {
          title: '배너관리',
          url: '/admin/banners',
          icon: Presentation,
          role: ['ADMIN'],
        },
        {
          title: '팝업관리',
          url: '/admin/popups',
          icon: SquareArrowOutUpRight,
          role: ['ADMIN'],
        },
        {
          title: '사이트설정',
          url: '/admin/settings',
          icon: Settings,
          role: ['ADMIN'],
        },
      ],
    },
  ],
};
