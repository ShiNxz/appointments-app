import type { ICompany } from '@/utils/models/Company'

import Layout from '@/UI/Layout'
import useSWR from 'swr'
import fetcher from '@/utils/functions/Fetcher'

import AdminDays from '@/components/Admin/Weekly'
import useAuth from '@/utils/hooks/useAuth'
import { useRouter } from 'next/router'

const MainPage = () => {
	const { data, mutate } = useSWR('/api/admin/company', fetcher) as {
		data: {
			company: ICompany
		}
		mutate: () => Promise<void>
	}

	const { isLoggedIn } = useAuth()

	return isLoggedIn && (
		<Layout>
			<h4 className='text-3xl font-medium mb-1 text-gray-900'>ניהול זמני פעילות חברה</h4>
			<p className='mb-6 text-gray-600'>...</p>

			<AdminDays
				weeklyHours={data ? (data && data.company && data.company.weeklyHours) || [] : null}
				mutate={mutate}
			/>
		</Layout>
	)
}

export default MainPage
