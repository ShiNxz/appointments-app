module.exports = {
	swcMinify: true,
	reactStrictMode: true,
	webpack: (config) => {
		config.resolve.alias['./main.css'] = false
		return config
	},
}
