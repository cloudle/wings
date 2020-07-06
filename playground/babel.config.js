module.exports = {
	presets: [
		'@babel/preset-react',
		'@babel/preset-flow',
		['@babel/preset-env', { targets: { node: true } }],
	],
};
