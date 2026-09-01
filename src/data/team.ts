import type { TeamMember } from '@/types';

import abhishek from '@/assets/images/team-abhishek.webp';
import atharva from '@/assets/images/team-atharva.webp';
import rakesh from '@/assets/images/team-rakesh.webp';
import ananya from '@/assets/images/team-ananya.webp';
import prakriti from '@/assets/images/team-prakriti.webp';
import varun from '@/assets/images/team-varun.webp';
import shrawni from '@/assets/images/team-shrawni.webp';
import shabbir from '@/assets/images/team-shabbir.webp';
import aditya from '@/assets/images/team-aditya.webp';
import ojasvi from '@/assets/images/team-ojasvi.webp';

export interface TeamMemberEntry extends TeamMember {
  role: string;
}

export const teamRows: TeamMemberEntry[][] = [
  [
    { id: 'abhishek', name: 'Abhishek', role: 'Founding Product Designer', photo: abhishek },
    { id: 'atharva', name: 'Atharva', role: 'Founding Product Designer', photo: atharva },
    { id: 'rakesh', name: 'Rakesh Singh', role: 'Finance Manager', photo: rakesh },
  ],
  [
    { id: 'ananya', name: 'Ananya', role: 'Product Manager', photo: ananya },
    { id: 'prakriti', name: 'Prakriti Khare', role: 'Product Manager', photo: prakriti },
    { id: 'varun', name: 'Varun Yadav', role: 'Founder', photo: varun },
    { id: 'shrawni', name: 'Shrawni', role: 'Visual Designer', photo: shrawni },
  ],
  [
    { id: 'shabbir', name: 'Shabbir', role: 'Brand Designer', photo: shabbir },
    { id: 'aditya', name: 'Aditya', role: 'Logo Designer', photo: aditya },
    { id: 'ojasvi', name: 'Ojasvi', role: 'UI/UX Designer', photo: ojasvi },
  ],
];

export const rowLabels = ['Meet', 'Our', 'Team'];

export interface AlumniEntry {
  id: string;
  name: string;
  photo: string;
}

import mukti from '@/assets/images/expandas-mukti.webp';
import shambhavi from '@/assets/images/expandas-shambhavi.webp';
import juhi from '@/assets/images/expandas-juhi.webp';
import shewta from '@/assets/images/expandas-shewta.webp';
import anuj from '@/assets/images/expandas-anuj.webp';
import ankur from '@/assets/images/expandas-ankur.webp';

export const alumni: AlumniEntry[] = [
  { id: 'mukti', name: 'Mukti Markam', photo: mukti },
  { id: 'shambhavi', name: 'Shambhavi Gour', photo: shambhavi },
  { id: 'juhi', name: 'Juhi Jayswal', photo: juhi },
  { id: 'shewta', name: 'Shewta', photo: shewta },
  { id: 'anuj', name: 'Anuj Agrawal', photo: anuj },
  { id: 'ankur', name: 'Ankur Gupta', photo: ankur },
];
