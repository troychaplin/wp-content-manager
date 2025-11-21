const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );

module.exports = {
	...defaultConfig,
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules.map( ( rule ) => {
				if (
					rule.test &&
					rule.test.toString() === '/\\.(sc|sa)ss$/'
				) {
					return {
						...rule,
						use: rule.use.map( ( u ) => {
							if (
								u.loader &&
								u.loader.includes( 'sass-loader' )
							) {
								return {
									...u,
									options: {
										...u.options,
										sassOptions: {
											silenceDeprecations: [
												'legacy-js-api',
											],
										},
									},
								};
							}
							return u;
						} ),
					};
				}
				return rule;
			} ),
		],
	},
};
