import type { IUser } from '@/utils/models/User'
import type { ICompany } from '@/utils/models/Company'

import Layout from '@/UI/Layout'
import useSWR from 'swr'
import fetcher from '@/utils/functions/Fetcher'
import { useRouter } from 'next/router'
import DaysSettings from '@/components/UserCalendar/DaysSettings'
import useAuth from '@/utils/hooks/useAuth'

const MainPage = () => {
	const {
		query: { userId },
	} = useRouter()

	const { data, mutate } = useSWR(`/api/admin/workers/${userId}`, fetcher) as {
		data: {
			user: IUser
			company: ICompany
		}
		mutate: () => Promise<void>
	}

	const { isLoggedIn } = useAuth()

	return isLoggedIn && (
		<Layout>
			<h4 className='text-3xl font-medium mb-1 text-gray-900'>
				ניהול זמני פעילות - עובד: {data && data.user && data.user.name}
			</h4>
			<p className='mb-6 text-gray-600'>ניהול שעות פעילות והפסקות עובד</p>

			<DaysSettings
				weeklyHours={(data && data.user && data.user.weeklyHours) || []}
				companyWeeklyHours={data ? (data && data.company && data.company.weeklyHours) || [] : null}
				breaks={(data && data.user && data.user.breaks) || []}
				mutate={mutate}
				userId={userId as string}
			/>
		</Layout>
	)
}

export default MainPage
