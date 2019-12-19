module.exports = {
	presets: [
		'@babel/preset-react',
		['@babel/preset-env', { targets: { node: true } }],
	],
	plugins: [
		['@babel/plugin-proposal-class-properties', { legacy: true }],
	],
};
