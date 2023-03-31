import type { IUser } from '@/utils/models/User'

import Layout from '@/UI/Layout'
import useSWR from 'swr'
import fetcher from '@/utils/functions/Fetcher'

import ManageCalendar from '@/components/ManageCalendar'
import { useRouter } from 'next/router'

const MainPage = () => {
	const {
		query: { userId },
	} = useRouter()

	const { data, mutate } = useSWR(`/api/admin/workers/${userId}`, fetcher) as {
		data: {
			user: IUser
		}
		mutate: () => Promise<void>
	}

	return (
		<Layout>
			<h4 className='text-3xl font-medium mb-1 text-gray-900'>
				ניהול תורים - עובד: {data && data.user && data.user.name}
			</h4>
			<p className='mb-6 text-gray-600'>ניהול זמני פעילות ותורים שנקבעו על ידי לקוחות</p>

			<ManageCalendar
				weeklyHours={(data && data.user && data.user.weeklyHours) || []}
				specialDates={(data && data.user && data.user.specialDates) || []}
				appointments={(data && data.user && data.user.appointments) || []}
				breaks={(data && data.user && data.user.breaks) || []}
				mutate={mutate}
				manager
			/>
		</Layout>
	)
}

export default MainPage
