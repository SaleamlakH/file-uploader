import { Link } from 'react-router';
import style from './action.module.css';
import type { ReactNode } from 'react';

type BaseProps = {
  children: ReactNode;
};

type withVariant = BaseProps & {
  variant: 'primary' | 'secondary';
  className?: never;
};

type withClassName = BaseProps & {
  className: string;
  variant?: never;
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  as?: 'button';
  onClick?: () => void;
  command?: string;
  commandFor?: string;
};

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  as: 'a';
  href: string;
};

type LinkProps = React.ComponentProps<typeof Link> & {
  as: 'link';
};

type ActionProps = (withVariant | withClassName) & (AnchorProps | LinkProps | ButtonProps);

const Action = (props: ActionProps) => {
  const { children, variant, className } = props;

  const classes = `${style.action} ${className || (variant ? style[variant] : '')}`;

  if (props.as === 'a') {
    return (
      <a {...props} href={props.href} className={classes}>
        {children}
      </a>
    );
  }

  if (props.as === 'link') {
    return (
      <Link {...props} to={props.to} className={classes}>
        {children}
      </Link>
    );
  }

  // default button
  return (
    <button {...props} onClick={props.onClick} className={classes}>
      {children}
    </button>
  );
};

export default Action;
