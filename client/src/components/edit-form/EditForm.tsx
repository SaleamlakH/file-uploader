import DialogForm from '../dialog-form/DialogForm';

export default function EditForm({ id }: { id: string }) {
  return (
    <DialogForm id={id} header="Edit Folder" submitBtn={{ text: 'Save' }}>
      <label htmlFor="name">Folder Name</label>
      <input type="text" name="name" id="name" autoFocus />
    </DialogForm>
  );
}
