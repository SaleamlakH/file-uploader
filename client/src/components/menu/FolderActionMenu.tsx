import { useEffect, useRef, useState } from 'react';
import style from './folder-action-menu.module.css';
import Action from '../Action/Action';
import { MenuDots } from '../Icons';

type MenuProps = {
  className?: string;
  dialogIds: {
    edit: string;
    share: string;
    delete: string;
  };
};

export default function FolderActionMenu({ className, dialogIds }: MenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuBtnRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMenuBtnClick = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleMenuBtnClick);
    return () => document.removeEventListener('mousedown', handleMenuBtnClick);
  }, []);

  return (
    <>
      {/* menu btn */}
      <Action
        as="button"
        ref={menuBtnRef}
        onClick={() => setMenuOpen((prev) => !prev)}
        className={`${style.menuBtn} ${className} menuBtn`}
      >
        <MenuDots />
      </Action>

      <div
        className={`action-items ${className} ${style.menu} ${menuOpen ? style.open : ''}`}
        ref={menuRef}
      >
        {/* share (open form) */}
        <Action
          as="button"
          command="show-modal"
          commandFor={dialogIds.share}
          className={style.menuItem}
        >
          Share
        </Action>

        {/* edit (open form) */}
        <Action
          as="button"
          command="show-modal"
          commandFor={dialogIds.edit}
          className={style.menuItem}
        >
          Edit
        </Action>

        {/* delete (send request)*/}
        <Action
          as="button"
          command="show-modal"
          commandFor={dialogIds.delete}
          className={style.menuItem}
        >
          Delete
        </Action>
      </div>
    </>
  );
}
