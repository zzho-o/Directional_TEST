import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/stores/store.auth';

export default function ProtectedRoute() {
  const isAuthed = useAuthStore(s => s.isAuthed);
  const loc = useLocation();
  if (!isAuthed) {
    const redirect = encodeURIComponent(loc.pathname + loc.search);
    return <Navigate to={`/?redirect=${redirect}`} replace />;
  }
  return <Outlet />;
}
