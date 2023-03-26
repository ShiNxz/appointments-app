const withTM = require('next-transpile-modules')([
	'@fullcalendar/common',
	'@babel/preset-react',
	'@fullcalendar/common',
	'@fullcalendar/daygrid',
	'@fullcalendar/interaction',
	'@fullcalendar/react',
	'@fullcalendar/timegrid',
])

module.exports = withTM({
	swcMinify: true,
	reactStrictMode: true,
})
