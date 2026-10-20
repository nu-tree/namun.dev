import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { EMenuTarget } from '../../types.menu';
import { MenuCommonFormField } from './menu-common-form-field';

type TargetFieldProps = {
  value: EMenuTarget;
  onChange: (value: EMenuTarget) => void;
};

export const TargetField = ({ value, onChange }: TargetFieldProps) => {
  return (
    <MenuCommonFormField
      label='타겟'
      helpText='메뉴를 선택할 때 이동할 타겟을 선택합니다. 기본값은 _self(현재 창)입니다.'
    >
      <Select name='menuTarget' value={value} onValueChange={(value) => onChange(value as EMenuTarget)}>
        <SelectTrigger>
          <SelectValue placeholder='선택하세요' />
        </SelectTrigger>
        <SelectContent>
          {Object.values(EMenuTarget).map((target) => (
            <SelectItem key={target} value={target}>
              {target.replace('_', '')}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </MenuCommonFormField>
  );
};
