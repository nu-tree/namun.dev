'use client';

import React from 'react';
import Tree from 'rc-tree';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ChevronDownIcon } from 'lucide-react';
import { ITreeNode } from '../types.menu';

export const TreeSelect = ({
  value,
  onChange,
  treeData,
}: {
  value?: string;
  onChange?: (value: string) => void;
  treeData: ITreeNode[];
}) => {
  // 선택된 key로부터 title 찾기
  const findNodeTitle = (key: string, nodes: ITreeNode[]): string => {
    for (const node of nodes) {
      if (node.key === key) return node.title;
      if (node.children) {
        const result = findNodeTitle(key, node.children);
        if (result) return result;
      }
    }
    return '';
  };

  return (
    <Popover className="relative w-full">
      {({ close }) => (
        <>
          <PopoverButton className="w-full flex items-center justify-between border rounded-md px-3 py-2 text-sm bg-white hover:bg-gray-50">
            <span className="block truncate">{value ? findNodeTitle(value, treeData) : '선택하세요'}</span>
            <ChevronDownIcon className="h-5 w-5 text-gray-400" />
          </PopoverButton>

          <PopoverPanel className="absolute z-10 w-full mt-1 bg-white border rounded-md shadow-lg">
            <div className="max-h-60 overflow-auto p-2">
              <Tree
                treeData={treeData}
                selectedKeys={value ? [value] : []}
                defaultExpandAll
                showLine={true}
                showIcon={false}
                onSelect={(keys, info) => {
                  const selectedKey = keys[0]?.toString();
                  if (selectedKey) {
                    onChange?.(selectedKey);
                    close();
                  }
                }}
                className="fancy-tree-dropdown text-sm"
              />
            </div>
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
};
