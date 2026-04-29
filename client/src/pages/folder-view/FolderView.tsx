import Action from '../../components/Action/Action';
import { Download, Upload } from '../../components/Icons';
import style from './folder-view.module.css';
import ShareForm from '../../components/share-form/ShareForm';
import EditForm from '../../components/edit-form/EditForm';
import DeleteFolder from '../../components/folder-delete/FolderDelete';
import FolderActionMenu from '../../components/menu/FolderActionMenu';
import UploadFileForm from '../../components/upload-file-form/UploadFileForm';
import { useState } from 'react';

export default function FolderView() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const formatSize = (size: number) => {
    if (typeof size !== 'number' || isNaN(size)) return '-';
    return (size / 1024 / 1024).toFixed(2) + ' MB';
  };

  return (
    <>
      <header className={style.header}>
        <div className={style.folderName}>
          <h1>Work Documents</h1>
          <div>5 files</div>
        </div>

        <div className={style.actions}>
          {/* upload file */}
          <Action
            as="button"
            command="show-modal"
            commandFor="upload-file"
            onClick={() => console.log('dialog')}
            variant="primary"
          >
            <Upload />
            Upload
          </Action>

          <FolderActionMenu
            className={style.menu}
            dialogIds={{ edit: 'edit-folder', share: 'share-folder', delete: 'delete-folder' }}
          />
        </div>
      </header>

      {/* File table */}
      <div className={style.wrapper}>
        <table className={style.table}>
          <thead>
            <tr className={style.headRow}>
              <th className={style.th}>Name</th>
              <th className={style.th}>Size</th>
              <th className={style.th}>Uploaded</th>
              <th className={style.th}></th>
            </tr>
          </thead>

          <tbody>
            {[{ id: 1, name: 'File name', size: 1125434, uploaded: '2026-4-5' }].map((file, i) => (
              <tr
                key={file.id ?? file?.name ?? i}
                className={`${style.row} ${hoveredIndex === i ? style.rowHover : ''}`}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <td className={style.tdName}>
                  <span className={style.nameText}>{file.name}</span>
                </td>

                <td className={style.td}>{formatSize(file.size)}</td>

                <td className={style.td}>{file.uploaded}</td>

                <td className={style.actionsCell}>
                  <Action as="link" to="#" className={style.downloadBtn}>
                    <Download />
                  </Action>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* upload files */}
      <UploadFileForm />

      {/* share-folder form */}
      <ShareForm id="share-folder" />

      {/* Edit folder form */}
      <EditForm id="edit-folder" />

      {/* Delete folder */}
      <DeleteFolder id="delete-folder" />
    </>
  );
}
