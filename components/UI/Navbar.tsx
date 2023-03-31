// import logo from '@/assets/logo.png'
import useAuth from '@/utils/hooks/useAuth'
import { Button } from '@mui/material'
import { useState } from 'react'
import LoginModal from '../Auth/LoginModal'
import { useRouter } from 'next/router'

const Navbar = () => {
	return (
		<div className='bg-white text-slate-800 flex flex-row p-2 items-center justify-between'>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={'https://www.genuitgroup.com/wp-content/themes/genuit/assets/images/logo-placeholder.png'}
				className='w-10 h-10 rounded-lg'
				alt='logo'
			/>
			<UserBlock />
		</div>
	)
}

const UserBlock = () => {
	const { logout, user, isLoggedIn } = useAuth()
	const [loginModal, setLoginModal] = useState(false)
	const handleLogin = () => setLoginModal(true)
	const router = useRouter()

	return (
		<div className='flex flex-row'>
			{isLoggedIn ? (
				<>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img
						src={'https://cdn-icons-png.flaticon.com/512/147/147144.png?w=360'}
						className='w-10 h-10'
						alt='logo'
					/>

					<div className='mr-2 flex flex-col'>
						<span className='text-sm font-medium'>
							{user.name} / {user.company.name}
						</span>
						<span
							className='text-sm text-slate-700 hover:text-slate-800 hover:underline cursor-pointer'
							onClick={logout}
						>
							התנתק
						</span>
					</div>
				</>
			) : (
				<>
					<Button
						variant='contained'
						color='primary'
						onClick={handleLogin}
						className='!mx-2'
					>
						התחברות
					</Button>
					<Button
						variant='contained'
						color='secondary'
						onClick={() => router.push('/register')}
						className='!mx-2'
					>
						הרשמה כחברה
					</Button>
					<LoginModal
						loginModal={loginModal}
						setLoginModal={setLoginModal}
					/>
				</>
			)}
		</div>
	)
}

export default Navbar
