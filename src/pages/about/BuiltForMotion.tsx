import motion01 from '@/assets/images/motion-01.webp';
import motion02 from '@/assets/images/motion-02.webp';
import motion03 from '@/assets/images/motion-03.webp';

const items = [
  {
    number: '01',
    image: motion01,
    text: 'Early and not sure what design you even need yet. We help you find the shape before you commit to it.',
  },
  {
    number: '02',
    image: motion02,
    text: "You've got traction and a roadmap. Now you need design that can keep pace without breaking.",
  },
  {
    number: '03',
    image: motion03,
    text: "You needed it yesterday. Minimum turnaround, maximum polish — that's the default here.",
  },
];

export function BuiltForMotion() {
  return (
    <section data-nav-tone="dark" className="bg-black px-6 py-16 sm:px-[100px] sm:py-[96px]">
      <div className="mx-auto flex max-w-site flex-col gap-5 sm:gap-[20px]">
        <h2 className="text-display-4 font-bold leading-[1.35] text-[#dddddd]">
          Built for people
          <br />
          in motion.
        </h2>

        <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:gap-20">
          {items.map((item) => (
            <div key={item.number} className="flex flex-col items-start gap-2">
              <img src={item.image} alt="" aria-hidden className="h-[140px] w-auto object-contain sm:h-[178px]" />
              <p className="text-display-5 font-semibold leading-[1.35] text-[#f2f2f2]">{item.number}</p>
              <p className="text-body-lg font-medium leading-[1.35] text-[#8a8a93] sm:text-[20px]">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
