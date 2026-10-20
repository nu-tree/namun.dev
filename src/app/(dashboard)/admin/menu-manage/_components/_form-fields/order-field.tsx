import { Input } from '@/components/ui/input';
import { MenuCommonFormField } from './menu-common-form-field';

type OrderFieldProps = {
  value: number;
  onChange: (value: number) => void;
};

export const OrderField = ({ value, onChange }: OrderFieldProps) => {
  return (
    <MenuCommonFormField label='순서' helpText='메뉴의 정렬 순서를 입력합니다. 낮을수록 상위에 위치합니다.'>
      <Input
        name='menuOrder'
        type='number'
        className='w-full'
        value={value.toString()}
        onChange={(e) => onChange(parseInt(e.target.value))}
      />
    </MenuCommonFormField>
  );
};
