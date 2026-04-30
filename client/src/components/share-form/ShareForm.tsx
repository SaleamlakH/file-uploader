import DialogForm from '../dialog-form/DialogForm';
import Action from '../Action/Action';
import { Link as LinkIcon } from '../Icons';
import InputField from '../input-field/InputField';

export default function ShareForm({ id }: { id: string }) {
  return (
    <DialogForm id={id} header="Share Folder">
      <InputField
        type="datetime-local"
        name="expiresAt"
        id="expires"
        label="Expiration Date"
        autoFocus
        required
      />

      <div className="buttons">
        <Action type="button" variant="secondary" command="close" commandFor={id}>
          Cancel
        </Action>

        <Action variant="primary">
          <LinkIcon />
          Generate Link
        </Action>
      </div>
    </DialogForm>
  );
}
