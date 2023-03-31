import type { ICompany } from '@/utils/models/Company'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import Layout from '@/UI/Layout'
import useSWR from 'swr'
import fetcher from '@/utils/functions/Fetcher'
import SelectCompany from '@/components/SelectCompanies'
import SelectUser from '@/components/SelectUser'

const MainPage = ({ subdomain }: { subdomain: string }) => {
	const router = useRouter()

	const { data } = useSWR(subdomain ? `/api/company/${subdomain}` : `/api/company`, fetcher) as {
		data: {
			company: ICompany
			companies: ICompany[]
		}
	}

	return subdomain ? (
		<Layout>
			<h4 className='text-2xl font-medium mb-2 text-gray-900'>ברוכים הבאים!</h4>
			<p className='mb-4 text-gray-800'>אנא בחרו משתמש לקביעת התור</p>

			<SelectUser users={data && data.company && data.company.users ? data.company.users : []} />
		</Layout>
	) : (
		<Layout>
			<h4 className='text-2xl font-medium mb-2 text-gray-900'>ברוכים הבאים! {subdomain}</h4>
			<p className='mb-4 text-gray-800'>אנא בחרו חברה לקביעת התור</p>

			<SelectCompany companies={data && data.companies ? data.companies : []} />
		</Layout>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	let subdomain = context.req.headers.host?.split('.')[0]

	return { props: { subdomain } }
}

export default MainPage
