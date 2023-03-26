import type { IUser } from '@/utils/models/User'

import Layout from '@/UI/Layout'
import useSWR from 'swr'
import fetcher from '@/utils/functions/Fetcher'

import ManageCalendar from '@/components/ManageCalendar'

const MainPage = () => {
	const { data } = useSWR('/api/admin/user', fetcher) as {
		data: {
			user: IUser
		}
	}

	return (
		<Layout>
			<h4 className='text-3xl font-medium mb-1 text-gray-900'>ניהול תורים</h4>
			<p className='mb-6 text-gray-600'>צפייה בתורים שנקבעו על ידי לקוחות</p>

			<ManageCalendar dates={data && data.user.dates ? data.user.dates : []} />
		</Layout>
	)
}

export default MainPage
