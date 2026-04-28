import logoSvg from '../../assets/logo.svg';
import { Logout as LogoutIcon, User as UserIcon } from '../../components/Icons';
import style from './navbar.module.css';

function Navbar() {
  return (
    <nav className={style.navbar}>
      <a href="#" className={style.brand}>
        <img src={logoSvg} alt="logo" />
        <span>Cloudstore</span>
      </a>

      <div className={style.rightNav}>
        <div className={style.user}>
          <UserIcon />
          t@gmail.com
        </div>
        <div className={style.links}>
          <a href="#" className={style.login}>
            Login
          </a>
          <a href="#" className={style.signup}>
            Signup
          </a>
          <a href="#" className={style.logout}>
            <LogoutIcon />
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
