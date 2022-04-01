const { merge } = require('webpack-merge')
const commonConfiguration = require('./webpack.common.js')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')

module.exports = merge(commonConfiguration, {
	mode: 'production',
	plugins: [new CleanWebpackPlugin()],
	optimization: {
		minimizer: [
			new ImageMinimizerPlugin({
				minimizer: {
					implementation: ImageMinimizerPlugin.squooshMinify,
					options: {
						encodeOptions: {
							mozjpeg: {
								// That setting might be close to lossless, but it’s not guaranteed
								// https://github.com/GoogleChromeLabs/squoosh/issues/85
								quality: 100,
							},
							webp: {
								lossless: 1,
							},
							avif: {
								// https://github.com/GoogleChromeLabs/squoosh/blob/dev/codecs/avif/enc/README.md
								cqLevel: 0,
							},
						},
					},
				},
			}),
		],
	},
})
