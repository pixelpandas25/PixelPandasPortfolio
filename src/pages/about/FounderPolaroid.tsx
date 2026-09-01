import { motion } from 'framer-motion';
import founderPhoto from '@/assets/images/founder-photo.webp';
import instagramIcon from '@/assets/icons/social-instagram-icon.svg';
import linkedinIcon from '@/assets/icons/social-linkedin-icon.svg';
import tagArrow from '@/assets/icons/tag-arrow-up-right.svg';

export function FounderPolaroid() {
  return (
    <section data-nav-tone="dark" className="section-y relative overflow-hidden bg-[#121212] px-6">
      <h2 className="mx-auto max-w-3xl text-balance text-center text-display-3 font-normal uppercase leading-[1.1] tracking-tight text-white">
        Meet the Founder
      </h2>

      <div className="relative mx-auto mt-10 flex max-w-3xl flex-col items-center">
        <motion.div
          initial={{ opacity: 0, rotate: 0, y: 24 }}
          animate={{ opacity: 1, rotate: -7, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="flex w-[300px] flex-col items-center gap-4 border border-[#d1d4d0] bg-[#f9f9f7] p-4 pb-6 shadow-[0_12px_16px_rgba(0,0,0,0.09)] sm:w-[380px]"
        >
          <img src={founderPhoto} alt="Varun Yadav, Founder & Creative Director" className="size-full object-cover" />
          <div className="flex flex-col items-center gap-1.5 text-center">
            <p className="text-display-5 font-normal text-[#996b8a]">Varun Yadav</p>
            <p className="text-label font-bold uppercase text-black">Founder &amp; Creative Director</p>
          </div>
        </motion.div>

        <a
          href="https://instagram.com/pixelpandas.in"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-0 top-[45%] hidden items-center gap-2 md:flex"
        >
          <img src={instagramIcon} alt="" className="size-6" />
          <span className="text-body-lg text-[#e3f7eb]">Instagram</span>
          <img src={tagArrow} alt="" className="size-6" />
        </a>

        <a
          href="https://linkedin.com/company/PixelPandas"
          target="_blank"
          rel="noopener noreferrer"
          className="absolute bottom-[8%] left-0 hidden items-center gap-2 md:flex"
        >
          <img src={linkedinIcon} alt="" className="size-6" />
          <span className="text-body-lg text-[#e3f7eb]">LinkedIn</span>
          <img src={tagArrow} alt="" className="size-6" />
        </a>
      </div>
    </section>
  );
}
