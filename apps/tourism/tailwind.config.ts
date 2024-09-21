import { createGlobPatternsForDependencies } from '@nx/react/tailwind';
import { join } from 'path';
import type { Config } from 'tailwindcss';
import { colors } from './design';

const config: Config = {
  content: [
    join(
      __dirname,
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}'
    ),
    ...createGlobPatternsForDependencies(__dirname),
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '2rem',
        },
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)'],
        'source-sans-pro': ['var(--font-source-sans-3)'],
        inter: ['var(--font-inter)'],
      },
      colors,
    },
  },
  plugins: [require('tailwindcss-animate')],
};

export default config;
