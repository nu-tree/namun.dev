import { Input } from '@/components/ui/input';
import { MenuCommonFormField } from './menu-common-form-field';

type NameFieldProps = {
  value: string;
  onChange: (value: string) => void;
};

export const NameField = ({ value, onChange }: NameFieldProps) => {
  return (
    <MenuCommonFormField label='제목' helpText='메뉴의 제목을 입력합니다.'>
      <Input name='menuName' type='text' className='w-full' value={value} onChange={(e) => onChange(e.target.value)} />
    </MenuCommonFormField>
  );
};
