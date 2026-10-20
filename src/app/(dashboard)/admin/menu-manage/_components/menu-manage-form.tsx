import { cn } from '@/lib/utils/utils';
import { useEffect } from 'react';
import { IMenuDTO } from '@/dto/menu.dto';
import { initialMenuState } from '../types.menu';
import { useMenuStore } from '../store/use-menu-store';
import { IdField } from './_form-fields/id-field';
import { ParentMenuField } from './_form-fields/parent-menu-field';
import { CategoryField } from './_form-fields/category-field';
import { StatusField } from './_form-fields/status-field';
import { AuthField } from './_form-fields/auth-field';
import { OrderField } from './_form-fields/order-field';
import { NameField } from './_form-fields/name-field';
import { LinkField } from './_form-fields/link-field';
import { TargetField } from './_form-fields/target-field';

type MenuManageFormProps = React.HTMLAttributes<HTMLElement>;

export const MenuManageForm = ({ className, ...props }: Readonly<MenuManageFormProps>) => {
  const { currentMenu, setCurrentMenu, selectedMenu, menuTreeData } = useMenuStore();

  useEffect(() => {
    setCurrentMenu(selectedMenu ?? initialMenuState);
  }, [selectedMenu, setCurrentMenu]);

  const handleChange = (field: keyof IMenuDTO, value: any) => {
    let processedValue = value;

    // 필드별 타입 처리
    switch (field) {
      case 'menuCategory':
      case 'menuAuth':
      case 'menuTarget':
      case 'menuStatus':
        processedValue = value; // 이미 각 필드 컴포넌트에서 올바른 타입으로 변환됨
        break;
      case 'menuOrder':
      case 'id':
      case 'parentId':
        processedValue = value ? Number(value) : 0;
        break;
      case 'menuLink':
        processedValue = value || null;
        break;
      case 'createdAt':
      case 'updatedAt':
        processedValue = value ? new Date(value) : new Date();
        break;
      case 'deletedAt':
        processedValue = value ? new Date(value) : null;
        break;
      default:
        processedValue = value;
    }

    setCurrentMenu({
      ...currentMenu,
      [field]: processedValue,
    });
  };

  return (
    <form {...props} className={cn('flex flex-col gap-4', className)}>
      <IdField value={currentMenu.id} />
      <ParentMenuField
        value={currentMenu.parentId}
        onChange={(value) => handleChange('parentId', value)}
        treeData={menuTreeData}
      />
      <CategoryField value={currentMenu.menuCategory} onChange={(value) => handleChange('menuCategory', value)} />
      <AuthField value={currentMenu.menuAuth} onChange={(value) => handleChange('menuAuth', value)} />
      <StatusField value={currentMenu.menuStatus} onChange={(value) => handleChange('menuStatus', value)} />
      <OrderField value={currentMenu.menuOrder} onChange={(value) => handleChange('menuOrder', value)} />
      <NameField value={currentMenu.menuName} onChange={(value) => handleChange('menuName', value)} />
      <LinkField value={currentMenu.menuLink} onChange={(value) => handleChange('menuLink', value)} />
      <TargetField value={currentMenu.menuTarget} onChange={(value) => handleChange('menuTarget', value)} />
    </form>
  );
};
