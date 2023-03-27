import type { IUser } from '@/utils/models/User'

import Layout from '@/UI/Layout'
import CalendarDiv from '@/components/UserCalendar'
import useSWR from 'swr'
import fetcher from '@/utils/functions/Fetcher'
import DaysSettings from '@/components/UserCalendar/DaysSettings'

const MainPage = () => {
	const { data, mutate } = useSWR('/api/admin/user', fetcher) as {
		data: {
			user: IUser
		}
		mutate: () => Promise<void>
	}

	return (
		<Layout title='ניהול זמני פעילות'>
			<h4 className='text-3xl font-medium mb-1 text-gray-900'>ניהול זמני פעילות</h4>
			<p className='mb-6 text-gray-600'>בחרו זמני פעילות קבועים או זמני פעילות על פי תאריך</p>

			<DaysSettings
				weeklyHours={data ? (data && data.user && data.user.weeklyHours) || [] : null}
				mutate={mutate}
			/>

			<CalendarDiv
				weeklyHours={(data && data.user && data.user.weeklyHours) || []}
				specialDates={(data && data.user && data.user.specialDates) || []}
				appointments={(data && data.user && data.user.appointments) || []}
				mutate={mutate}
			/>
		</Layout>
	)
}

export default MainPage
