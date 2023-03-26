import { IconType } from 'react-icons'
import { BiHomeAlt } from 'react-icons/bi'

const Routes: Route[] = [
	{
		path: '/',
		title: 'זימון תורים',
		icon: BiHomeAlt,
	},
	{
		path: '/admin',
		title: 'ניהול זמני פעילות',
		icon: BiHomeAlt,
		logged: true,
	},
	{
		path: '/admin/calendar',
		title: 'ניהול תורים',
		icon: BiHomeAlt,
		logged: true,
	},
]

interface Route {
	path: string
	title: string
	icon: IconType
	logged?: boolean
}

export default Routes
