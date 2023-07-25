module.exports = {
	locales: ['ru', 'en', 'uz'],
	defaultLocale: 'ru',
	defaultNS: 'common',
	loadLocaleFrom: (lang, ns) =>
		import(`@/locales/${lang}/${ns}.json`).then((m) => m.default),
	pages: {
		'*': ['common'],
		'/about': ['about'],
	},
	localeDetection: false,
};
