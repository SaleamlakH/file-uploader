import type { ReactNode } from 'react';
import style from './dialog-form.module.css';
import Action from '../Action/Action';

type Props = React.DialogHTMLAttributes<HTMLDialogElement> & {
  children: ReactNode;
  header: string;
  submitBtn: {
    icon?: ReactNode;
    text: string;
    variant?: 'primary' | 'danger';
  };
};

export default function DialogForm(props: Props) {
  const { children, header, submitBtn, ...others } = props;

  return (
    <dialog {...others} className={style.dialog}>
      <form className={style.form}>
        <div className={style.formHeader}>
          <h3>{header}</h3>
        </div>

        <div className={style.fields}>{children}</div>

        <div className={style.btns}>
          <Action
            as="button"
            type="button"
            command="close"
            commandFor={props.id}
            variant="secondary"
          >
            Cancel
          </Action>

          <Action as="button" variant={submitBtn.variant || 'primary'}>
            {submitBtn.icon}
            {submitBtn.text}
          </Action>
        </div>
      </form>
    </dialog>
  );
}
