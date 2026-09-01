import { motion } from 'framer-motion';
import enterKey from '@/assets/images/about-enter-key.webp';

export function Hero() {
  return (
    <section
      data-nav-tone="light"
      className="bg-paper px-6 pb-8 pt-32 sm:min-h-[760px] sm:px-gutter-sm sm:pb-[60px] sm:pt-[140px]"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mx-auto flex max-w-content flex-col items-center gap-9 text-center"
      >
        <h1 className="text-display-2 font-bold leading-none text-[#1d1d1f] sm:text-[120px]">
          Design <span className="text-[#7a7a7a]">without</span>
          <br />
          the Drama.
        </h1>
        <p className="max-w-2xl text-body-lg text-[#8a8a93] sm:max-w-none sm:w-[752px] sm:text-[20px] sm:leading-[1.5]">
          PixelPandas is a design studio for people mid-build — figuring it out, scaling up, or just trying to
          move faster. You hand us the headache; you keep the credit.
        </p>
        <div className="flex items-center gap-3 text-body-lg font-medium text-[#8a8a93] sm:gap-5">
          <span className="sm:text-[20px]">Go on, press</span>
          <span className="relative inline-block h-[56px] w-[55px] overflow-hidden align-middle sm:h-[100px] sm:w-[98.326px]">
            <img
              src={enterKey}
              alt="Esc key"
              className="absolute max-w-none"
              style={{ left: '-103.4%', top: '-102.09%', width: '313.19%', height: '307.95%' }}
            />
          </span>
          <span className="sm:text-[20px]">we&rsquo;ll handle it.</span>
        </div>
      </motion.div>
    </section>
  );
}
