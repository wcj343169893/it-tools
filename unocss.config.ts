import {
  defineConfig,
  presetAttributify,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

import { presetScrollbar } from 'unocss-preset-scrollbar';

export default defineConfig({
  presets: [presetUno(), presetAttributify({ ignoreAttributes: ['size'] }), presetTypography(), presetScrollbar()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  theme: {
    colors: {
      primary: '#1ea54c',
      'primary-light': '#4ade80',
      surface: '#ffffff',
      'surface-variant': '#f5f5f5',
      background: '#f8fafc',
      outline: '#e2e8f0',
      'on-surface': '#1e293b',
    },
  },
  shortcuts: {
    'pretty-scrollbar':
      'scrollbar scrollbar-rounded scrollbar-thumb-color-gray-300 scrollbar-track-color-gray-100 dark:scrollbar-thumb-color-#424242 dark:scrollbar-track-color-#686868',
    'divider': 'h-1px bg-current op-10',
    'bg-surface': 'bg-white dark:bg-#1e1e1e',
    'bg-surface-variant': 'bg-#f5f5f5 dark:bg-#2d2d2d',
    'bg-background': 'bg-#f8fafc dark:bg-#121212',
    'elevation-1': 'shadow-sm dark:shadow-[0_1px_3px_rgba(0,0,0,0.4)]',
    'elevation-2': 'shadow-md dark:shadow-[0_4px_12px_rgba(0,0,0,0.5)]',
    'elevation-3': 'shadow-lg dark:shadow-[0_8px_24px_rgba(0,0,0,0.6)]',
  },
});
