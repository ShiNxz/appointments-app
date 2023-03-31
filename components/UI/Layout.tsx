import useAuth from '@/utils/hooks/useAuth'
import Footer from './Footer'
import Head from './Html/Head'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = ({ children, title, className }: ILayoutProps) => {
	const { isLoggedIn } = useAuth()

	return (
		<>
			<Head title={title} />
			<Navbar />
			<main
				className={`bg-slate-100 min-h-screen grid ${isLoggedIn ? 'lg:grid-cols-12' : ''} gap-8 p-4 lg:p-8 ${
					className || ''
				}`}
			>
				{isLoggedIn && <Sidebar />}
				<div className={`bg-slate-50 w-full ${isLoggedIn ? 'lg:col-span-9' : ''} rounded-lg p-2 lg:p-8`}>
					{children}
				</div>
			</main>
			<Footer />
		</>
	)
}

interface ILayoutProps {
	children: React.ReactNode
	title?: string
	className?: string
}

export default Layout
