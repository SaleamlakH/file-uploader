import { forwardRef, type ReactNode } from 'react';
import style from './dialog-form.module.css';

type Props = React.DialogHTMLAttributes<HTMLDialogElement> & {
  children: ReactNode;
  header: string;
  onSubmit?: React.SubmitEventHandler;
};

const DialogForm = forwardRef<HTMLDialogElement, Props>(
  ({ children, header, onSubmit, ...others }, ref) => {
    return (
      <dialog {...others} ref={ref} className={style.dialog}>
        <form method="dialog" onSubmit={onSubmit} className={style.form}>
          <div className={style.formHeader}>
            <h3>{header}</h3>
          </div>

          {children}
        </form>
      </dialog>
    );
  },
);

export default DialogForm;
