import type { Testimonial } from '@/types';

import avatarNaman from '@/assets/images/avatar-naman.webp';
import avatarPriyansh from '@/assets/images/avatar-priyansh.webp';
import avatarNiharikha from '@/assets/images/avatar-niharikha.webp';
import avatarSiddhant from '@/assets/images/avatar-siddhant.webp';
import avatarDivyanshu from '@/assets/images/avatar-divyanshu.webp';
import mediaStriver from '@/assets/images/testimonial-striver.webp';
import mediaMihika from '@/assets/images/testimonial-mihika.webp';

export const testimonials: Testimonial[] = [
  {
    id: 'naman',
    variant: 'text',
    avatar: avatarNaman,
    quote:
      "Thank you guys for designing such a creative and visually appealing website. Your effort and attention to detail are truly appreciated. We truly appreciate the effort, quality, and timely delivery. Let's stay connected!",
    name: 'Naman Deshmukh',
    role: 'Founder @thegrowthplus & techplusgadgets',
  },
  {
    id: 'striver',
    variant: 'media',
    image: mediaStriver,
    name: 'Striver',
    role: 'Founder @takeUforward',
  },
  {
    id: 'priyansh',
    variant: 'text',
    avatar: avatarPriyansh,
    quote:
      'Thanks a lot for all the efforts, this was really efficient honestly. I have always struggled with getting any design work done from people. It has always been too draining for me because I had to pin point every little detail and spend hours on meets trying to do get the most minute things right and having to think about the UX as well myself. With you, it was a breeze.',
    name: 'Priyansh Agrawal',
    role: 'Founder @TLE Eliminator',
  },
  {
    id: 'mihika',
    variant: 'media',
    image: mediaMihika,
    name: 'Mihika Sampat',
    role: 'CEO @Elastochemie Impex',
  },
  {
    id: 'niharikha',
    variant: 'text',
    avatar: avatarNiharikha,
    quote:
      'The team have been amazing in terms of work and delivery. Their attention to detail, creative problem-solving, and consistent communication made the entire process seamless. Every milestone was hit on time, and the final result exceeded our expectations. Truly a pleasure to collaborate with.',
    name: 'Niharikha',
    role: 'Design Manager @Scapia',
  },
  {
    id: 'siddhant',
    variant: 'text',
    avatar: avatarSiddhant,
    quote:
      'The team have been great in terms of product thinking and execution of the work for the design. Their deep understanding of product design made all the difference. Every decision was intentional, every detail considered, and the final result speaks for itself.',
    name: 'Siddhant Bajaj',
    role: 'Co-Founder @AICA',
  },
  {
    id: 'divyanshu',
    variant: 'text',
    avatar: avatarDivyanshu,
    quote:
      'The team have been great in terms of product thinking and execution of the work for the design. Their deep understanding of product design made all the difference. Every decision was intentional, every detail considered, and the final result speaks for itself.',
    name: 'Divyanshu Urmaliya',
    role: 'CEO @Supermission',
  },
];
