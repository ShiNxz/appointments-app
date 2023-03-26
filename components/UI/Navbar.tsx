// import logo from '@/assets/logo.png'
import useAuth from '@/utils/hooks/useAuth'
import { Button } from '@mui/material'
import { useState } from 'react'
import LoginModal from './Auth/LoginModal'

const Navbar = () => {
	return (
		<div className='bg-white text-slate-800 flex flex-row p-2 items-center justify-between'>
			<UserBlock />
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={'https://www.genuitgroup.com/wp-content/themes/genuit/assets/images/logo-placeholder.png'}
				className='w-10 h-10 rounded-lg'
				alt='logo'
			/>
		</div>
	)
}

const UserBlock = () => {
	const { logout, user, isLoggedIn } = useAuth()

	const [loginModal, setLoginModal] = useState(false)
	const handleLogin = () => setLoginModal(true)

	return (
		<div className='flex flex-row'>
			{/* eslint-disable-next-line @next/next/no-img-element */}
			<img
				src={'https://www.genuitgroup.com/wp-content/themes/genuit/assets/images/logo-placeholder.png'}
				className='w-10 h-10'
				alt='logo'
			/>
			{isLoggedIn ? (
				<div className='mr-2 flex flex-col'>
					<span className='text-sm font-medium'>
						{user.name} / {user.phone}
					</span>
					<span
						className='text-sm text-slate-700 hover:text-slate-800 hover:underline cursor-pointer'
						onClick={logout}
					>
						התנתק
					</span>
				</div>
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
