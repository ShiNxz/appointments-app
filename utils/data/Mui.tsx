import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'

import rtlPlugin from 'stylis-plugin-rtl'
import { prefixer } from 'stylis'

// Date Pickers
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

const theme = createTheme({
	direction: 'rtl',
	// shadows: Array(25).fill('none'),
	typography: {
		fontFamily: 'rubik',
	},
	components: {
		MuiInputAdornment: {
			styleOverrides: {
				positionEnd: {
					fontSize: '20px',
				},
			},
		},
	},
	palette: {
		secondary: {
			main: '#1e3a8a',
		},
		warning: {
			main: '#edba02',
		},
	},
})

// Create rtl cache
const cacheRtl = createCache({
	key: 'muirtl',
	stylisPlugins: [prefixer, rtlPlugin],
})

const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
	return (
		<MUIThemeProvider theme={theme}>
			<LocalizationProvider dateAdapter={AdapterDayjs}>
				<CacheProvider value={cacheRtl}>{children}</CacheProvider>
			</LocalizationProvider>
		</MUIThemeProvider>
	)
}

export default ThemeProvider
