import Head from '@/components/UI/Html/Head'
import RegisterForm from '@/components/Auth/Register'
import useAuth from '@/utils/hooks/useAuth'
import { useRouter } from 'next/router'

const MainPage = () => {
	const { isLoggedIn } = useAuth()
	const router = useRouter()

	if (isLoggedIn) return router.push('/')

	return (
		<>
			<Head title='הרשמה' />
			<RegisterForm />
		</>
	)
}

export default MainPage
