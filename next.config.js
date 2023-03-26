module.exports = {
	swcMinify: true,
	reactStrictMode: true,
	webpack: (config) => {
		config.module.rules.push({
			test: /node_modules\/@fullcalendar/,
			resolve: {
				alias: {
					'./main.css': false,
				},
			},
		})

		return config
	},
}
