'use client';

import React, { useEffect } from 'react';
import { MenuTree } from './_components/menu-tree';
import { MenuDetail } from './_components/menu-detail';
import { useMenuStore } from './store/use-menu-store';

export default function Page() {
  const loadMenuData = useMenuStore((state) => state.loadMenuData);

  useEffect(() => {
    loadMenuData();
  }, [loadMenuData]);

  return (
    <section className="menu-manage-page container mx-auto p-4 flex flex-row gap-4">
      <MenuTree />
      <MenuDetail />
    </section>
  );
}
