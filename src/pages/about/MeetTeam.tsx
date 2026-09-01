import { motion } from 'framer-motion';
import { teamRows, rowLabels } from '@/data/team';

function TeamAvatar({ name, role, photo }: { name: string; role: string; photo: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.25 }}
      className="group relative size-[110px] shrink-0 overflow-hidden rounded-full sm:size-[150px] lg:size-[180px]"
    >
      <img src={photo} alt={name} className="size-full object-cover grayscale transition-all duration-300 group-hover:grayscale-0" />
      <div className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-0.5 bg-gradient-to-t from-black/80 to-transparent px-2 pb-3 pt-8 text-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="text-[11px] font-medium leading-tight text-white sm:text-xs">{name}</p>
        <p className="text-[9px] leading-tight text-white/80 sm:text-[10px]">{role}</p>
      </div>
    </motion.div>
  );
}

export function MeetTeam() {
  return (
    <section data-nav-tone="light" className="section-y overflow-x-hidden bg-paper">
      <div className="mx-auto flex max-w-site flex-col gap-8 px-6 sm:gap-12 sm:px-gutter-sm">
        {teamRows.map((row, i) => (
          <div key={rowLabels[i]} className="flex flex-wrap items-center justify-between gap-8">
            {i % 2 === 1 ? (
              <>
                <div className="flex flex-wrap items-center gap-6 sm:gap-10">
                  {row.slice(0, 2).map((member) => (
                    <TeamAvatar key={member.id} name={member.name} role={member.role} photo={member.photo} />
                  ))}
                </div>
                <p className="text-[3.5rem] font-medium leading-none tracking-tight text-[#121212] sm:text-[6rem] lg:text-[10rem]">
                  {rowLabels[i]}
                </p>
                <div className="flex flex-wrap items-center gap-6 sm:gap-10">
                  {row.slice(2).map((member) => (
                    <TeamAvatar key={member.id} name={member.name} role={member.role} photo={member.photo} />
                  ))}
                </div>
              </>
            ) : (
              <>
                <p className="text-[3.5rem] font-medium leading-none tracking-tight text-[#121212] sm:text-[6rem] lg:text-[10rem]">
                  {rowLabels[i]}
                </p>
                <div className="flex flex-wrap items-center gap-6 sm:gap-10">
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
