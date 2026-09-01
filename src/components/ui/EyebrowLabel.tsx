import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface EyebrowLabelProps {
  children: ReactNode;
  className?: string;
  tone?: 'onLight' | 'onDark';
}

export function EyebrowLabel({ children, className, tone = 'onLight' }: EyebrowLabelProps) {
  return (
    <p
      className={cn(
        'font-medium uppercase text-eyebrow',
        tone === 'onDark' ? 'text-muted' : 'text-muted-2',
        className,
      )}
    >
      {children}
    </p>
  );
}
