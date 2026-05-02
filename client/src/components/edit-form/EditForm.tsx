import { useRef } from 'react';
import { editFolder } from '../../api/folder';
import type { Folder } from '../../api/types/api';
import { useForm } from '../../hooks/useForm';
import Action from '../Action/Action';
import DialogForm from '../dialog-form/DialogForm';
import InputField from '../input-field/InputField';

type EditFormProps = {
  folderId: string;
  name: string;
  setName: (value: string | ((prevState: string) => string)) => void;
};

export default function EditForm({ folderId, name, setName }: EditFormProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const { formData, setFormData, loading, errors, handleChange, handleSubmit } = useForm<
    { name: string },
    Folder | undefined
  >({
    submitFn: (data: { name: string }) => editFolder(folderId, data),
    initialData: {
      name,
    },
    onSuccess: (data: Folder | undefined) => {
      setName((prev) => (data ? data.name : prev));
      dialogRef.current?.close();
      setFormData({ name: '' });
    },
  });

  return (
    <DialogForm
      id={`edit-folder-${folderId}`}
      ref={dialogRef}
      onSubmit={handleSubmit}
      header="Edit Folder"
    >
      <InputField
        type="text"
        name="name"
        id="name"
        label="Folder Name"
        value={formData.name}
        onChange={handleChange}
        error={errors?.errors?.name.message}
        autoFocus
        required
      />

      <div className="buttons">
        <Action
          as="button"
          type="button"
          command="close"
          commandFor={`edit-folder-${folderId}`}
          variant="secondary"
        >
          Cancel
        </Action>

        <Action as="button" variant="primary" disabled={loading}>
          {loading ? 'Saving ...' : 'Save'}
        </Action>
      </div>
    </DialogForm>
  );
}
