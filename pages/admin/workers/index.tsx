import type { ICompany } from '@/utils/models/Company'
import Layout from '@/UI/Layout'
import useSWR from 'swr'
import fetcher from '@/utils/functions/Fetcher'
import ManageWorkers from '@/components/Admin/Workers'
import CreateWorker from '@/components/Admin/Workers/Form'
import useAuth from '@/utils/hooks/useAuth'
import { useRouter } from 'next/router'

const MainPage = () => {
	const { data, mutate } = useSWR(`/api/admin/company`, fetcher) as {
		data: {
			company: ICompany
		}
		mutate: () => Promise<void>
	}

	const { isLoggedIn } = useAuth()

	return isLoggedIn && (
		<Layout title='ניהול עובדים'>
			<h4 className='text-3xl font-medium mb-1 text-gray-900'>ניהול עובדים</h4>
			<p className='mb-6 text-gray-600'>...</p>
			<CreateWorker mutate={mutate} />
			<ManageWorkers
				company={(data && data.company) || null}
				mutate={mutate}
			/>
		</Layout>
	)
}

export default MainPage
