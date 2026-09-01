import { motion } from 'framer-motion';
import founderPhoto from '@/assets/images/founder-photo.webp';
import instagramIcon from '@/assets/icons/social-instagram-icon.svg';
import linkedinIcon from '@/assets/icons/social-linkedin-icon.svg';
import tagArrow from '@/assets/icons/tag-arrow-up-right.svg';

export function FounderPolaroid() {
  return (
    <section data-nav-tone="dark" className="relative overflow-hidden bg-[#121212] px-6 py-16 lg:py-0">
      {/* Desktop — 1440x760 reference canvas (Figma 638:5285); title, polaroid, and the two
          social tags are positioned as % of this box so they scale together as one unit. */}
      <div
        className="relative mx-auto hidden w-full max-w-site lg:block"
        style={{ aspectRatio: '1440 / 800', containerType: 'inline-size' }}
      >
        <h2
          className="absolute left-1/2 top-[4.63%] w-[45.14%] -translate-x-1/2 text-balance text-center font-normal uppercase leading-none tracking-[-0.02em] text-white"
          style={{ fontSize: '8.333cqw' }}
        >
          Meet the Founder
        </h2>

        <div
          className="absolute left-1/2 top-[30.43%] flex h-[64.57%] w-[30.27%] -translate-x-1/2 items-center justify-center"
        >
          <motion.div
            initial={{ opacity: 0, rotate: 0, y: 24 }}
            animate={{ opacity: 1, rotate: -7.14, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="flex w-[380px] flex-col items-center gap-4 border border-[#d1d4d0] bg-[#f9f9f7] p-[18px] pb-6 shadow-[0_12px_16px_rgba(0,0,0,0.09)]"
          >
            <img
              src={founderPhoto}
              alt="Varun Yadav, Founder & Creative Director"
              className="aspect-square w-full object-cover"
            />
            <div className="flex flex-col items-center gap-1.5 text-center">
              <p className="text-[36px] font-normal leading-normal text-[#996b8a]">Varun Yadav</p>
              <p className="text-[16px] font-bold uppercase leading-normal text-black">
                Founder &amp; Creative Director
              </p>
            </div>
          </motion.div>
        </div>

        <a
          href="https://instagram.com/pixelpandas.in"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-[65.76%] top-[55.92%] flex items-center gap-[7px]"
        >
          <img src={instagramIcon} alt="" className="size-6" />
          <span className="text-body-lg text-[#e3f7eb]">Instagram</span>
          <img src={tagArrow} alt="" className="size-6" />
        </a>

        <a
          href="https://linkedin.com/company/PixelPandas"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute left-[24.32%] top-[89.13%] flex items-center gap-[7px]"
        >
          <img src={linkedinIcon} alt="" className="size-6" />
          <span className="text-body-lg text-[#e3f7eb]">LinkedIn</span>
          <img src={tagArrow} alt="" className="size-6" />
        </a>
      </div>

      {/* Mobile / Tablet */}
      <div className="mx-auto flex max-w-3xl flex-col items-center lg:hidden">
        <h2 className="text-balance text-center text-display-3 font-normal uppercase leading-[1.1] tracking-tight text-white">
          Meet the Founder
        </h2>

        <motion.div
          initial={{ opacity: 0, rotate: 0, y: 24 }}
          animate={{ opacity: 1, rotate: -7.14, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="mt-10 flex w-[300px] flex-col items-center gap-4 border border-[#d1d4d0] bg-[#f9f9f7] p-4 pb-6 shadow-[0_12px_16px_rgba(0,0,0,0.09)]"
        >
          <img
            src={founderPhoto}
            alt="Varun Yadav, Founder & Creative Director"
            className="aspect-square w-full object-cover"
          />
          <div className="flex flex-col items-center gap-1.5 text-center">
            <p className="text-display-5 font-normal text-[#996b8a]">Varun Yadav</p>
            <p className="text-label font-bold uppercase text-black">Founder &amp; Creative Director</p>
          </div>
        </motion.div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
          <a
            href="https://instagram.com/pixelpandas.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <img src={instagramIcon} alt="" className="size-6" />
            <span className="text-body-lg text-[#e3f7eb]">Instagram</span>
            <img src={tagArrow} alt="" className="size-6" />
          </a>

          <a
            href="https://linkedin.com/company/PixelPandas"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2"
          >
            <img src={linkedinIcon} alt="" className="size-6" />
            <span className="text-body-lg text-[#e3f7eb]">LinkedIn</span>
            <img src={tagArrow} alt="" className="size-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
