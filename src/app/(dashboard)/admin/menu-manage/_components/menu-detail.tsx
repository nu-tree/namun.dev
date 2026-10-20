import { Button } from '@/components/ui/button';
import { MenuManageForm } from './menu-manage-form';
import { useMenuStore } from '../store/use-menu-store';
import { createMenuAPI, deleteMenuAPI } from '../api/api.menu-manage';
import { IMenuDTO } from '@/dto/menu.dto';

export const MenuDetail = () => {
  async function handleCreate() {
    const { currentMenu, setMenuTreeData } = useMenuStore.getState();
    if (!confirm('생성하시겠습니까?')) return;

    try {
      const result = await createMenuAPI(currentMenu);
      setMenuTreeData(result);
    } catch (error) {
      console.error('메뉴 생성 실패:', error);
      alert('메뉴 생성에 실패했습니다.');
    }
  }

  async function handleDelete(selectedMenu: IMenuDTO) {
    if (!confirm('삭제하시겠습니까?\n부모폴더를 삭제하면 하위 폴더까지 삭제 됩니다.')) return;

    try {
      const result = await deleteMenuAPI(selectedMenu);
      setMenuTreeData(result);
    } catch (error) {
      console.error('메뉴 삭제 실패:', error);
      alert('메뉴 삭제에 실패했습니다.');
    }
  }

  const { selectedMenu, currentMenu, setSelectedMenu, resetMenu, setMenuTreeData } = useMenuStore();

  return (
    <div className="menu-detail-container flex flex-col gap-4 w-1/2">
      <h1 className="text-2xl font-bold">detail</h1>
      <div className="border rounded-lg p-4 bg-white">
        <div className="flex flex-row items-center justify-end gap-4 py-4">
          <Button
            variant="default"
            className="menu-add-btn cursor-pointer"
            onClick={() => (selectedMenu ? resetMenu() : handleCreate())}
          >
            {selectedMenu ? '초기화' : '생성'}
          </Button>
          {selectedMenu && (
            <>
              <Button variant="outline" className="cursor-pointer" onClick={() => setSelectedMenu(undefined)}>
                수정
              </Button>
              <Button variant="destructive" className="cursor-pointer" onClick={() => handleDelete(selectedMenu)}>
                삭제
              </Button>
            </>
          )}
        </div>
        <MenuManageForm />
      </div>
    </div>
  );
};
