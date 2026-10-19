import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { ProjectCategory } from '@/types';

const tabs: Array<{ label: string; value: ProjectCategory | 'All' }> = [
  { label: 'All Projects', value: 'All' },
  { label: 'Branding', value: 'Branding' },
  { label: 'UI/UX', value: 'UI/UX' },
  { label: 'Website Designs', value: 'Website Designs' },
];

interface WorkHeaderProps {
  active: ProjectCategory | 'All';
  onChange: (value: ProjectCategory | 'All') => void;
}

export function WorkHeader({ active, onChange }: WorkHeaderProps) {
  return (
    <header data-nav-tone="light" className="bg-paper px-6 pb-6 pt-32 sm:px-gutter-sm sm:pt-36">
      <div className="mx-auto flex max-w-site flex-col gap-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <h1 className="text-display-4 font-bold text-[#121212]">Our Work</h1>
          <div className="flex items-center gap-3">
            <a
              href="mailto:hello@pixelpandas.in"
              className="rounded-[100px] border border-[#e5e5e5] bg-[#f5f5f5] px-6 py-4 text-[15px] font-semibold leading-none text-[#121212] transition-colors duration-hover hover:bg-[#ebebeb]"
            >
              Send a mail
            </a>
            <Link
              to="/contact#cal-embed"
              className="rounded-[100px] bg-black px-6 py-4 text-[15px] font-semibold leading-none text-white transition-colors duration-hover hover:bg-[#1a1a1a]"
            >
              Book a call
            </Link>
          </div>
        </div>

        <nav aria-label="Filter projects by category" className="flex flex-wrap items-center gap-4">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => onChange(tab.value)}
              className={cn(
                'border-b px-2 py-1 text-body font-medium transition-colors duration-hover',
                active === tab.value
                  ? 'border-black text-[#111]'
                  : 'border-transparent text-[#666] hover:text-[#111]',
              )}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}
