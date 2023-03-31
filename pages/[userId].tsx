import type { IUser } from '@/utils/models/User'

import Layout from '@/UI/Layout'
import CalendarDiv from '@/components/Calendar'
import useSWR from 'swr'
import fetcher from '@/utils/functions/Fetcher'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

const MainPage = () => {
	const router = useRouter()
	const { userId } = router.query

	const { data, mutate, isLoading } = useSWR('/api/appointments', fetcher) as {
		data: {
			users: IUser[]
		}
		mutate: () => Promise<void>
		isLoading: boolean
	}

	if (isLoading) return <Layout>טוען, אנא המתן...</Layout>

	const user = data && data.users ? data.users.find((user) => user._id === userId) : null
	if (!user) return <Layout>משתמש לא נמצא</Layout>

	return (
		<Layout>
			<h4 className='text-3xl font-medium mb-1 text-gray-900'>ברוכים הבאים!</h4>
			<p className='mb-6 text-gray-600'>לחצו על אחד התאריכים הפנויים על מנת לקבוע פגישה</p>

			<CalendarDiv
				user={user}
				mutate={mutate}
			/>
		</Layout>
	)
}

export default MainPage
