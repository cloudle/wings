const splitBundle = (configs, globalModules) => {
	configs.entry = {
		app: {
			...configs.entry.app,
			dependOn: 'react-core',
		},
		'react-core': {
			import: [
				'react',
				'react-dom',
				'react-native',
				'react-art',
				'@react-native-community/async-storage',
			],
		}
	};

	return configs;
};


module.exports = {
	webpackConfigs: [
		splitBundle,
	],
	moduleAlias: (isProduction) => {
		return {
			global: {
				'react-native': 'react-native-web',
			},
		};
	},
};
