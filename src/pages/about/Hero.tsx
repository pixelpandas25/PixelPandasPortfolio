import { motion } from 'framer-motion';
import enterKey from '@/assets/images/about-enter-key.webp';

export function Hero() {
  return (
    <section data-nav-tone="light" className="bg-paper px-6 pb-8 pt-32 sm:px-gutter-sm sm:pt-36 "
    style={{ aspectRatio: '1440 / 760' }} >
      {/* <section data-nav-tone="light" className="relative w-full overflow-hidden bg-paper" ></section> */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="mx-auto flex max-w-content flex-col items-center gap-9 text-center"
      >
        <h1 className="text-display-2 font-bold leading-none text-[#1d1d1f] tracking-[0.02em] sm:text-[6.5rem]">
          Design <span className="text-[#7A7A7A]">without</span>
          <br />
          the Drama.
        </h1>
        <p className="max-w-2xl text-body-lg text-[#8a8a93]">
          PixelPandas is a design studio for people mid-build — figuring it out, scaling up, or just trying to
          move faster. You hand us the headache; you keep the credit.
        </p>
        <div className="flex items-center gap-3 text-body-lg font-medium text-[#8a8a93]">
          <span>Go on, press</span>
          <span className="relative inline-block h-[56px] w-[55px] overflow-hidden align-middle">
            <img
              src={enterKey}
              alt="Esc key"
              className="absolute max-w-none"
              style={{ left: '-103.4%', top: '-102.09%', width: '313.19%', height: '307.95%' }}
            />
          </span>
          <span>we&rsquo;ll handle it.</span>
        </div>
      </motion.div>
    </section>
  );
}
