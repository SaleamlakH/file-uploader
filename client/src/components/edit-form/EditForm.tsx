import Action from '../Action/Action';
import DialogForm from '../dialog-form/DialogForm';
import InputField from '../input-field/InputField';

export default function EditForm({ id }: { id: string }) {
  return (
    <DialogForm id={id} header="Edit Folder">
      <InputField type="text" name="name" id="name" label="Folder Name" autoFocus required />

      <div className="buttons">
        <Action as="button" type="button" command="close" commandFor={id} variant="secondary">
          Cancel
        </Action>

        <Action as="button" variant="primary">
          Save
        </Action>
      </div>
    </DialogForm>
  );
}
