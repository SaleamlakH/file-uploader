import DialogForm from '../dialog-form/DialogForm';
import Action from '../Action/Action';
import { Link as LinkIcon } from '../Icons';
import InputField from '../input-field/InputField';
import { useRef, useState } from 'react';
import { useForm } from '../../hooks/useForm';
import type { ShareLink } from '../../api/types/api';
import { getShareLink } from '../../api/folder';

export default function ShareForm({ folderId }: { folderId: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [shareLink, setShareLink] = useState('');
  const [copied, setCopied] = useState(false);

  const { formData, setFormData, loading, errors, handleChange, handleSubmit } = useForm<
    { expiresAt: Date },
    ShareLink | undefined
  >({
    submitFn: ({ expiresAt }) => getShareLink({ folderId, expiresAt }),
    initialData: { expiresAt: new Date() },
    onSuccess: (data: ShareLink | undefined) => {
      setShareLink(`${window.location.origin}/${data?.path}`);
      setFormData({ expiresAt: new Date() });
    },
  });

  const copyText = async () => {
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);
  };

  return (
    <DialogForm
      ref={dialogRef}
      onSubmit={handleSubmit}
      id={`share-folder-${folderId}`}
      header="Share Folder"
    >
      {shareLink ? (
        <InputField label="Generated Link" value={shareLink} readOnly />
      ) : (
        <InputField
          type="datetime-local"
          name="expiresAt"
          id="expires"
          label="Expiration Date"
          value={`${formData.expiresAt}`}
          onChange={handleChange}
          error={errors?.errors?.expiresAt?.message}
          autoFocus
          required
        />
      )}

      <div className="buttons">
        <Action
          type="button"
          variant="secondary"
          command="close"
          commandFor={`share-folder-${folderId}`}
        >
          {shareLink ? 'Close' : 'Cancel'}
        </Action>

        <Action variant="primary" onClick={() => shareLink && copyText()} disabled={loading}>
          {shareLink ? (
            copied ? (
              'Copied'
            ) : (
              'Copy'
            )
          ) : (
            <>
              <LinkIcon />
              {loading ? 'Generating ...' : 'Generate Link'}
            </>
          )}
        </Action>
      </div>
    </DialogForm>
  );
}
