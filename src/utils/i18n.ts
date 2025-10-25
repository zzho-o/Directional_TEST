import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const LS_KEY = 'lang';
const initialLng = (typeof window !== 'undefined' && localStorage.getItem(LS_KEY)) || 'ko';

export const setLanguage = (lng: 'ko' | 'en') => {
  i18n.changeLanguage(lng);
  if (typeof window !== 'undefined') localStorage.setItem(LS_KEY, lng);
};

const resources = {
  ko: {
    common: {
      brand: '디렉셔널',
      logout: '로그아웃',
      lang_ko: '한국어',
      lang_en: 'English',
      Home: '홈',
    },
    auth: {
      title: '로그인',
      helper: '이메일과 비밀번호를 입력하세요.',
      emailPlaceholder: '이메일',
      passwordPlaceholder: '비밀번호',
      login: '로그인',
      submitting: '확인 중…',
      errors: {
        required: '필수 입력 항목입니다.',
        invalid_email: '올바른 이메일 형식이 아닙니다.',
        invalid_password: '비밀번호 형식이 올바르지 않습니다.',
        invalid_credentials: '이메일 또는 비밀번호를 확인해 주세요.',
      },
    },
    footer: {
      contact: 'Contact',
      email: 'help@directional.net',
      companyBlock: `주식회사 디렉셔널
대표 : 이윤정
사업자 등록번호 : 758-86-01081
07327, 서울특별시 영등포구 여의나루로 53-1, 1103호(여의도동, 대오빌딩)`,
    },
  },
  en: {
    common: {
      brand: 'Directional',
      logout: 'Logout',
      lang_ko: 'Korean',
      lang_en: 'English',
      Home: 'Home',
    },
    auth: {
      title: 'Sign in',
      helper: 'Enter the email and password.',
      emailPlaceholder: 'Email',
      passwordPlaceholder: 'Password',
      login: 'Sign in',
      submitting: 'Checking…',
      errors: {
        required: 'This field is required.',
        invalid_email: 'Invalid email format.',
        invalid_password: 'Invalid password format.',
        invalid_credentials: 'Please check your email or password.',
      },
    },
    footer: {
      contact: 'Contact',
      email: 'help@directional.net',
      companyBlock: `Directional Inc.
CEO : Yunjeong Lee
Business registration number : 758-86-01081
07327, 53-1, Yeouinaru-ro, Yeongdeungpo-gu, 1103 (Yeouido-dong, Daeo Bldg), 
Seoul, Republic of Korea`,
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: initialLng,
  fallbackLng: 'ko',
  supportedLngs: ['ko', 'en'],
  ns: ['common', 'auth'],
  defaultNS: 'common',
  interpolation: { escapeValue: false },
});

export default i18n;
