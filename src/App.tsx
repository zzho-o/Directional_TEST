import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/common/Layout/app.layout';
import SignInPage from '@/pages/sign-in.page';
import HomePage from '@/pages/home.page';

import PublicOnlyRoute from '@/routes/PublicOnlyRoute';
import ProtectedRoute from '@/routes/ProtectedRoute';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        {/* 공개 전용: 로그인 상태면 /home 으로 우회 */}
        <Route element={<PublicOnlyRoute />}>
          <Route index element={<SignInPage />} />
        </Route>

        {/* 보호 구간: 비로그인 접근 차단 */}
        <Route element={<ProtectedRoute />}>
          <Route path="home" element={<HomePage />} />
          {/* 여기에 다른 보호 라우트 추가 */}
        </Route>

        {/* 404 등 */}
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Route>
    </Routes>
  );
}
