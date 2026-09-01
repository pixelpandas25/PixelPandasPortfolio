import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type HeadingSize = 'display-2' | 'display-3' | 'display-4' | 'display-5';

const sizeClasses: Record<HeadingSize, string> = {
  'display-2': 'text-display-2',
  'display-3': 'text-display-3',
  'display-4': 'text-display-4',
  'display-5': 'text-display-5',
};

interface SectionHeadingProps {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  size?: HeadingSize;
  className?: string;
  tone?: 'onLight' | 'onDark';
}

export function SectionHeading({
  children,
  as: Tag = 'h2',
  size = 'display-4',
  className,
  tone = 'onLight',
}: SectionHeadingProps) {
  return (
    <Tag
      className={cn(
        'font-bold',
        sizeClasses[size],
        tone === 'onDark' ? 'text-paper' : 'text-ink-900',
        className,
      )}
    >
      {children}
    </Tag>
  );
}
