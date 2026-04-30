import type { ReactNode } from 'react';
import style from './dialog-form.module.css';

type Props = React.DialogHTMLAttributes<HTMLDialogElement> & {
  children: ReactNode;
  header: string;
};

export default function DialogForm(props: Props) {
  const { children, header, ...others } = props;

  return (
    <dialog {...others} className={style.dialog}>
      <form method="dialog" className={style.form}>
        <div className={style.formHeader}>
          <h3>{header}</h3>
        </div>

        {children}
      </form>
    </dialog>
  );
}
