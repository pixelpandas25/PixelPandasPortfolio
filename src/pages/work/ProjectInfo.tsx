import { motion } from 'framer-motion';
import type { Project, ProjectDetail } from '@/types';

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

interface ProjectInfoProps {
  project: Project;
  detail: ProjectDetail;
}

export function ProjectInfo({ detail }: ProjectInfoProps) {
  return (
    <section data-nav-tone="light" className="bg-paper pt-[87px] pb-[87px] px-6 sm:px-[70px]">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={stagger}
        className="mx-auto max-w-content"
      >
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1fr_265px] lg:gap-[100px]">

          {/* ── LEFT COLUMN ── */}
          <div className="flex flex-col gap-[72px]">

            {/* The Collaboration */}
            {detail.collaboration && (
              <motion.div variants={fadeUp} className="flex flex-col gap-[19px]">
                <p className="text-[32px] font-medium leading-none text-[#000000]">
                  The Collaboration
                </p>
                <p className="text-[20px] font-normal leading-[1.5] text-[#3a3a3a]">
                  {detail.collaboration}
                </p>
              </motion.div>
            )}

            {/* Problem Definition */}
            {detail.problemDefinition && (
              <motion.div variants={fadeUp} className="flex flex-col gap-[19px]">
                <p className="text-[32px] font-medium leading-none text-[#000000]">
                  <span className="text-[#e63636]">Problem</span> Definition
                </p>
                <p className="text-[20px] font-normal leading-[1.5] text-[#3a3a3a]">
                  {detail.problemDefinition}
                </p>
              </motion.div>
            )}
          </div>

          {/* ── RIGHT COLUMN ── */}
          <motion.div variants={fadeUp} className="flex flex-col gap-[29px]">

            {detail.industry && (
              <div className="flex flex-col gap-2">
                <p className="text-[24px] font-medium leading-none text-[#000000]">Industry</p>
                <p className="text-[20px] font-normal leading-[1.5] text-[#3a3a3a]">{detail.industry}</p>
              </div>
            )}

            {detail.services && detail.services.length > 0 && (
              <div className="flex flex-col gap-2">
                <p className="text-[24px] font-medium leading-none text-[#000000]">Services</p>
                <p className="text-[20px] font-normal leading-[1.5] text-[#3a3a3a]">
                  {detail.services.join(', ')}
                </p>
              </div>
            )}

            {detail.website && (
              <div className="flex flex-col gap-2">
                <p className="text-[24px] font-medium leading-none text-[#000000]">Website</p>
                <a
                  href={detail.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[20px] font-normal leading-[1.5] text-[#3a3a3a] underline underline-offset-4 transition-opacity duration-hover hover:opacity-70"
                >
                  {detail.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}

          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
