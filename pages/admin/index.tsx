import type { IUser } from '@/utils/models/User'

import Layout from '@/UI/Layout'
import CalendarDiv from '@/components/UserCalendar'
import useSWR from 'swr'
import fetcher from '@/utils/functions/Fetcher'

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
			<p className='mb-6 text-gray-600'>לחצו על אחד התאריכים הפנויים על מנת לקבוע זמני פעילות לאותו היום</p>
			
			<CalendarDiv
				avDates={data && data.user ? data.user.dates : []}
				mutate={mutate}
			/>
		</Layout>
	)
}

export default MainPage
