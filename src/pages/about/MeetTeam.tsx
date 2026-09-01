import { motion } from 'framer-motion';
import { teamRows, rowLabels } from '@/data/team';

function TeamAvatar({ name, role, photo }: { name: string; role: string; photo: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.25 }}
      className="relative size-[110px] shrink-0 overflow-hidden rounded-full sm:size-[150px] lg:size-[180px]"
    >
      <img src={photo} alt={name} className="size-full object-cover grayscale" />
      {/* Bottom scrim, always visible — Figma 518:3539 shows captions permanently, not on hover */}
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 to-transparent" />
      {/* Caption box: wider + higher on small avatars so the longer role names have room
          to wrap without being clipped by the circular mask; Figma's exact box (left 43px,
          top 124px, w 100px of a 180px circle) only applies once avatars reach their full
          180px size at lg. */}
      <div className="absolute left-[10%] top-[58%] flex w-[80%] flex-col items-center gap-[3px] text-center leading-[1.2] text-white lg:left-[23.89%] lg:top-[68.89%] lg:w-[55.56%]">
        <p className="text-[11px] font-medium tracking-[-0.24px] sm:text-xs">{name}</p>
        <p className="text-[9px] font-normal tracking-[-0.2px] text-white/85 sm:text-[10px]">{role}</p>
      </div>
    </motion.div>
  );
}

export function MeetTeam() {
  return (
    <section data-nav-tone="light" className="section-y overflow-x-hidden bg-paper">
      <div className="mx-auto flex max-w-site flex-col gap-8 px-6 sm:gap-12 sm:px-gutter lg:gap-[60px]">
        {teamRows.map((row, i) => (
          <div key={rowLabels[i]} className="flex flex-wrap items-center justify-between gap-8 lg:gap-[60px]">
            {i % 2 === 1 ? (
              <>
                <div className="flex flex-wrap items-center gap-6 sm:gap-10 lg:gap-[60px]">
                  {row.slice(0, 2).map((member) => (
                    <TeamAvatar key={member.id} name={member.name} role={member.role} photo={member.photo} />
                  ))}
                </div>
                <p className="text-[3.5rem] font-medium leading-none tracking-[-0.02em] text-[#121212] sm:text-[6rem] lg:text-[10rem]">
                  {rowLabels[i]}
                </p>
                <div className="flex flex-wrap items-center gap-6 sm:gap-10 lg:gap-[60px]">
                  {row.slice(2).map((member) => (
                    <TeamAvatar key={member.id} name={member.name} role={member.role} photo={member.photo} />
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="text-[3.5rem] font-medium leading-none tracking-[-0.02em] text-[#121212] sm:text-[6rem] lg:text-[10rem]">
                  {rowLabels[i]}
                </p>
                <div className="flex flex-wrap items-center gap-6 sm:gap-10 lg:gap-[60px]">
                  {row.map((member) => (
                    <TeamAvatar key={member.id} name={member.name} role={member.role} photo={member.photo} />
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
