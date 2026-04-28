import { Link } from 'react-router';
import Action from '../../components/Action/Action';
import { Add, Folder, FileText, Clock, MenuDots } from '../../components/Icons';
import style from './dashboard.module.css';

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
        {[1, 2, 3].map(() => (
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

              <button className={style.cardMenuBtn}>
                <MenuDots />
              </button>
            </div>

            <div className={style.createdAt}>
              <Clock />
              <span>Created Apr 28, 2024 </span>
            </div>
          </div>
        ))}
      </div>

      {/* modals */}
      <dialog id="create-folder" className={style.dialog}>
        <form className={style.form}>
          <div className={style.formHeader}>
            <h3>Create New Folder</h3>
          </div>

          <div>
            <label htmlFor="name">Folder Name</label>
            <input
              className={style.input}
              type="text"
              id="name"
              name="name"
              placeholder="Folder name"
              autoFocus
            />
          </div>

          <div className={style.btns}>
            <Action
              as="button"
              type="button"
              command="close"
              commandFor="create-folder"
              variant="secondary"
            >
              Cancel
            </Action>
            <Action as="button" variant="primary">
              <Add />
              Create
            </Action>
          </div>
        </form>
      </dialog>
    </>
  );
}
