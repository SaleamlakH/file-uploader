import DialogForm from '../dialog-form/DialogForm';
import { Share } from '../Icons';

export default function ShareForm({ id }: { id: string }) {
  return (
    <DialogForm id={id} header="Share Folder" submitBtn={{ icon: <Share />, text: 'Share' }}>
      <label htmlFor="expires">Expiration Date</label>
      <input
        type="datetime-local"
        name="expiresAt"
        id="expires"
        autoFocus
      />
      <span style={{ color: 'hsl(0 0 30)' }}>The share will expire on this date.</span>
    </DialogForm>
  );
}
