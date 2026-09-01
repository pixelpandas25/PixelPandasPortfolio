import { motion } from 'framer-motion';
import { EyebrowLabel } from '@/components/ui/EyebrowLabel';
import fingerprintPattern from '@/assets/icons/fingerprint-pattern.svg';

const cardCount = 5;
const highlightedIndex = 1;

export function Philosophy() {
  return (
    <section
      data-nav-tone="dark"
      className="section-y flex min-h-[120dvh] items-center bg-surface-dark px-6 sm:px-gutter-sm"
    >
      <div className="mx-auto flex max-w-content flex-col items-center gap-6 text-center sm:gap-8">
        <EyebrowLabel tone="onDark">Our Philosophy</EyebrowLabel>

        <div className="flex flex-col items-center gap-2">
          <p className="text-body text-muted-onDark">Be yourself. Be unique.</p>
          <span aria-hidden className="h-6 w-px bg-[#dddddd]" />

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="my-2 flex items-center gap-4"
          >
            {Array.from({ length: cardCount }).map((_, i) => (
              <div
                key={i}
                className={
                  i === highlightedIndex
                    ? 'flex size-[84px] items-center justify-center rounded-card border-[1.5px] border-accent bg-surface-card'
                    : 'size-[84px] rounded-card bg-surface-card'
                }
              >
                {i === highlightedIndex && (
                  <img src={fingerprintPattern} alt="Fingerprint icon" className="size-8" />
                )}
              </div>
            ))}
          </motion.div>

          <span aria-hidden className="h-6 w-px bg-[#dddddd]" />
          <p className="text-body text-muted">Don&rsquo;t copy others.</p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col items-center gap-8"
        >
          <h2 className="text-display-3 font-bold leading-[1.25] text-paper">
            Your brand has
            <br />
            a fingerprint.
          </h2>
          <p className="max-w-xl text-body text-muted-onDark">
            Every great brand is unmistakably itself. We don&rsquo;t copy. We don&rsquo;t follow templates. We
            find what makes you you and make it impossible to ignore.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
