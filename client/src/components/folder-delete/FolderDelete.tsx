import { useRef } from 'react';
import { deleteFolder } from '../../api/folder';
import { useForm } from '../../hooks/useForm';
import Action from '../Action/Action';
import DialogForm from '../dialog-form/DialogForm';
import { Caution, TrashBin } from '../Icons';
import style from './folder-delete.module.css';

type DeleteFolderProps = {
  folderId: string;
  onDelete: () => void;
};

export default function DeleteFolder({ folderId, onDelete }: DeleteFolderProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { loading, handleSubmit } = useForm<null, string | undefined>({
    submitFn: async () => await deleteFolder(folderId),
    initialData: null,
    onSuccess: (message: string | undefined) => {
      onDelete();
      setTimeout(() => alert(message), 0);
      dialogRef.current?.close();
    },
  });

  return (
    <DialogForm
      ref={dialogRef}
      onSubmit={handleSubmit}
      id={`delete-folder-${folderId}`}
      header="Delete Folder"
    >
      <div className={style.container}>
        <div className={style.caution}>
          <Caution />
        </div>
        <span>
          <div>
            <strong>Are you sure you want to delete this folder?</strong>
          </div>
          <div className={style.description}>
            This will also delete all files inside it. This action cannot be undone.
          </div>
        </span>
      </div>

      <div className="buttons">
        <Action
          type="button"
          variant="secondary"
          command="close"
          commandFor={`delete-folder-${folderId}`}
        >
          Cancel
        </Action>

        <Action variant="danger" disabled={loading}>
          <TrashBin />
          {loading ? 'Deleting ...' : 'Delete'}
        </Action>
      </div>
    </DialogForm>
  );
}
