import Action from '../../components/Action/Action';
import { Add, Link as LinkIcon } from '../../components/Icons';
import style from './dashboard.module.css';
import DialogForm from '../../components/dialog-form/DialogForm';
import FolderCard from '../../components/folder-card/FolderCard';
import ShareForm from '../../components/share-form/ShareForm';
import EditForm from '../../components/edit-form/EditForm';
import DeleteFolder from '../../components/folder-delete/FolderDelete';
import FolderActionMenu from '../../components/menu/FolderActionMenu';
import InputField from '../../components/input-field/InputField';

export default function Dashboard() {
  return (
    <>
      <header className={style.header}>
        <div>
          <h1>My Folders</h1>
          <div>Organize and manage your files</div>
        </div>

        <Action
          as="button"
          command="show-modal"
          commandFor="create-folder"
          onClick={() => console.log('dialog')}
          variant="primary"
        >
          <Add />
          New Folder
        </Action>
      </header>

      {/* folder cards */}
      <div className={style.container}>
        {[1, 2, 3].map((i) => (
          <>
            <FolderCard key={i}>
              <FolderActionMenu
                className={style.cardMenu}
                dialogIds={{
                  share: `share-folder-${i}`,
                  edit: `edit-folder-${i}`,
                  delete: `delete-folder-${i}`,
                }}
              />
            </FolderCard>

            {/* share-folder form */}
            <ShareForm id={`share-folder-${i}`} />

            {/* Edit folder form */}
            <EditForm id={`edit-folder-${i}`} />

            {/* Delete folder */}
            <DeleteFolder id={`delete-folder-${i}`} />
          </>
        ))}
      </div>

      {/* Create Folder modals */}
      <DialogForm id="create-folder" header="Create New Folder">
        <InputField label="Folder Name" id="name" name="name" placeholder="Folder name" autoFocus />

        <div className="buttons">
          <Action type="button" variant="secondary" command="close" commandFor="create-folder">
            Cancel
          </Action>

          <Action variant="primary">
            <LinkIcon />
            Generate Link
          </Action>
        </div>
      </DialogForm>
    </>
  );
}
