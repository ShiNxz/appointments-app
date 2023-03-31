import type { ICompany } from '@/utils/models/Company'
import { GetServerSideProps } from 'next'
import Layout from '@/UI/Layout'
import useSWR from 'swr'
import fetcher from '@/utils/functions/Fetcher'
import SelectUser from '@/components/SelectUser'

const MainPage = ({ subdomain }: { subdomain: string }) => {
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
		</Layout>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	let subdomain = context.req.headers.host?.split('.')[0]

	if (context.req.headers.host?.split('.').length === 1)
		return {
			redirect: {
				destination: '/register',
				permanent: false,
			},
		}

	return { props: context.req.headers.host?.split('.').length !== 1 ? { subdomain } : {} }
}

export default MainPage
