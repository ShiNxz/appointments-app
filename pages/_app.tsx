import '../styles/globals.scss'
import 'react-toastify/dist/ReactToastify.min.css'
import type { AppProps } from 'next/app'


import { ToastContainer } from 'react-toastify'
import ThemeProvider from '@/utils/data/Mui'

const App = ({ Component, pageProps }: AppProps) => {
	return (
		<ThemeProvider>
			<Component {...pageProps} />
			<ToastContainer
				rtl
				closeButton
				closeOnClick
				autoClose={3000}
				position='bottom-right'
			/>
		</ThemeProvider>
	)
}

export default App
