'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { ArrowRight, Building2, CheckCircle2, Eye, EyeOff, Loader2, Lock, Mail, ShieldCheck, Sparkles, UserRound } from 'lucide-react';
import type { AuthFormErrors, AuthFormValues, AuthMode, OAuthProvider } from '@/features/auth/types';
import { signInWithOAuthProvider, signInWithPassword, signUpWithPassword } from '@/features/auth/services/auth.service';

interface AuthPageProps {
  mode: AuthMode;
}

const emptyValues: AuthFormValues = {
  name: '',
  email: '',
  password: '',
};

function validate(values: AuthFormValues, mode: AuthMode): AuthFormErrors {
  const errors: AuthFormErrors = {};
  if (mode === 'sign-up' && values.name.trim().length < 2) {
    errors.name = 'Please enter your name.';
  }
  if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = 'Use a valid business email.';
  }
  if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters.';
  }
  return errors;
}

export default function AuthPage({ mode }: AuthPageProps) {
  const [values, setValues] = useState<AuthFormValues>(emptyValues);
  const [errors, setErrors] = useState<AuthFormErrors>({});
  const [loading, setLoading] = useState(false);
  const [oauthLoading, setOauthLoading] = useState<OAuthProvider | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const isSignUp = mode === 'sign-up';
  const copy = useMemo(
    () => ({
      eyebrow: isSignUp ? 'Start building in minutes' : 'Welcome back',
      title: isSignUp ? 'Create your PropPilot AI workspace' : 'Sign in to PropPilot AI',
      subtitle: isSignUp
        ? 'Launch AI property videos, avatar campaigns, and listing pages from one clean studio.'
        : 'Manage AI Sales assets, avatar libraries, and campaign workflows securely.',
      primary: isSignUp ? 'Create account' : 'Sign in',
      switchText: isSignUp ? 'Already have an account?' : 'New to PropPilot AI?',
      switchHref: isSignUp ? '/sign-in' : '/sign-up',
      switchLabel: isSignUp ? 'Sign in' : 'Create an account',
    }),
    [isSignUp],
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('insforge_status') === 'success') {
      setStatusMessage('Email verified. You can sign in now.');
    }
    if (params.get('insforge_status') === 'error') {
      setErrors({ form: params.get('insforge_error') || 'Authentication link failed. Please try again.' });
    }
  }, []);

  const updateField = (field: keyof AuthFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined, form: undefined }));
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values, mode);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    setStatusMessage(null);
    try {
      if (isSignUp) {
        const data = await signUpWithPassword(values);
        if (data?.requireEmailVerification) {
          setStatusMessage('Account created. Check your email for the verification code before signing in.');
        } else {
          window.location.href = '/dashboard';
        }
      } else {
        await signInWithPassword(values);
        window.location.href = '/dashboard';
      }
    } catch (error) {
      setErrors({ form: error instanceof Error ? error.message : 'Authentication failed. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const startOAuth = async (provider: OAuthProvider) => {
    setOauthLoading(provider);
    setErrors({});
    try {
      await signInWithOAuthProvider(provider);
    } catch (error) {
      setErrors({ form: error instanceof Error ? error.message : `${provider} sign in is not available yet.` });
      setOauthLoading(null);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--background)] px-5 py-6 text-[var(--foreground)] sm:px-8">
      <div className="mx-auto flex min-h-[calc(100vh-48px)] max-w-[1180px] items-center justify-center">
        <div className="grid w-full overflow-hidden rounded-[32px] border border-[var(--border)] bg-[var(--card)] shadow-[var(--shadow-card)] lg:grid-cols-[0.95fr_1.05fr]">
          <section className="relative hidden overflow-hidden bg-gradient-to-br from-[#6C63FF] via-[#745BFF] to-[#111827] p-10 text-white lg:flex lg:flex-col lg:justify-between">
            <div className="absolute inset-0 opacity-35" style={{ backgroundImage: 'radial-gradient(circle at 20% 20%, #ffffff 0 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
            <div className="relative z-10">
              <Link href="/" className="inline-flex items-center gap-3 rounded-2xl bg-white/12 px-3 py-2 backdrop-blur-md">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#6C63FF]">
                  <Building2 className="h-5 w-5" />
                </span>
                <span className="text-[18px] font-extrabold">PropPilot AI</span>
              </Link>
              <h2 className="mt-14 max-w-[460px] text-[44px] font-black leading-[1.04] tracking-[-1.3px]">
                Premium AI Studio for real estate growth teams.
              </h2>
              <p className="mt-5 max-w-[420px] text-[16px] font-medium leading-[1.8] text-white/74">
                Secure authentication, connected AI workflows, and polished dashboards built for modern SaaS operations.
              </p>
            </div>

            <div className="relative z-10 grid gap-4 rounded-[26px] border border-white/16 bg-white/10 p-5 backdrop-blur-xl">
              {['Google OAuth ready', 'InsForge-backed sessions', 'Dark mode design tokens'].map((item) => (
                <div key={item} className="flex items-center gap-3 text-[14px] font-bold text-white/90">
                  <CheckCircle2 className="h-5 w-5 text-emerald-300" />
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="p-6 sm:p-8 lg:p-12">
            <div className="mx-auto max-w-[480px]">
              <Link href="/" className="mb-8 inline-flex items-center gap-2 text-[14px] font-extrabold text-[var(--primary)] lg:hidden">
                <Sparkles className="h-4 w-4" /> PropPilot AI
              </Link>

              <div className="inline-flex rounded-full border border-[var(--border)] bg-[var(--secondary)] px-3 py-1.5 text-[12px] font-extrabold uppercase tracking-[0.12em] text-[var(--secondary-foreground)]">
                {copy.eyebrow}
              </div>
              <h1 className="mt-5 text-[34px] font-black leading-[1.08] tracking-[-0.9px] text-[var(--foreground)] sm:text-[42px]">
                {copy.title}
              </h1>
              <p className="mt-4 text-[15px] font-medium leading-[1.8] text-[var(--muted-foreground)]">
                {copy.subtitle}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => startOAuth('google')}
                  disabled={Boolean(oauthLoading) || loading}
                  className="theme-focus flex h-12 items-center justify-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--input)] text-[14px] font-extrabold text-[var(--foreground)] transition hover:-translate-y-0.5 hover:border-[var(--primary)] disabled:cursor-wait disabled:opacity-70"
                >
                  {oauthLoading === 'google' ? <Loader2 className="h-4 w-4 animate-spin" /> : <span className="text-[18px]">G</span>}
                  Google
                </button>
                <button
                  type="button"
                  onClick={() => startOAuth('twitter')}
                  disabled={Boolean(oauthLoading) || loading}
                  className="theme-focus flex h-12 items-center justify-center gap-3 rounded-2xl border border-[var(--border)] bg-[var(--input)] text-[14px] font-extrabold text-[var(--foreground)] transition hover:-translate-y-0.5 hover:border-[var(--primary)] disabled:cursor-wait disabled:opacity-70"
                >
                  {oauthLoading === 'twitter' ? <Loader2 className="h-4 w-4 animate-spin" /> : <span className="text-[16px] font-black">X</span>}
                  X / Twitter
                </button>
              </div>

              <div className="my-7 flex items-center gap-4 text-[12px] font-bold uppercase tracking-[0.14em] text-[var(--muted-foreground)]">
                <span className="h-px flex-1 bg-[var(--border)]" />
                or continue with email
                <span className="h-px flex-1 bg-[var(--border)]" />
              </div>

              <form className="space-y-4" onSubmit={submit} noValidate>
                {isSignUp && (
                  <label className="block">
                    <span className="text-[13px] font-extrabold text-[var(--foreground)]">Full name</span>
                    <div className={`mt-2 flex h-13 items-center gap-3 rounded-2xl border bg-[var(--input)] px-4 transition ${errors.name ? 'border-[var(--destructive)]' : 'border-[var(--border)] focus-within:border-[var(--primary)]'}`}>
                      <UserRound className="h-4 w-4 text-[var(--muted-foreground)]" />
                      <input value={values.name} onChange={(e) => updateField('name', e.target.value)} className="h-full min-w-0 flex-1 bg-transparent text-[15px] font-semibold outline-none placeholder:text-[var(--muted-foreground)]" placeholder="Ada Lovelace" />
                    </div>
                    {errors.name && <p className="mt-1.5 text-[12px] font-bold text-[var(--destructive)]">{errors.name}</p>}
                  </label>
                )}

                <label className="block">
                  <span className="text-[13px] font-extrabold text-[var(--foreground)]">Email</span>
                  <div className={`mt-2 flex h-13 items-center gap-3 rounded-2xl border bg-[var(--input)] px-4 transition ${errors.email ? 'border-[var(--destructive)]' : 'border-[var(--border)] focus-within:border-[var(--primary)]'}`}>
                    <Mail className="h-4 w-4 text-[var(--muted-foreground)]" />
                    <input type="email" value={values.email} onChange={(e) => updateField('email', e.target.value)} className="h-full min-w-0 flex-1 bg-transparent text-[15px] font-semibold outline-none placeholder:text-[var(--muted-foreground)]" placeholder="you@company.com" />
                  </div>
                  {errors.email && <p className="mt-1.5 text-[12px] font-bold text-[var(--destructive)]">{errors.email}</p>}
                </label>

                <label className="block">
                  <span className="text-[13px] font-extrabold text-[var(--foreground)]">Password</span>
                  <div className={`mt-2 flex h-13 items-center gap-3 rounded-2xl border bg-[var(--input)] px-4 transition ${errors.password ? 'border-[var(--destructive)]' : 'border-[var(--border)] focus-within:border-[var(--primary)]'}`}>
                    <Lock className="h-4 w-4 text-[var(--muted-foreground)]" />
                    <input type={showPassword ? 'text' : 'password'} value={values.password} onChange={(e) => updateField('password', e.target.value)} className="h-full min-w-0 flex-1 bg-transparent text-[15px] font-semibold outline-none placeholder:text-[var(--muted-foreground)]" placeholder="Minimum 6 characters" />
                    <button type="button" onClick={() => setShowPassword((value) => !value)} className="text-[var(--muted-foreground)] hover:text-[var(--primary)]" aria-label={showPassword ? 'Hide password' : 'Show password'}>
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                  {errors.password && <p className="mt-1.5 text-[12px] font-bold text-[var(--destructive)]">{errors.password}</p>}
                </label>

                {errors.form && <div className="rounded-2xl border border-[var(--destructive)]/25 bg-[var(--destructive)]/10 px-4 py-3 text-[13px] font-bold text-[var(--destructive)]">{errors.form}</div>}
                {statusMessage && <div className="rounded-2xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-3 text-[13px] font-bold text-emerald-600 dark:text-emerald-300">{statusMessage}</div>}

                <button type="submit" disabled={loading || Boolean(oauthLoading)} className="theme-focus flex h-13 w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#7B61FF] to-[#5B6CFF] text-[15px] font-black text-white shadow-[0_18px_42px_rgba(108,99,255,0.24)] transition hover:-translate-y-0.5 hover:brightness-105 disabled:cursor-wait disabled:opacity-70">
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ShieldCheck className="h-4 w-4" />}
                  {copy.primary}
                  {!loading && <ArrowRight className="h-4 w-4" />}
                </button>
              </form>

              <p className="mt-7 text-center text-[14px] font-semibold text-[var(--muted-foreground)]">
                {copy.switchText}{' '}
                <Link href={copy.switchHref} className="font-black text-[var(--primary)] hover:underline">
                  {copy.switchLabel}
                </Link>
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}