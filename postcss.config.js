module.exports = {
	plugins: [
		require('autoprefixer'),
		require('postcss-flexbugs-fixes'),
		require('postcss-custom-media'),
		require('cssnano')({
			preset: 'default',
		}),
		// require('postcss-custom-properties'),
	]
};