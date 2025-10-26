# 🚀 Directional FE Hiring – Demo

React + Vite + TypeScript 기반 데모 앱입니다.  
과제 요구사항(**게시판 + 차트 + 인증 + i18n**)을 모두 만족합니다.

- **게시판**: 작성/조회/수정/삭제, 검색, 정렬, 카테고리 필터, 커서 기반 페이지네이션, 금칙어 필터
- **차트**: 도넛(TopBrands), 스택형 바/면적(WeeklyMood), 팀별 멀티라인(CoffeeMultiLine)
- **i18n**: ko/en 전환
- **인증**: JWT 로그인, 보호/공개 라우트 가드

---

## ⚙️ 빠른 시작

```bash
# 의존성 설치 (yarn만 사용)
yarn install

# 로컬 개발
yarn dev

# 프로덕션 빌드
yarn build

# 빌드 결과 미리보기
yarn preview

# ESLint
yarn lint

🔐 환경 변수
루트에 .env.local 생성:

bash
코드 복사
VITE_API_URL=https://fe-hiring-rest-api.vercel.app

🧰 기술 스택
Framework & Build: React 19, Vite 7, TypeScript 5

Routing: react-router-dom 7

상태/데이터: Zustand 5, TanStack Query 5 (+ Devtools)

스타일: styled-components 6 (테마/디자인 토큰), Prettier

차트: Recharts 3

i18n: i18next 25, react-i18next 16

UX: @studio-freight/lenis 1, AOS 2

폼/검증: react-hook-form 7, zod 4, @hookform/resolvers

네트워킹: axios 1

품질: ESLint 9, eslint-plugin-react-hooks, eslint-config-prettier

Vite 플러그인: @vitejs/plugin-react-swc 4

📁 프로젝트 구조

src/
  App.tsx
  index.tsx
  index.css
  not-found.tsx

  components/
    charts/
      ChartBox.tsx
      CoffeMultiLine.tsx
      TopBrands.tsx
      WeeklyMood.tsx
    common/
      Layout/
        app.header.tsx
        app.footer.tsx
        app.layout.tsx
      icons/
        commons.tsx
      ui/
        Button.tsx
        Input.tsx
        Modal.tsx
        TextArea.tsx
        Typo.tsx

  hooks/
    useHealth.ts
    useIntersection.ts
    useLenis.ts
    usePosts.ts

  net/
    api.ts
    type.ts

  pages/
    home.page.tsx
    sign-in.page.tsx
    charts.page.tsx
    posts/
      posts.page.tsx
      posts.create.tsx
      posts.update.tsx

  routes/
    PermissionGuard.tsx
    ProtectedRoute.tsx
    PublicOnlyRoute.tsx

  stores/
    store.auth.ts
    type.ts

  styles/
    theme.ts
    styled.d.ts
    app.header.ts
    app.footer.ts
    app.layout.ts
    home.page.ts
    charts.page.ts
    posts.page.ts
    sign-in.page.ts
    PostCard.ts
    PostFilters.ts
    PostForm.ts
    PostReadModal.ts

  types/
    axios.d.ts

  utils/
    chart.ts            # adaptCoffeeConsumption / flattenCoffeeTeams
    i18n.ts
    post.ts             # 금칙어/태그 유틸
    regexps.ts

📰 게시판(Posts) 요약
CRUD(목록/조회/작성/수정/삭제)

검색(제목+본문), 정렬(createdAt/title), 카테고리(NOTICE/QNA/FREE)

커서 기반 페이지네이션(무한 스크롤)

금칙어 필터(자모/공백/기호 변형 대응)

태그: 중복 제거, 최대 5개, 각 24자

i18n 기반 폼/오류 메시지

📊 차트(Charts) 요약
TopBrands: 도넛 & 막대 / 브랜드명·툴팁·레전드 i18n / 핑크 팔레트

WeeklyMood: 스택형 Area/Bar (stackOffset="expand" → % 시각화)

CoffeeMultiLine:

X축: 커피 잔 수(cups)

좌 Y축: 버그(bugs, 실선) / 우 Y축: 생산성(productivity, 점선)

팀 컬러/마커(원·사각형) 일관성, 툴팁 요약

adaptCoffeeConsumption()으로 응답 스키마 차이(series/data) 흡수 → flattenCoffeeTeams()로 납작화

🔌 API 요약
Auth: POST /auth/login (JWT)

Posts:

GET /posts (커서 기반)

POST /posts

GET /posts/:id

PATCH /posts/:id

DELETE /posts/:id, DELETE /posts (내 모든 글 삭제)

Mock:

GET /mock/top-coffee-brands

GET /mock/weekly-mood-trend

GET /mock/coffee-consumption

응답 타입은 src/net/type.ts 참고 (Swagger 정의와 합치).

🌐 i18n
리소스: public/locales/{ko,en}/…

차트/폼/오류 등 전역 문구 i18n 적용

브랜드명/툴팁/범례 문자열도 i18n 키 매핑
```
