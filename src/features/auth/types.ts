export interface AuthUser {
  id: string;
  email: string;
  name?: string;
}

export interface AuthSession {
  user: AuthUser;
  accessToken: string;
}

export type AuthMode = 'sign-in' | 'sign-up';

export type OAuthProvider = 'google' | 'twitter';

export interface AuthFormValues {
  name: string;
  email: string;
  password: string;
}

export interface AuthFormErrors {
  name?: string;
  email?: string;
  password?: string;
  form?: string;
}