import Footer from './Footer'
import Head from './Html/Head'
import Navbar from './Navbar'
import Sidebar from './Sidebar'

const Layout = ({ children, title, className }: ILayoutProps) => {
	return (
		<>
			<Head title={title} />
			<Navbar />
			<main className={`bg-slate-100 min-h-screen grid lg:grid-cols-12 gap-8 p-8 ${className || ''}`}>
				<Sidebar />
				<div className='bg-slate-50 w-full lg:col-span-10 rounded-lg p-8'>{children}</div>
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
