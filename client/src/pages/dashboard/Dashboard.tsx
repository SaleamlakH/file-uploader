import Action from '../../components/Action/Action';
import { Add } from '../../components/Icons';
import style from './dashboard.module.css';
import DialogForm from '../../components/dialog-form/DialogForm';
import FolderCard from '../../components/folder-card/FolderCard';
import ShareForm from '../../components/share-form/ShareForm';

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
            <FolderCard
              key={i}
              dialogIds={{ share: `share-folder-${i}`, edit: `edit-folder${i}` }}
            />

            {/* share-folder form */}
            <ShareForm id={`share-folder-${i}`} />
          </>
        ))}
      </div>

      {/* Create Folder modals */}
      <DialogForm
        id="create-folder"
        header="Create New Folder"
        submitBtn={{ icon: <Add />, text: 'Create' }}
      >
        <label htmlFor="name">Folder Name</label>
        <input
          className={style.input}
          type="text"
          id="name"
          name="name"
          placeholder="Folder name"
          autoFocus
        />
      </DialogForm>
    </>
  );
}
