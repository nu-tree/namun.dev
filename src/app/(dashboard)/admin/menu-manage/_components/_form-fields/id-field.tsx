import { Input } from '@/components/ui/input';
import { MenuCommonFormField } from './menu-common-form-field';

type IdFieldProps = {
  value: number;
};

export const IdField = ({ value }: IdFieldProps) => {
  return (
    <MenuCommonFormField label='ID'>
      <Input name='id' type='number' readOnly className='w-full bg-gray-100' value={value === 0 ? '' : value} />
    </MenuCommonFormField>
  );
};
