import Action from '../../components/Action/Action';
import { Upload } from '../../components/Icons';
import style from './folder-view.module.css';
import ShareForm from '../../components/share-form/ShareForm';
import EditForm from '../../components/edit-form/EditForm';
import DeleteFolder from '../../components/folder-delete/FolderDelete';
import FolderActionMenu from '../../components/menu/FolderActionMenu';
import UploadFileForm from '../../components/upload-file-form/UploadFileForm';

export default function FolderView() {
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

      {/* upload files */}
      <UploadFileForm id="upload-file" />

      {/* share-folder form */}
      <ShareForm id="share-folder" />

      {/* Edit folder form */}
      <EditForm id="edit-folder" />

      {/* Delete folder */}
      <DeleteFolder id="delete-folder" />
    </>
  );
}
