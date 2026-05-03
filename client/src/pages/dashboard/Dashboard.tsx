import Action from '../../components/Action/Action';
import { Add } from '../../components/Icons';
import style from './dashboard.module.css';
import DialogForm from '../../components/dialog-form/DialogForm';
import FolderCard from '../../components/folder-card/FolderCard';
import FolderActionMenu from '../../components/menu/FolderActionMenu';
import InputField from '../../components/input-field/InputField';
import { useEffect, useRef, useState } from 'react';
import type { Folder } from '../../api/types/api';
import { createFolder, getAllFolder } from '../../api/folder';
import { useForm } from '../../hooks/useForm';

export default function Dashboard() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [loading, setLoading] = useState(true);
  const createFolderDialogRef = useRef<HTMLDialogElement>(null);

  // load the folders
  useEffect(() => {
    getAllFolder().then((folders) => {
      setFolders(folders as Folder[]);
      setLoading(false);
    });
  }, []);

  // upload dialog
  const {
    formData,
    setFormData,
    errors,
    handleChange,
    handleSubmit,
    loading: loadingCreate,
  } = useForm<{ name: string }, Folder | undefined>({
    submitFn: createFolder,
    initialData: {
      name: '',
    },
    onSuccess: (folder?: Folder) => {
      setFolders((prev) => (folder ? [folder, ...prev] : prev));
      createFolderDialogRef.current?.close();
      setFormData({ name: '' });
    },
  });

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
        {loading ? (
          <div>Loading Folders...</div>
        ) : folders.length ? (
          folders.map((folder) => (
            <FolderCard setFolders={setFolders} key={folder.id} folder={folder}>
              <FolderActionMenu
                className={style.cardMenu}
                dialogIds={{
                  share: `share-folder-${folder.id}`,
                  edit: `edit-folder-${folder.id}`,
                  delete: `delete-folder-${folder.id}`,
                }}
              />
            </FolderCard>
          ))
        ) : (
          <div>No Folder Created</div>
        )}
      </div>

      {/* Create Folder modals */}
      <DialogForm
        id="create-folder"
        ref={createFolderDialogRef}
        onSubmit={handleSubmit}
        header="Create New Folder"
      >
        <InputField
          label="Folder Name"
          id="name"
          name="name"
          placeholder="Folder name"
          value={formData.name}
          onChange={handleChange}
          error={errors?.errors?.name?.message}
          autoFocus
        />

        <div className="buttons">
          <Action type="button" variant="secondary" command="close" commandFor="create-folder">
            Cancel
          </Action>

          <Action variant="primary">{loadingCreate ? 'Creating ...' : 'Create'}</Action>
        </div>
      </DialogForm>
    </>
  );
}
