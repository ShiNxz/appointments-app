import type { IUser } from '@/utils/models/User'
import type { ICompany } from '@/utils/models/Company'

import Layout from '@/UI/Layout'
import useSWR from 'swr'
import fetcher from '@/utils/functions/Fetcher'
import SelectUser from '@/components/SelectUser'
import { useRouter } from 'next/router'

const MainPage = () => {
	const router = useRouter()
	const { companyId } = router.query

	const { data } = useSWR(`/api/company/${companyId}`, fetcher) as {
		data: {
			company: ICompany
		}
	}

	return (
		<Layout>
			<h4 className='text-2xl font-medium mb-2 text-gray-900'>ברוכים הבאים!</h4>
			<p className='mb-4 text-gray-800'>אנא בחרו משתמש לקביעת התור</p>

			<SelectUser users={data && data.company && data.company.users ? data.company.users : []} />
		</Layout>
	)
}

export default MainPage
