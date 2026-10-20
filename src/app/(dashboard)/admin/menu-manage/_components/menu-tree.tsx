import { Key } from 'rc-tree/lib/interface';
import Tree from 'rc-tree';
import 'rc-tree/assets/index.css';
import { IMenuDTO } from '@/dto/menu.dto';
import { ITreeNode } from '../types.menu';
import { Spinner } from '@/components/ui/spinner/spinner';
import { EStatus } from '@/types/common';
import { EMenuCategory, EMenuAuth, EMenuTarget } from '../types.menu';
import { useMenuStore } from '../store/use-menu-store';

export const MenuTree = () => {
  const { isLoading, menuTreeData, selectedKeys, setExpandedKeys, handleMenuSelect, handleReOrder } = useMenuStore();

  // Tree 관련 함수들 이동
  const handleExpand = (keys: Key[]) => {
    setExpandedKeys(keys);
  };

  const selectMenu = (node: ITreeNode): IMenuDTO => {
    return {
      id: Number(node.key),
      parentId: node.parentId ?? 0,
      menuCategory: node.menuCategory ?? EMenuCategory.GNB,
      menuAuth: node.menuAuth ?? EMenuAuth.ALL,
      menuStatus: node.menuStatus ?? EStatus.ACTIVE,
      menuOrder: node.menuOrder ?? 0,
      menuName: node.title ?? '',
      menuLink: node.menuLink ?? '',
      menuTarget: node.menuTarget ?? EMenuTarget.SELF,
      createdAt: node.createdAt ?? new Date(),
      updatedAt: node.updatedAt ?? new Date(),
      deletedAt: node.deletedAt ?? null,
    };
  };

  const handleSelect = (keys: Key[], info: any) => {
    if (info.node) {
      const node = info.node as ITreeNode;
      handleMenuSelect(keys, selectMenu(node));
    }
  };

  // 커스텀 타이틀 렌더링
  const titleRender = (nodeData: ITreeNode) => {
    return (
      <span className="flex items-center gap-1">
        <span>{nodeData.title}</span>
        {<span className="text-xs text-gray-700 ml-2">({nodeData.menuAuth})</span>}
        {nodeData.menuStatus === EStatus.INACTIVE && <span className="text-xs text-red-500 ml-2">(비활성)</span>}
      </span>
    );
  };

  return (
    <div className="menu-tree-container flex flex-col gap-4 w-1/2">
      <h1 className="text-2xl font-bold">메뉴 트리</h1>
      <div className="wf__text_help">드래그&드랍으로 메뉴순서가 바뀌지 않는다면 메뉴속성에 순서를 조정해 주세요</div>
      <div className="border rounded-lg p-4 bg-white">
        {isLoading ? (
          <Spinner />
        ) : menuTreeData && menuTreeData.length > 0 ? (
          <Tree
            treeData={menuTreeData}
            defaultExpandAll={true}
            selectedKeys={selectedKeys}
            onExpand={handleExpand}
            onSelect={handleSelect}
            showLine={true}
            showIcon={true}
            draggable={true}
            titleRender={titleRender}
            className="custom-tree text-lg"
            onDrop={(info) => {
              handleReOrder(
                Number(info.dragNode.key),
                Number(info.dragNode.parentId) ?? null,
                Number(info.dragNode.menuOrder),
                Number(info.node.key),
                Number(info.node.parentId) ?? null,
                Number(info.node.menuOrder)
              );
            }}
          />
        ) : (
          <div>등록된 메뉴가 없습니다</div>
        )}
      </div>
    </div>
  );
};
