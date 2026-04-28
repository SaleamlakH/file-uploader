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

type ButtonProps = {
  as?: 'button';
  onClick?: () => void;
};

type AnchorProps = {
  as: 'a';
  href: string;
};

type LinkProps = {
  as: 'link';
  to: string;
};

type ActionProps = (withVariant | withClassName) & (AnchorProps | LinkProps | ButtonProps);

const Action = (props: ActionProps) => {
  const { children, variant, className } = props;

  const classes = `${style.action} ${className || (variant ? style[variant] : '')}`;

  if (props.as === 'a') {
    return (
      <a href={props.href} className={classes}>
        {children}
      </a>
    );
  }

  if (props.as === 'link') {
    return (
      <Link to={props.to} className={classes}>
        {children}
      </Link>
    );
  }

  // default button
  return (
    <button onClick={props.onClick} className={classes}>
      {children}
    </button>
  );
};

export default Action;
