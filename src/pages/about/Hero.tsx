import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import enterKey from '@/assets/images/about-enter-key.webp';

export function Hero() {
  const navigate = useNavigate();

  // Pressing Escape on the About hero jumps to the Cal booking embed on the contact page.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        navigate('/contact#cal-embed');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

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
        <h1 className="text-[clamp(2.5rem,8.5vw,7.5rem)] font-bold leading-none text-[#1d1d1f]">
          Design <span className="text-[#7a7a7a]">without</span>
          <br />
          the Drama.
        </h1>
        <p className="max-w-[752px] text-[14px] text-[#8a8a93] sm:text-[20px] sm:leading-[1.5]">
          PixelPandas is a design studio for people mid-build figuring it out, scaling up, or just trying to
          move faster. You hand us the headache; you keep the credit.
        </p>
        <div className="flex items-center gap-3 text-[14px] font-medium text-[#8a8a93] sm:gap-5 sm:text-body-lg">
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
