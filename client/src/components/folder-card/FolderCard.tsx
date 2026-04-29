import { useEffect, useRef, useState } from 'react';
import style from './folder-card.module.css';
import { Link } from 'react-router';
import { Clock, FileText, Folder, MenuDots } from '../Icons';
import Action from '../Action/Action';

type FolderCardProps = {
  dialogIds: {
    edit: string;
    share: string;
  };
};

export default function FolderCard({ dialogIds }: FolderCardProps) {
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
    <div className={style.card}>
      <div>
        <Link to="/folders/folderId" className={style.folderName}>
          <div className={style.folderIcon}>
            <Folder />
          </div>
          <div className={style.cardHeader}>
            <h3>Work Documents Documents Documents</h3>
            <div className={style.fileCount}>
              <FileText />
              <span>5 files</span>
            </div>
          </div>
        </Link>

        <Action
          as="button"
          ref={menuBtnRef}
          onClick={() => setMenuOpen((prev) => !prev)}
          className={style.cardMenuBtn}
        >
          <MenuDots />
        </Action>

        {/* menu options */}
        <div className={`${style.menuItems} ${menuOpen ? style.open : ''}`} ref={menuRef}>
          {/* share (open form) */}
          <Action
            as="button"
            command="show-modal"
            commandFor={dialogIds.share}
            className={style.item}
          >
            Share
          </Action>

          {/* edit (open form) */}
          <Action
            as="button"
            command="show-modal"
            commandFor={dialogIds.edit}
            className={style.item}
          >
            Edit
          </Action>

          {/* delete (send request)*/}
          <Action as="link" to="#" className={`${style.item} ${style.deleteLink}`}>
            Delete
          </Action>
        </div>
      </div>

      <div className={style.createdAt}>
        <Clock />
        <span>Created Apr 28, 2024 </span>
      </div>
    </div>
  );
}
