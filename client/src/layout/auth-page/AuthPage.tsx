import Action from '../../components/Action/Action';
import style from './auth-page.module.css';
import logoSvg from '../../assets/logo.svg';
import type { ReactNode } from 'react';

type AuthPageProp = {
  variant: 'login' | 'signup';
  title: string;
  subtitle: string;
  children: ReactNode;
  onSubmit: React.SubmitEventHandler;
};

export default function AuthForm({
  onSubmit,
  variant = 'login',
  title,
  subtitle,
  children,
}: AuthPageProp) {
  const isSignup = variant === 'signup';

  return (
    <main className={style.page}>
      <header className={style.header}>
        <img src={logoSvg} alt="logo" />
        <h1 id="auth-title" className={style.title}>
          {title}
        </h1>
        <p className={style.subtitle}>{subtitle}</p>
      </header>

      <div className={style.container}>
        <form onSubmit={onSubmit} className={style.form}>
          {children}

          <Action as="button" type="submit" variant="primary" style={{ width: '100%' }}>
            {isSignup ? 'Create Account' : 'Sign In'}
          </Action>
        </form>

        <footer className={style.footer}>
          <p>
            {isSignup ? "Don't have an account?" : 'Already have an account?'}{' '}
            <Action as="link" to={`${isSignup ? '/login' : '/signup'}`} className={style.link}>
              {isSignup ? 'login' : 'Create one'}
            </Action>
          </p>
        </footer>
      </div>
    </main>
  );
}
