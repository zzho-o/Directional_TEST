// src/pages/sign-in.page.tsx
import { useMutation } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuthStore } from '@/stores/store.auth';
import { apiAuth } from '@/net/api';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import Button from '@/components/common/ui/Button';
import Input from '@/components/common/ui/Input';
import { ErrorText, Helper, Title, Wrap } from '@/styles/sign-in.page';
import { RegExps } from '@/utils/regexps';

const schema = z.object({
  email: z.string().min(1, 'required').regex(RegExps.email, 'invalid_email'),
  password: z.string().min(1, 'required').regex(RegExps.password, 'invalid_password'),
});
type FormValues = z.infer<typeof schema>;

export default function SignInPage() {
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const redirect = params.get('redirect') || '/home';
  const setAuth = useAuthStore(s => s.setAuth);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setError,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    reValidateMode: 'onChange',
    defaultValues: { email: '', password: '' },
  });

  const { mutate } = useMutation({
    mutationFn: ({ email, password }: FormValues) => apiAuth.postAuthLogin(email, password),
    onSuccess: data => {
      setAuth({ token: data.token, user: data.user });
      navigate(redirect, { replace: true });
    },
    onError: () => {
      setError('password', { type: 'server', message: 'invalid_credentials' });
    },
  });

  const onSubmit = (values: FormValues) => mutate(values);

  // i18n 에러 변환
  const tErr = (key?: string) => (key ? t(`errors.${key}` as const, { defaultValue: key }) : undefined);

  const serverInvalid = errors.password?.message === 'invalid_credentials';

  return (
    <Wrap onSubmit={handleSubmit(onSubmit)} noValidate>
      <Title>{t('title')}</Title>
      <Helper>{t('helper')}</Helper>

      <Input placeholder={t('emailPlaceholder')} type="email" autoComplete="email" {...register('email')} />
      {/* 이메일 형식 에러만 필드 아래에 노출 */}
      {errors.email && errors.email.message !== 'invalid_credentials' && (
        <ErrorText>{tErr(errors.email.message)}</ErrorText>
      )}

      <Input
        placeholder={t('passwordPlaceholder')}
        type="password"
        autoComplete="current-password"
        {...register('password')}
      />
      {/* 비밀번호 형식 에러만 필드 아래에 노출 (서버 에러는 상단 단일문구로) */}
      {errors.password && errors.password.message !== 'invalid_credentials' && (
        <ErrorText>{tErr(errors.password.message)}</ErrorText>
      )}

      {/* 서버 인증 실패만 상단 단일 문구로 */}
      {serverInvalid && <ErrorText>{t('errors.invalid_credentials')}</ErrorText>}

      <Button size="lg" variant="primary" type="submit" disabled={isSubmitting || !isValid}>
        {isSubmitting ? t('submitting') : t('login')}
      </Button>
    </Wrap>
  );
}
