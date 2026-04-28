import { Link } from 'react-router';
import logoSvg from '../../assets/logo.svg';
import { Logout as LogoutIcon, User as UserIcon } from '../../components/Icons';
import style from './navbar.module.css';
import Action from '../../components/Action/Action';

function Navbar() {
  return (
    <nav className={style.navbar}>
      <Link to="/login" className={style.brand}>
        <img src={logoSvg} alt="logo" />
        <span>Cloudstore</span>
      </Link>

      <div className={style.rightNav}>
        <div className={style.user}>
          <UserIcon />
          t@gmail.com
        </div>
        <div className={style.links}>
          <Action as="link" to="/login" variant="secondary">
            Login
          </Action>

          <Action as="link" to="/signup" variant="primary">
            Signup
          </Action>

          <Action as="link" to="/logout" className={style.logout}>
            <LogoutIcon />
            Logout
          </Action>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
