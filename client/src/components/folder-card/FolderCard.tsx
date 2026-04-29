import style from './folder-card.module.css';
import { Link } from 'react-router';
import { Clock, FileText, Folder } from '../Icons';
import FolderActionMenu from '../menu/FolderActionMenu';
import type { ReactElement } from 'react';

type FolderCardProps = {
  children: ReactElement<typeof FolderActionMenu>;
};

export default function FolderCard({ children }: FolderCardProps) {
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

        {children}
      </div>

      <div className={style.createdAt}>
        <Clock />
        <span>Created Apr 28, 2024 </span>
      </div>
    </div>
  );
}
