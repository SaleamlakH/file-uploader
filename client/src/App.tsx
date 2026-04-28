import Navbar from './layout/navbar/Navbar';
import style from './app.module.css';
import { Outlet } from 'react-router';

function App() {
  return (
    <>
      <header className={style.header}>
        <Navbar />
      </header>

      <main className={style.main}>
        <Outlet />
      </main>
    </>
  );
}

export default App;
