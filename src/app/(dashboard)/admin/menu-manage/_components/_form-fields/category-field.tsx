import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EMenuCategory } from '../../types.menu';
import { MenuCommonFormField } from './menu-common-form-field';

type CategoryFieldProps = {
  value: EMenuCategory;
  onChange: (value: EMenuCategory) => void;
};

export const CategoryField = ({ value, onChange }: CategoryFieldProps) => {
  return (
    <MenuCommonFormField label='구분' required helpText='구분을 선택하지 않으면 GNB 메뉴로 생성됩니다.'>
      <Select name='menuCategory' value={value} onValueChange={(value) => onChange(value as EMenuCategory)}>
        <SelectTrigger>
          <SelectValue placeholder='선택하세요' />
        </SelectTrigger>
        <SelectContent>
          {Object.values(EMenuCategory).map((category) => (
            <SelectItem key={category} value={category}>
              {category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </MenuCommonFormField>
  );
};
