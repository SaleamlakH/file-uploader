import { Link } from 'react-router';
import logoSvg from '../../assets/logo.svg';
import { Logout as LogoutIcon, User as UserIcon } from '../../components/Icons';
import style from './navbar.module.css';

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
          <Link to="/login" className={style.login}>
            Login
          </Link>
          <Link to="/signup" className={style.signup}>
            Signup
          </Link>
          <Link to="/logout" className={style.logout}>
            <LogoutIcon />
            Logout
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
