import messages from '@intlify/unplugin-vue-i18n/messages';
import { get } from '@vueuse/core';
import type { Plugin } from 'vue';
import { createI18n } from 'vue-i18n';

const availableLocales = Object.keys(messages as Record<string, unknown>);

function detectBrowserLocale(): string {
  const lang = (navigator.language || 'en').split('-')[0];
  return availableLocales.includes(lang) ? lang : 'en';
}

const i18n = createI18n({
  legacy: false,
  locale: detectBrowserLocale(),
  fallbackLocale: 'en',
  messages,
});

export const i18nPlugin: Plugin = {
  install: (app) => {
    app.use(i18n);
  },
};

export const translate = function (localeKey: string) {
  const hasKey = i18n.global.te(localeKey, get(i18n.global.locale));
  return hasKey ? i18n.global.t(localeKey) : localeKey;
};
