import style from './root-layout.module.css';
import { Link, Outlet, useLoaderData, useNavigate } from 'react-router';
import { Logout as LogoutIcon, User as UserIcon } from '../../components/Icons';
import Action from '../../components/Action/Action';
import logoSvg from '../../assets/logo.svg';
import type { User } from '../../api/types/api';
import { logout } from '../../api/auth';

export default function RootLayout() {
  const navigate = useNavigate();
  const user = useLoaderData<User | null>();

  const handleLogout = async () => {
    await logout();

    navigate('/');
  };

  return (
    <>
      <header className={style.header}>
        <nav className={style.navbar}>
          <Link to="/login" className={style.brand}>
            <img src={logoSvg} alt="logo" />
            <span>Cloudstore</span>
          </Link>

          <div className={style.rightNav}>
            {user && (
              <div className={style.user}>
                <UserIcon />
                {user.email}
              </div>
            )}
            <div className={style.links}>
              {user ? (
                <Action as="button" onClick={handleLogout} className={style.logout}>
                  <LogoutIcon />
                  Logout
                </Action>
              ) : (
                <>
                  <Action as="link" to="/login" variant="secondary">
                    Login
                  </Action>

                  <Action as="link" to="/signup" variant="primary">
                    Signup
                  </Action>
                </>
              )}
            </div>
          </div>
        </nav>
      </header>

      <main className={style.main}>
        <Outlet />
      </main>
    </>
  );
}
