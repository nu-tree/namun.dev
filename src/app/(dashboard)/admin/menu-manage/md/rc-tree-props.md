## 🌳 Tree 컴포넌트 Props (속성)

Tree 컴포넌트에서 사용할 수 있는 props의 전체 목록과 설명입니다.
https://tree-react-component.vercel.app/

| 이름 | 설명 | 타입 | 기본값 |
|------|------|------|--------|
| autoExpandParent | 부모 노드를 자동으로 확장할지 여부 | `boolean` | `false` |
| checkable | 체크박스 기능을 사용할지 여부 / 또는 커스텀 React Node | `boolean` / `React Node` | `false` |
| checkedKeys | 선택된 체크박스 노드 (제어형). 설정 시 defaultCheckedKeys는 무시됨. 부모와 자식 노드는 연동됨. checkable과 checkStrictly를 함께 사용하면 객체 형태로 `{checked: [], halfChecked: []}` 전달 | `string[]` / `{checked: [], halfChecked: []}` | `[]` |
| checkStrictly | 부모와 자식 노드 간 연동 없이 정확한 체크 상태를 유지할지 여부 | `boolean` | `false` |
| className | 최상위 DOM 노드에 적용할 추가 CSS 클래스 | `string` | `''` |
| defaultCheckedKeys | 기본 체크된 노드 키 배열 | `string[]` | `[]` |
| defaultExpandedKeys | 기본 확장할 노드 키 배열 | `string[]` | `[]` |
| defaultExpandAll | 모든 노드를 기본으로 확장할지 여부 | `boolean` | `false` |
| defaultExpandParent | 초기 렌더링 시 부모 노드를 자동으로 확장할지 여부 | `boolean` | `true` |
| defaultSelectedKeys | 기본 선택된 노드 키 배열 | `string[]` | `[]` |
| disabled | 트리 전체를 비활성화할지 여부 | `boolean` | `false` |
| draggable | 노드를 드래그할 수 있게 할지 여부 또는 조건 함수 (IE8 이하, Safari 5.1 이하 미지원) | `boolean` / `({ node }) => boolean` | `false` |
| expandedKeys | 확장된 노드 키 배열 (제어형) | `string[]` | - |
| filterTreeNode | 특정 노드를 필터링하는 함수, true 반환 시 필터링됨 | `(node) => boolean` | - |
| icon | 아이콘 커스터마이징. 컴포넌트를 전달하면 TreeNode props를 받을 수 있음 | `ReactNode` / `(props) => ReactNode` | - |
| loadedKeys | 비동기 로딩 시 이미 로딩된 노드 키 배열 | `string[]` | - |
| loadData | 데이터를 비동기로 로딩하는 함수 (Promise 반환 필요) | `(node) => Promise` | - |
| multiple | 다중 선택 허용 여부 | `boolean` | `false` |
| prefixCls | CSS 클래스 프리픽스 | `string` | `'rc-tree'` |
| selectable | 노드를 선택 가능하게 할지 여부 | `boolean` | `true` |
| selectedKeys | 선택된 노드 키 배열 (제어형). 설정 시 defaultSelectedKeys는 무시됨 | `string[]` | `[]` |
| showIcon | 아이콘 표시 여부 | `boolean` | `true` |
| showLine | 선(line) 표시 여부 | `boolean` | `false` |
| treeData | 트리 데이터를 직접 전달. children을 구성할 필요 없음 (key는 전체 배열에서 고유해야 함) | `Array<{key, title, children, disabled?, selectable?}>` | - |
| onCheck | 체크박스를 클릭했을 때 호출되는 콜백 | `(checkedKeys, e:{checked, checkedNodes, node, event, nativeEvent}) => void` | - |
| onExpand | 노드 확장 또는 축소 시 호출되는 콜백 | `(expandedKeys, {expanded, node, nativeEvent}) => void` | - |
| onDragEnd | 드래그 종료 시 호출 | `({event, node}) => void` | - |
| onDragEnter | 드래그 진입 시 호출 | `({event, node, expandedKeys}) => void` | - |
| onDragLeave | 드래그 벗어남 시 호출 | `({event, node}) => void` | - |
| onDragOver | 드래그 오버 시 호출 | `({event, node}) => void` | - |
| onDragStart | 드래그 시작 시 호출 | `({event, node}) => void` | - |
| onDrop | 드롭 시 호출 | `({event, node, dragNode, dragNodesKeys}) => void` | - |
| onLoad | 노드 로딩 시 호출. loadedKeys를 설정한 경우 무한 루프 방지를 위해 필수 | `(loadedKeys, {event, node}) => void` | - |
| onMouseEnter | 마우스가 노드에 진입할 때 호출 | `({event, node}) => void` | - |
| onMouseLeave | 마우스가 노드를 벗어날 때 호출 | `({event, node}) => void` | - |
| onRightClick | 노드를 우클릭했을 때 호출 (컨텍스트 메뉴 등 커스터마이징 용도) | `({event, node}) => void` | - |
| onSelect | 노드를 클릭했을 때 호출 | `(selectedKeys, e:{selected, selectedNodes, node, event, nativeEvent}) => void` | - |
| switcherIcon | 스위처(토글 아이콘) 지정 | `ReactNode` / `(props: TreeNodeAttribute) => ReactNode` | - |
| virtual | 가상 스크롤 비활성화 여부 | `boolean` | - |
| allowDrop | 드롭 허용 여부를 제어하는 함수 | `({ dragNode, dropNode, dropPosition }) => boolean` | - |
| dropIndicatorRender | 드래그 시 표시되는 인디케이터 렌더 함수 | `({ dropPosition, dropLevelOffset, indent, prefixCls }) => ReactNode` | - |
| direction | 트리의 표시 방향 (드래그 동작에 영향) | `'ltr'` / `'rtl'` | - |
| expandAction | 노드를 펼치는 트리거 방식: `false`, `click`, `doubleClick` 중 선택 | `string` / `boolean` | `'click'` |

---

## 🌿 TreeNode Props (속성)

> 참고: TreeNode가 1,000개 이상일 경우, 기본적으로 부모 노드를 접힌 상태로 두는 것이 성능상 매우 유리합니다. 숨겨진 자식 TreeNode는 DOM에 삽입되지 않기 때문에 속도가 빨라집니다.

| 이름 | 설명 | 타입 | 기본값 |
|------|------|------|--------|
| className | TreeNode에 추가할 CSS 클래스 | `string` | `''` |
| checkable | Tree 컴포넌트가 checkable일 때, 해당 노드만 체크 가능하도록 설정 | `boolean` | `false` |
| style | TreeNode에 적용할 인라인 스타일 | `object` | `''` |
| disabled | 해당 TreeNode를 비활성화할지 여부 | `boolean` | `false` |
| disableCheckbox | 해당 TreeNode의 체크박스를 비활성화할지 여부 | `boolean` | `false` |
| title | 트리 또는 서브트리의 타이틀 | `string` / `React.Element` / `(data: DataNode) => React.ReactNode` | `'---'` |
| key | 고유 키 값 (확장/선택/체크 등에 사용됨). 트리 전체에서 고유해야 함 | `string` | treeNode의 위치 정보 |
| isLeaf | 리프(leaf) 노드인지 여부 | `boolean` | `false` |
| icon | 아이콘 커스터마이징. 컴포넌트 전달 시 TreeNode props를 전달받음 | `React.Element` / `(props) => React.Element` | - |
| switcherIcon | 스위처(토글) 아이콘 지정 | `ReactNode` / `(props: TreeNodeAttribute) => ReactNode` | - |

