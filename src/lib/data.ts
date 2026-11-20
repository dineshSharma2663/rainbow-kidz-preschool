import type { ImageMetadata } from 'astro';
import data from '../data/school-data.json';

export const school = data;
export type SchoolEvent = (typeof data.events)[number];
export type ToneId = 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'indigo' | 'violet';

/* ---------- images: JSON stores "assets/..." paths, resolved at build ---------- */
const images = import.meta.glob<{ default: ImageMetadata }>('/src/assets/**/*.{jpg,jpeg,png}', { eager: true });

export function img(path: string): ImageMetadata {
  const hit = images[`/src/${path}`];
  if (!hit) throw new Error(`school-data.json points to a missing image: ${path}`);
  return hit.default;
}

/* ---------- urls that respect the GitHub Pages base path ---------- */
const base = import.meta.env.BASE_URL.replace(/\/$/, '');
export const url = (path = '') => `${base}/${path.replace(/^\//, '')}`;

/* ---------- rainbow tones ---------- */
const rainbow = Object.fromEntries(data.theme.rainbow.map((c) => [c.id, c]));
export const toneOrder: ToneId[] = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo', 'violet'];
export const tone = (id: string) => {
  const c = rainbow[id] ?? rainbow.blue;
  return `--tone:${c.base};--tone-soft:${c.soft};--tone-ink:${c.ink};`;
};
export const hex = (id: string) => (rainbow[id] ?? rainbow.blue).base;

/* ---------- events in school-year order (April to March) ---------- */
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const monthOf = (e: SchoolEvent) => Number(e.date.slice(5, 7)) - 1;
export const monthName = (e: SchoolEvent) => MONTHS[monthOf(e)];
export const yearOf = (e: SchoolEvent) => e.date.slice(0, 4);
export const formatDate = (e: SchoolEvent) =>
  e.date.length > 7 ? `${Number(e.date.slice(8, 10))} ${monthName(e)} ${yearOf(e)}` : `${monthName(e)} ${yearOf(e)}`;

export const eventsBySchoolYear = [...data.events].sort((a, b) => ((monthOf(a) + 9) % 12) - ((monthOf(b) + 9) % 12));

export const categoryLabel: Record<string, string> = {
  festival: 'Festivals',
  'national-day': 'National days',
  milestone: 'Milestones',
  family: 'With families',
  trip: 'Trips',
  celebration: 'Celebrations',
  admissions: 'Admissions',
};

/* ---------- contact helpers ---------- */
export const primaryBranch = data.branches[0];
const digits = (p: string) => p.replace(/\D/g, '');
export const telHref = (p: string) => `tel:+${digits(p)}`;
export const waHref = (p: string, text = '') =>
  `https://wa.me/${digits(p)}${text ? `?text=${encodeURIComponent(text)}` : ''}`;
export const mapHref = (branchName: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Rainbow Kidz Pre School ${branchName} Gurugram`)}`;

export const yearsRunning = new Date().getFullYear() - data.school.foundedYear.value;
