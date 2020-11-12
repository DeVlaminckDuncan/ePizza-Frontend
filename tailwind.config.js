module.exports = {
	future: {
		// removeDeprecatedGapUtilities: true,
		// purgeLayersByDefault: true,
	},
	purge: [],
	target: 'relaxed',
	prefix: '',
	important: false,
	separator: ':',
	theme: {
		screens: {
			sm: '640px',
			md: '768px',
			lg: '1024px',
			xl: '1280px',
		},
		colors: {
			transparent: 'transparent',
			current: 'currentColor',

			dark: '#101010',
			white: '#fff',
			alpha: {
				red: '#cc3128',
				yellow: '#f7c738',
				orange: '#e8842c',
				green: '#32d95e',
			},
		},
		screens: {
			sm: '481px',
			xl: '1279px',
		},
	},
	corePlugins: {},
	plugins: [],
};
