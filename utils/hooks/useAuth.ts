import type { IAuthUser } from '@/pages/api/auth'
import useSWR from 'swr'
import cookie from 'js-cookie'
import { useRouter } from 'next/navigation'
import fetcher from '../functions/Fetcher'

const useAuth = (): IAuth => {
	const router = useRouter()

	const { data, mutate, error } = useSWR('/api/auth', fetcher)

	const isLoading = !data && !error
	const isLoggedIn = !!data?.name && !error

	const logout = async () => {
		cookie.remove('token')
		router.push('/')
		await mutate()
	}

	return { isLoading, isLoggedIn, user: data, mutate, logout }
}

interface IAuth {
	isLoading: boolean
	isLoggedIn: boolean
	user: IAuthUser
	mutate: () => Promise<void>
	logout: () => void
}

export default useAuth
