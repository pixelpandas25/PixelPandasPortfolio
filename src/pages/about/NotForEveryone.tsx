import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import trafficLights from '@/assets/icons/browser-traffic-lights.svg';
import windowDots from '@/assets/icons/window-dots.svg';
import bulletCheck from '@/assets/icons/bullet-check.svg';
import bulletX from '@/assets/icons/bullet-x.svg';

const forList = [
  'Founders mid-build, still figuring out what design they even need',
  'Teams ready to scale with design that has to keep up',
  'People who need it shipped fast, not "eventually"',
  'Builders happy to hand over the headache and get on with it',
  'Products where design and engineering actually talk to each other',
  'Anyone who wants a partner, not just a pair of hands',
];

const notForList = [
  '"Here are five options, you pick"  with no conversation',
  'Design by committee, where nothing ever gets decided',
  'Briefs that begin and end at "make it pop"',
  'Teams looking for a vendor to boss around',
  "Projects that need weeks where we'd rather take days",
  'Anyone who wants pretty pixels over something that ships',
];

export function NotForEveryone() {
  const [tab, setTab] = useState<'for' | 'not'>('for');
  const isFor = tab === 'for';

  return (
    <section data-nav-tone="light" className="bg-paper px-6 pb-16 pt-10 sm:px-gutter-sm sm:pb-[96px] sm:pt-[48px]">
      <div className="mx-auto flex max-w-content flex-col items-center gap-5">
        <h2 className="text-center text-display-4 font-medium leading-[1.35] text-[#1d1d1f]">
          We&rsquo;re not for everyone.
        </h2>

        {/* Browser card */}
        <motion.div
          animate={{
            borderColor: isFor ? '#eaeae3' : '#e8e3dd',
          }}
          transition={{ duration: 0.3 }}
          className="w-full overflow-hidden rounded-[30px] border-[1.25px] shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
          style={{ background: 'rgba(250,250,247,0.2)' }}
        >
          {/* Browser chrome header */}
          <motion.div
            animate={{ borderColor: isFor ? '#eaeae3' : '#e8e3dd' }}
            transition={{ duration: 0.3 }}
            className="flex h-[60px] items-center gap-[17.5px] border-b-[1.25px] pl-5 pr-[30px]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={tab + '-icon'}
                src={isFor ? trafficLights : windowDots}
                alt=""
                aria-hidden
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="h-[13px] w-auto"
              />
            </AnimatePresence>
            <AnimatePresence mode="wait" initial={false}>
              <motion.p
                key={tab + '-filename'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="font-mono text-[13.75px] font-medium text-[#7e7a75]"
              >
                {isFor ? 'who-were-for.md' : 'who-were-not.md'}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Card body */}
          <div className="flex flex-col gap-8 p-6 sm:gap-[45px] sm:p-[50px]">
            {/* Tab switcher */}
            <div className="flex items-center gap-0 self-start rounded-pill border border-[#d9d9d9]/50 bg-white/25 p-2">
              <button
                onClick={() => setTab('for')}
                className={`rounded-pill px-3 py-2 text-[14px] font-medium transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-[20px] ${
                  isFor ? 'bg-black text-white' : 'text-[#7a7a7a]'
                }`}
              >
                Who we&rsquo;re for
              </button>
              <button
                onClick={() => setTab('not')}
                className={`rounded-pill px-3 py-2 text-[14px] font-medium transition-all duration-300 sm:px-5 sm:py-2.5 sm:text-[20px] ${
                  !isFor ? 'bg-[rgba(0,0,0,0.8)] text-white' : 'text-[#7a7a7a]'
                }`}
              >
                Who we&rsquo;re not for
              </button>
            </div>

            {/* Bullet list */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.ul
                key={tab}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-6 sm:gap-[25px]"
              >
                {(isFor ? forList : notForList).map((item) => (
                  <li key={item} className="flex items-center gap-3 sm:gap-[20px]">
                    {isFor ? (
                      <img src={bulletCheck} alt="" aria-hidden className="h-[22px] w-[25px] shrink-0 sm:h-[25.847px] sm:w-[30px]" />
                    ) : (
                      <img src={bulletX} alt="" aria-hidden className="size-[26px] shrink-0 sm:size-[32px]" />
                    )}
                    <p className="text-[16px] leading-[1.4] text-[#141414] sm:text-[20px]">{item}</p>
                  </li>
                ))}
              </motion.ul>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Footer text */}
        <p className="max-w-2xl text-center text-[20px] leading-[1.35] text-[#8a8a93] sm:w-[824px] sm:max-w-none">
          See yourself on the left? Then we&rsquo;re already aligned.{' '}
          <Link to="/contact" className="text-[#1a62ec] underline underline-offset-2">
            Reach out
          </Link>
        </p>
      </div>
    </section>
  );
}
