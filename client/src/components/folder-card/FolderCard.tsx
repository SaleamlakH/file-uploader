import style from './folder-card.module.css';
import { Link } from 'react-router';
import { Clock, FileText, Folder as FolderIcon } from '../Icons';
import FolderActionMenu from '../menu/FolderActionMenu';
import { useState, type ReactElement } from 'react';
import type { Folder } from '../../api/types/api';
import ShareForm from '../share-form/ShareForm';
import EditForm from '../edit-form/EditForm';
import DeleteFolder from '../folder-delete/FolderDelete';

type FolderCardProps = {
  children: ReactElement<typeof FolderActionMenu>;
  folder: Folder;
  setFolders: (value: Folder[] | ((prevState: Folder[]) => Folder[])) => void;
};

export default function FolderCard({ folder, children, setFolders }: FolderCardProps) {
  const [name, setName] = useState(folder.name);
  const createdDate = new Date(folder.createdAt);
  const formattedDate = createdDate.toLocaleDateString('en-us', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  // delete folder
  const handleDelete = () => setFolders((prev) => prev.filter(({ id }) => id !== folder.id));

  return (
    <>
      <div className={style.card}>
        <div>
          <Link to={`/folders/${folder.id}`} className={style.folderName}>
            <div className={style.folderIcon}>
              <FolderIcon />
            </div>
            <div className={style.cardHeader}>
              <h3>{name}</h3>
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

      {/* share-folder form */}
      <ShareForm folderId={folder.id} />

      {/* Edit folder form */}
      <EditForm setName={setName} name={name} folderId={folder.id} />

      {/* Delete folder */}
      <DeleteFolder onDelete={handleDelete} folderId={folder.id} />
    </>
  );
}
