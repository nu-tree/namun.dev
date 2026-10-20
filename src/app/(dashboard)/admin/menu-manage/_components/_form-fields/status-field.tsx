import { EStatus } from '@/types/common';
import { MenuCommonFormField } from './menu-common-form-field';

type StatusFieldProps = {
  value: EStatus;
  onChange: (value: EStatus) => void;
};

export const StatusField = ({ value, onChange }: StatusFieldProps) => {
  return (
    <MenuCommonFormField label='상태' helpText='메뉴의 활성/비활성 상태를 선택합니다.'>
      <div className='flex flex-row items-center justify-start gap-2'>
        <input
          id='menuStatus_active'
          name='menuStatus'
          type='radio'
          value={EStatus.ACTIVE}
          checked={value === EStatus.ACTIVE}
          onChange={() => onChange(EStatus.ACTIVE)}
        />
        <label htmlFor='menuStatus_active'>활성</label>
        <input
          id='menuStatus_inactive'
          name='menuStatus'
          type='radio'
          value={EStatus.INACTIVE}
          checked={value === EStatus.INACTIVE}
          onChange={() => onChange(EStatus.INACTIVE)}
        />
        <label htmlFor='menuStatus_inactive'>비활성</label>
      </div>
    </MenuCommonFormField>
  );
};
