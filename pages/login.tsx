import Head from '@/components/UI/Html/Head'
import useAuth from '@/utils/hooks/useAuth'
import { useRouter } from 'next/router'
import { LoginContainer } from '@/components/Auth/LoginModal'

const MainPage = () => {
	const { isLoggedIn, isLoading } = useAuth()
	const router = useRouter()

	if (isLoggedIn) router.push('/admin')

	return (
		!isLoggedIn &&
		!isLoading && (
			<>
				<Head title='התחברות' />
				<div className='flex flex-col items-center justify-center h-screen bg-slate-100'>
					<div className='flex flex-col items-center justify-center w-fit p-12 bg-white rounded-lg shadow-lg'>
						<div className='flex flex-col items-center justify-center w-full'>
							<h1 className='text-2xl font-bold text-gray-800'>התחברות</h1>
							<p className='text-sm text-gray-600'>...</p>
						</div>
						<LoginContainer />
					</div>
				</div>
			</>
		)
	)
}

export default MainPage
