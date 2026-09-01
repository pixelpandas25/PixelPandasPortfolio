import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type ButtonVariant = 'primary' | 'secondary' | 'navCta';
type ButtonSize = 'default' | 'compact' | 'lg';

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-ink-black text-paper hover:bg-ink-soft',
  secondary:
    'bg-surface-light text-ink-900 border border-line-light hover:bg-line-light',
  navCta: 'bg-paper text-ink-900 hover:bg-surface-light',
};

const sizeClasses: Record<ButtonSize, string> = {
  default: 'px-6 py-4 text-label',
  compact: 'px-5 py-3 text-nav',
  lg: 'px-9 py-6 text-[22.5px]',
};

interface CommonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  children: ReactNode;
}

interface InternalLinkProps extends CommonProps {
  to: string;
  href?: never;
  onClick?: never;
}

interface ExternalLinkProps extends CommonProps {
  href: string;
  to?: never;
  onClick?: never;
  target?: string;
  rel?: string;
}

interface ClickButtonProps extends CommonProps {
  to?: never;
  href?: never;
  onClick?: () => void;
  type?: 'button' | 'submit';
}

type ButtonProps = InternalLinkProps | ExternalLinkProps | ClickButtonProps;

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-pill font-semibold whitespace-nowrap transition-colors duration-hover';

export function Button(props: ButtonProps) {
  const { variant = 'primary', size = 'default', className, children } = props;
  const classes = cn(baseClasses, variantClasses[variant], sizeClasses[size], className);
  const motionProps = {
    whileHover: { scale: 1.03 },
    whileTap: { scale: 0.97 },
  };

  if ('to' in props && props.to) {
    return (
      <motion.div {...motionProps} className="inline-flex">
        <Link to={props.to} className={classes}>
          {children}
        </Link>
      </motion.div>
    );
  }

  if ('href' in props && props.href) {
    return (
      <motion.a
        {...motionProps}
        href={props.href}
        target={props.target}
        rel={props.target === '_blank' ? 'noopener noreferrer' : props.rel}
        className={classes}
      >
        {children}
      </motion.a>
    );
  }

  const clickProps = props as ClickButtonProps;
  return (
    <motion.button
      {...motionProps}
      type={clickProps.type ?? 'button'}
      onClick={clickProps.onClick}
      className={classes}
    >
      {children}
    </motion.button>
  );
}
