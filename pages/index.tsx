import type { IUser } from '@/utils/models/User'

import Layout from '@/UI/Layout'
import useSWR from 'swr'
import fetcher from '@/utils/functions/Fetcher'
import SelectUser from '@/components/SelectUser'

const MainPage = () => {
	const { data } = useSWR('/api/users', fetcher) as {
		data: {
			users: IUser[]
		}
	}

	return (
		<Layout>
			<h4 className='text-2xl font-medium mb-2 text-gray-900'>ברוכים הבאים!</h4>
			<p className='mb-4 text-gray-800'>אנא בחרו משתמש לקביעת התור</p>

			<SelectUser users={data && data.users ? data.users : []} />
		</Layout>
	)
}

export default MainPage
