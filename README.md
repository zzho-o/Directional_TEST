# 🚀 Directional FE Hiring – Demo

React + Vite + TypeScript 기반 데모 앱입니다.  
과제 요구사항(**게시판 + 차트 + 인증 + i18n**)을 모두 만족합니다.

- **게시판**: 작성/조회/수정/삭제, 검색, 정렬, 카테고리 필터, 커서 기반 페이지네이션, 금칙어 필터
- **차트**: 도넛(TopBrands), 스택형 바/면적(WeeklyMood), 팀별 멀티라인(CoffeeMultiLine)
- **i18n**: ko/en 전환
- **인증**: JWT 로그인, 보호/공개 라우트 가드

## 🌐 배포 주소

- **GitHub Pages**: https://zzho-o.github.io/Directional_TEST/

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

상태/데이터: Zustand 5, TanStack Query 5

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
  App.tsx                         — 라우팅 구성 및 전역 레이아웃 진입
  index.tsx
  index.css
  not-found.tsx                   — 404 페이지

  components/
    charts/
      ChartBox.tsx                — 차트 공통 카드 래퍼(UI/여백/제목)
      CoffeMultiLine.tsx          — 팀별 버그·생산성 멀티라인 차트
      TopBrands.tsx               — 도넛/막대(브랜드 인기) 차트
      WeeklyMood.tsx              — 스택형 면적/바(주간 무드) 차트
    common/
      Layout/
        app.header.tsx
        app.footer.tsx
        app.layout.tsx            — 페이지 공통 레이아웃(고정 헤더, Lenis, AOS)
      icons/
        commons.tsx               — 재사용 아이콘 모음
      ui/
        Button.tsx                — 버튼 컴포넌트(variant/size)
        Input.tsx                 — 인풋 컴포넌트(스타일 일관)
        Modal.tsx                 — 기본 모달 오버레이/바디
        TextArea.tsx              — 텍스트영역(입력 스타일 일관)
        Typo.tsx                  — 타이포 스케일/믹스인

  hooks/
    useHealth.ts                  — /health 쿼리 훅
    useIntersection.ts            — 무한스크롤 IntersectionObserver 훅
    useLenis.ts                   — 부드러운 스크롤 Lenis 싱글턴 훅
    usePosts.ts                   — 게시글 조회/상세/CRUD 뮤테이션 훅

  net/
    api.ts                        — axios 인스턴스/인터셉터, API 함수 모음
    type.ts                       — 스웨거 기반 네트워크 타입 정의

  pages/
    home.page.tsx                 — 홈(허브) 화면
    sign-in.page.tsx              — 로그인 화면(RHF + zod)
    charts.page.tsx               — 차트 데모 페이지
    posts/
      posts.page.tsx              — 게시판 목록(필터/무한스크롤/모달읽기)
      posts.create.tsx            — 새 글 작성 페이지
      posts.update.tsx            — 글 수정 페이지

  routes/
    PermissionGuard.tsx           — (확장용) 권한 가드 자리
    ProtectedRoute.tsx            — 인증 필요 라우트 가드
    PublicOnlyRoute.tsx           — 비인증 전용(로그인 상태면 리다이렉트)
    PostReadModal.tsx             - 읽기전용 모달

  stores/
    store.auth.ts                 — 인증 상태(Zustand)
    type.ts                       — 스토어 관련 타입

  styles/
    theme.ts                      — 디자인 토큰(색상/라운딩 등)
    styled.d.ts                   — styled-components 타입 보강
    app.header.ts                 — 헤더 스타일
    app.footer.ts                 — 푸터 스타일
    app.layout.ts                 — 레이아웃/메인 컨테이너 스타일
    home.page.ts                  — 홈 페이지 스타일
    charts.page.ts                — 차트 페이지 스타일
    posts.page.ts                 — 게시판 페이지 스타일
    sign-in.page.ts               — 로그인 페이지 스타일
    PostCard.ts                   — 카드 컴포넌트 스타일(분리)
    PostFilters.ts                — 필터 바 스타일
    PostForm.ts                   — 폼 스타일
    PostReadModal.ts              — 읽기 모달 스타일

  types/
    axios.d.ts                    — axios 모듈 타입 보강/전역 선언

  utils/
    chart.ts                      — 차트 데이터 어댑트/플랫 변환 헬퍼
    i18n.ts                       — i18next 초기화 및 리소스
    post.ts                       — 금칙어 검사/태그 정규화 유틸
    regexps.ts                    — 정규식 모음(이메일 등)

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
