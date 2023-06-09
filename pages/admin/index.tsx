import type { IUser } from '@/utils/models/User'
import type { ICompany } from '@/utils/models/Company'

import Layout from '@/UI/Layout'
import useSWR from 'swr'
import fetcher from '@/utils/functions/Fetcher'
import DaysSettings from '@/components/UserCalendar/DaysSettings'
import useAuth from '@/utils/hooks/useAuth'
import { useRouter } from 'next/router'

const MainPage = () => {
	const { data, mutate } = useSWR('/api/admin/user', fetcher) as {
		data: {
			user: IUser
			company: ICompany
		}
		mutate: () => Promise<void>
	}

	const { isLoggedIn } = useAuth()

	return isLoggedIn && (
		<Layout title='ניהול זמני פעילות'>
			<h4 className='text-3xl font-medium mb-1 text-gray-900'>ניהול זמני פעילות</h4>
			<p className='mb-6 text-gray-600'>בחרו זמני פעילות קבועים או זמני פעילות על פי תאריך</p>

			<DaysSettings
				weeklyHours={data ? (data && data.user && data.user.weeklyHours) || [] : null}
				companyWeeklyHours={data ? (data && data.company && data.company.weeklyHours) || [] : null}
				breaks={data ? (data && data.user && data.user.breaks) || [] : null}
				mutate={mutate}
			/>
		</Layout>
	)
}

export default MainPage
