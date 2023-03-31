import type { ICompany } from '@/utils/models/Company'
import Layout from '@/UI/Layout'
import useSWR from 'swr'
import fetcher from '@/utils/functions/Fetcher'
import SelectCompany from '@/components/SelectCompanies'

const MainPage = () => {
	const { data } = useSWR(`/api/company`, fetcher) as {
		data: {
			companies: ICompany[]
		}
	}

	return (
		<Layout>
			<h4 className='text-2xl font-medium mb-2 text-gray-900'>ברוכים הבאים!</h4>
			<p className='mb-4 text-gray-800'>אנא בחרו חברה לקביעת התור</p>

			<SelectCompany companies={data && data.companies ? data.companies : []} />
		</Layout>
	)
}

export default MainPage
