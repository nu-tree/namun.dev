import { TreeSelect } from '../tree-select';

import { ITreeNode } from '../../types.menu';
import { MenuCommonFormField } from './menu-common-form-field';

type ParentMenuFieldProps = {
  value: number | null;
  onChange: (value: number) => void;
  treeData: ITreeNode[];
};

export const ParentMenuField = ({ value, onChange, treeData }: ParentMenuFieldProps) => {
  return (
    <MenuCommonFormField label='상위메뉴' helpText='선택하지 않으면 최상위에 메뉴가 생성됩니다.'>
      <TreeSelect value={value?.toString() ?? ''} onChange={(value) => onChange(parseInt(value))} treeData={treeData} />
    </MenuCommonFormField>
  );
};
