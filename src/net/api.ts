import axios from 'axios';
import { useAuthStore } from '@/stores/store.auth';
import { LoginResp } from './type';

const BASE_URL = import.meta.env.VITE_API_URL;

export const API = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10_000,
});

// 요청 인터셉터: Bearer 토큰 자동 첨부
API.interceptors.request.use(config => {
  const token = useAuthStore.getState().token;
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

API.interceptors.response.use(
  res => {
    if (res.config.responseType === 'blob') return res;
    if (res.status === 204) return undefined;
    const data = res.data;
    return data?.data ?? data;
  },
  err => {
    const status = err?.response?.status;
    const url = (err?.config?.url ?? '') as string;
    const isLogin = url.includes('/auth/login');

    if (status === 401 && !isLogin) {
      useAuthStore.getState().logout?.();
      const here = window.location.pathname + window.location.search;
      window.location.href = `/?redirect=${encodeURIComponent(here)}`;
      return Promise.reject(err);
    }
    const msg = err?.response?.data?.message || err.message || '요청 중 오류가 발생했습니다.';
    return Promise.reject(new Error(msg));
  },
);

// ===== AUTH =====

export const apiAuth = {
  postAuthLogin: async (email: string, password: string) => API.post<LoginResp>('/auth/login', { email, password }),
};

// ===== HEALTH =====
export const apiHealth = {
  get: () => API.get<{ ok: boolean }>('/health'),
};
