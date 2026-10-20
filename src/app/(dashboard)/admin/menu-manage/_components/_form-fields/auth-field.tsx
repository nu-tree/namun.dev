import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EMenuAuth } from '../../types.menu';
import { MenuCommonFormField } from './menu-common-form-field';

type AuthFieldProps = {
  value: EMenuAuth;
  onChange: (value: EMenuAuth) => void;
};

export const AuthField = ({ value, onChange }: AuthFieldProps) => {
  return (
    <MenuCommonFormField label='권한' helpText='메뉴에 접근할 권한을 선택합니다.'>
      <Select name='menuAuth' value={value} onValueChange={(value) => onChange(value as EMenuAuth)}>
        <SelectTrigger>
          <SelectValue placeholder='선택하세요' />
        </SelectTrigger>
        <SelectContent>
          {Object.values(EMenuAuth).map((auth) => (
            <SelectItem key={auth} value={auth}>
              {auth}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </MenuCommonFormField>
  );
};
