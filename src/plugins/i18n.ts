import { createI18n } from 'vue-i18n';

const DEFAULT_LOCALE = 'en';

export const locales = [DEFAULT_LOCALE, 'nl', 'fr'].sort();

const i18n = new (createI18n as any)({
	locale: DEFAULT_LOCALE,
	messages: {},
	availableLocales: locales,
});

/**
 * @param {String} locale
 */

export async function loadMessages(locale: string) {
	const messages = await import(/* webpackChunkName: "lang-[request]" */ `@/locales/${locale}`); // Dynamically get a locale

	i18n.global.setLocaleMessage(locale, messages);

	if (i18n.locale !== locale) {
		i18n.locale = locale;
	}
}

(async function() {
	await loadMessages(DEFAULT_LOCALE);
})();

export default i18n;
