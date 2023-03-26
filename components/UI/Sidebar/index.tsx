import { useRouter } from 'next/router'
import SidebarOption from './Option'
import Routes from './Routes'
import useAuth from '@/utils/hooks/useAuth'

const Sidebar = () => {
	const router = useRouter()
	const { isLoggedIn } = useAuth()

	return (
		<div className='bg-slate-50 rounded-lg col-span-2 p-4'>
			{Routes.map((route) => {
				if (route.logged && !isLoggedIn) return null

				return (
					<SidebarOption
						key={route.path}
						Icon={route.icon}
						title={route.title}
						path={route.path}
						active={router.pathname === route.path}
					/>
				)
			})}
		</div>
	)
}

export default Sidebar
