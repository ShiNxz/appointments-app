import Head from '@/components/UI/Html/Head'
import RegisterForm from '@/components/Auth/Register'
import useAuth from '@/utils/hooks/useAuth'
import { useRouter } from 'next/router'

const MainPage = () => {
	const { isLoggedIn, isLoading } = useAuth()
	const router = useRouter()

	if (isLoggedIn) router.push('/admin')

	return (
		!isLoggedIn &&
		!isLoading && (
			<>
				<Head title='הרשמה' />
				<RegisterForm />
			</>
		)
	)
}

export default MainPage
