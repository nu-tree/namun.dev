## ✅ Next.js 프로젝트 컨벤션 정리

### 1. **폴더 구조**

- 모든 폴더는 `app` 디렉토리 **외부**에 생성
- 폴더명, 파일명은 **kebab-case** 사용 (예: `user-profile`, `main-header`)

```
/
├── app/                         # Next.js app directory
├── components/
│   ├── ui/                      # 재사용 가능한 UI 컴포넌트
│   └── pages/                   # 페이지 단위의 컴포넌트 (app용)
├── hook/
│   ├── apis/
│   │   ├── notice/
│   │   │   ├── use-one-notice.ts
│   │   │   ├── use-list-notice.ts
│   │   │   ├── use-create-notice.ts
│   │   │   ├── use-update-notice.ts
│   │   │   └── use-delete-notice.ts
│   │   └── qna/
│   │       └── ...
│   └── custom/
│       ├── use-scroll-position.ts
│       └── ...
├── lib/                         # 외부 라이브러리, 예: prisma.ts, api clients 등
│   └── prisma.ts
├── utils/                       # 순수 함수 유틸 모음
│   ├── format-date.ts
│   └── validate-email.ts
```

---

### 2. **폴더 및 파일 네이밍 규칙**

| 항목    | 규칙                                                 |
| ------- | ---------------------------------------------------- |
| 폴더명  | `kebab-case` 사용 (예: `user-profile`)               |
| 파일명  | `kebab-case` 사용                                    |
| 훅 이름 | `use-{테이블명}-{기능}` 형식 (예: `use-notice-list`) |
| 기능    | `one`, `list`, `create`, `update`, `delete` 고정     |

---

### 3. **훅 / 헬퍼 함수 주석 규칙**

- 모든 커스텀 훅과 유틸 함수에는 **기능 설명 주석 필수**

```ts
/**
 * 특정 공지사항 하나를 가져오는 훅
 */
export const useNoticeOne = () => { ... }
```

---

### 4. **이미지 저장 위치**

- **`public/`** 폴더에 직접 저장
- **`assets/` 폴더는 사용하지 않음**

예:

```
public/
├── logo.png
├── background.jpg
```

---

### 5. **Server 파일 관리**

클라이언트에 노출되면 안되는 코드들은 \*.server.ts로 파일명을 작성하여 'server-only' 패키지를 import

```typescript
// example.server.ts
import 'server-only';
// ...
```

<br>
Server Action 기능을 사용하는 경우 \*.action.ts로 파일명을 작성하여 'use server'지시어 추가

```typescript
// example.action.ts
'use server';

// ...server action을 사용하는 파일은 무조건 async함수만 export 할 수 있습니다.
```

<br>

### 6. **서버 코드 작성 컨벤션**

- 서비스, 컨트롤러, DTO 등 서버 관련 코드는 `src/server` 하위에 작성
- 서비스 클래스명은 `*Service`로, 파일명은 `kebab-case` + `.service.ts`로 작성 (예: `banner.service.ts`)
- DTO 파일명은 `kebab-case` + `.request.ts`로 작성 (예: `create-banner.request.ts`)
- 서비스 메서드는 CRUD 역할이 명확히 드러나도록 네이밍 (`getBanners`, `getBannerOne`, `createBanner`, `updateBanner`, `deleteBanner`, `deleteBannerMany` 등)
- Prisma 등 ORM 사용 시, 쿼리 옵션 객체는 명확하게 분리하여 선언
- 데코레이터 사용방법
  - @Dto(schema) : zod 스키마로 body 전체를 검증
  - @StringDto(), @NumberDto(), @BooleanDto(), @DateDto() : 각각 string, number, boolean, date 타입 파라미터를 검증
  - 배열 파라미터는 @StringDto({ isArray: true })처럼 사용
- 서비스 메서드는 반드시 async/await 패턴 사용
- 불변 데이터/파라미터는 함수 인자로만 전달, 클래스 필드로 저장하지 않음
- 주석은 함수/메서드의 역할이 명확히 드러나도록 한글로 작성

## 🔚 정리 요약

| 항목                | 컨벤션                                                               |
| ------------------- | -------------------------------------------------------------------- |
| 폴더 위치           | `app` 외부에 관리                                                    |
| 폴더명, 파일명      | kebab-case                                                           |
| 이미지              | `public/`에 직접 저장                                                |
| 훅 위치             | `hook/apis/{table}` 또는 `hook/custom`                               |
| 훅 명명             | `use-{table}-{action}` (`one`, `list`, `create`, `update`, `delete`) |
| 유틸 함수 위치      | `lib/`, `utils/`                                                     |
| 모든 커스텀 훅/헬퍼 | 기능 설명 주석 필수                                                  |
| Server              | \*.server.ts => import 'server-only'<br>\*.action.ts => 'use server' |

## Prettier

```json
{
  "semi": true,
  "singleQuote": true,
  "printWidth": 120,
  "tabWidth": 2,
  "trailingComma": "all",
  "bracketSpacing": true,
  "arrowParens": "always",
  "endOfLine": "lf",
  "plugins": ["prettier-plugin-tailwindcss"],
  "tailwindConfig": "./tailwind.config.js"
}
```

| 옵션                      | 설명                                                                      |
| ------------------------- | ------------------------------------------------------------------------- |
| `"semi": true`            | 코드 끝에 세미콜론(`;`)을 자동으로 붙입니다.                              |
| `"singleQuote": true`     | 문자열을 `"` 대신 `'`로 감쌉니다.                                         |
| `"printWidth": 120`       | 한 줄 최대 길이를 120자로 제한합니다. 초과 시 줄바꿈 처리합니다.          |
| `"tabWidth": 2`           | 들여쓰기를 스페이스 2칸으로 설정합니다.                                   |
| `"trailingComma": "all"`  | 가능한 모든 곳에 마지막 쉼표(,)를 추가합니다 (예: 객체, 배열 등).         |
| `"bracketSpacing": true`  | 객체 리터럴 `{ foo: bar }`처럼 중괄호 안에 공백을 넣습니다.               |
| `"arrowParens": "always"` | 화살표 함수 매개변수에 괄호를 항상 씌웁니다. `(x) => x` 형태.             |
| `"endOfLine": "lf"`       | 줄바꿈 문자 형식을 `LF(Line Feed)`로 강제합니다. (윈도우에서 CRLF 방지용) |

| 옵션                                         | 설명                                                                                                     |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------- |
| `"plugins": ["prettier-plugin-tailwindcss"]` | Tailwind CSS 클래스 순서를 자동 정렬하는 Prettier 플러그인을 사용합니다.                                 |
| `"tailwindConfig": "./tailwind.config.js"`   | Tailwind 관련 정렬 기준을 커스터마이징하려면 이 설정 파일을 참조합니다. (예: 커스텀 클래스 순서 정의 등) |

<br>
\*\* 추가할 내용 있으면 추가해 주시길 바랍니다.
