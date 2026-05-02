import style from './folder-card.module.css';
import { Link } from 'react-router';
import { Clock, FileText, Folder as FolderIcon } from '../Icons';
import FolderActionMenu from '../menu/FolderActionMenu';
import type { ReactElement } from 'react';
import type { Folder } from '../../api/types/api';

type FolderCardProps = {
  children: ReactElement<typeof FolderActionMenu>;
  folder: Folder;
};

export default function FolderCard({ folder, children }: FolderCardProps) {
  const createdDate = new Date(folder.createdAt);
  const formattedDate = createdDate.toLocaleDateString('en-us', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className={style.card}>
      <div>
        <Link to={`/folders/${folder.id}`} className={style.folderName}>
          <div className={style.folderIcon}>
            <FolderIcon />
          </div>
          <div className={style.cardHeader}>
            <h3>{folder.name}</h3>
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
        <span>Created {formattedDate} </span>
      </div>
    </div>
  );
}
