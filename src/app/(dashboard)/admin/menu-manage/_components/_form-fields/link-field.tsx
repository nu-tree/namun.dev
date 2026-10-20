import { Input } from '@/components/ui/input';
import { MenuCommonFormField } from './menu-common-form-field';

type LinkFieldProps = {
  value: string | null;
  onChange: (value: string) => void;
};

export const LinkField = ({ value, onChange }: LinkFieldProps) => {
  return (
    <MenuCommonFormField label='링크' helpText='메뉴를 선택할 때 이동할 링크를 입력합니다.'>
      <Input name='menuLink' value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
    </MenuCommonFormField>
  );
};
