import Action from '../Action/Action';
import DialogForm from '../dialog-form/DialogForm';
import { Caution, TrashBin } from '../Icons';
import style from './folder-delete.module.css';

export default function DeleteFolder({ id }: { id: string }) {
  return (
    <DialogForm id={id} header="Delete Folder">
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
        <Action type="button" variant="secondary" command="close" commandFor={id}>
          Cancel
        </Action>

        <Action variant="danger">
          <TrashBin />
          Delete
        </Action>
      </div>
    </DialogForm>
  );
}
