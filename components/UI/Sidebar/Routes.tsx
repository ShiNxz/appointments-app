import { IconType } from 'react-icons'
import { BiHomeAlt } from 'react-icons/bi'

const Routes: Route[] = [
	{
		path: '/admin',
		title: 'ניהול זמני פעילות והפסקות',
		icon: BiHomeAlt,
		logged: true,
	},
	{
		path: '/admin/calendar',
		title: 'ניהול תורים וימי עבודה',
		icon: BiHomeAlt,
		logged: true,
	},
	{
		path: '/admin/workers',
		title: 'ניהול עובדים',
		icon: BiHomeAlt,
		manager: true,
	},
	{
		path: '/admin/hours',
		title: 'ניהול זמני פעילות חברה',
		icon: BiHomeAlt,
		manager: true,
	},
]

interface Route {
	path: string
	title: string
	icon: IconType
	logged?: boolean
	manager?: boolean
}

export default Routes
