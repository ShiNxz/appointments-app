import type { IUser } from '@/utils/models/User'
import type { ICompany } from '@/utils/models/Company'

import Layout from '@/UI/Layout'
import useSWR from 'swr'
import fetcher from '@/utils/functions/Fetcher'
import DaysSettings from '@/components/UserCalendar/DaysSettings'
import NewBreak from '@/components/UserCalendar/NewBreak'

const MainPage = () => {
	const { data, mutate } = useSWR('/api/admin/user', fetcher) as {
		data: {
			user: IUser
			company: ICompany
		}
		mutate: () => Promise<void>
	}

	return (
		<Layout title='ניהול זמני פעילות'>
			<h4 className='text-3xl font-medium mb-1 text-gray-900'>ניהול זמני פעילות</h4>
			<p className='mb-6 text-gray-600'>בחרו זמני פעילות קבועים או זמני פעילות על פי תאריך</p>

			<div className='flex flex-row gap-24'>
				<DaysSettings
					weeklyHours={data ? (data && data.user && data.user.weeklyHours) || [] : null}
					companyWeeklyHours={data ? (data && data.company && data.company.weeklyHours) || [] : null}
					mutate={mutate}
				/>

				<div className='flex flex-col'>
					<h4 className='text-2xl mb-6 font-medium'>ניהול הפסקות</h4>
					<NewBreak />
				</div>
			</div>
		</Layout>
	)
}

export default MainPage
