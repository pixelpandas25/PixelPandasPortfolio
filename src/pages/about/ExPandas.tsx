import expandasIcon from '@/assets/images/expandas-icon.webp';
import { alumni } from '@/data/team';

export function ExPandas() {
  return (
    <section data-nav-tone="dark" className="section-y bg-black px-6 sm:px-gutter-sm">
        <div className="mx-auto flex max-w-site flex-col gap-8">
        <div className="flex flex-col gap-5">
          <p className="text-[2.75rem] font-medium leading-none tracking-tight text-white sm:text-[5rem]">
            Ex Pandas
          </p>
          <div className="flex flex-wrap items-center gap-2 text-body-lg font-medium tracking-tight text-[#d9d9d9]">
            <span>Who pressed</span>
            <span className="relative inline-block h-10 w-10 overflow-hidden align-middle">
              <img
                src={expandasIcon}
                alt="Esc key"
                className="absolute max-w-none"
                style={{ left: '-103.4%', top: '-102.09%', width: '313.19%', height: '307.95%' }}
              />
            </span>
            <span>to grow further</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-8 sm:gap-11">
          {alumni.map((person) => (
            <div key={person.id} className="flex w-[130px] flex-col items-center gap-3 sm:w-[180px]">
              <img
                src={person.photo}
                alt={person.name}
                className="size-[130px] rounded-full object-cover sm:size-[180px]"
              />
              <p className="text-center text-nav font-medium tracking-tight text-[#d9d9d9] sm:text-body-lg">
                {person.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
