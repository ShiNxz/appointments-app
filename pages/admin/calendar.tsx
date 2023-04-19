import type { IUser } from '@/utils/models/User'

import Layout from '@/UI/Layout'
import useSWR from 'swr'
import fetcher from '@/utils/functions/Fetcher'

import ManageCalendar from '@/components/ManageCalendar'
import useAuth from '@/utils/hooks/useAuth'

const MainPage = () => {
	const { data, mutate } = useSWR('/api/admin/user', fetcher) as {
		data: {
			user: IUser
		}
		mutate: () => Promise<void>
	}

	const { isLoggedIn } = useAuth()

	return isLoggedIn && (
		<Layout>
			<h4 className='text-3xl font-medium mb-1 text-gray-900'>ניהול תורים</h4>
			<p className='mb-6 text-gray-600'>ניהול ימי עבודה וצפייה וניהול תורים שנקבעו על ידי לקוחות</p>

			<ManageCalendar
				weeklyHours={(data && data.user && data.user.weeklyHours) || []}
				specialDates={(data && data.user && data.user.specialDates) || []}
				appointments={(data && data.user && data.user.appointments) || []}
				breaks={(data && data.user && data.user.breaks) || []}
				mutate={mutate}
			/>
		</Layout>
	)
}

export default MainPage
