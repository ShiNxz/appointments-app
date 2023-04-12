import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { useState } from 'react'
import Axios from '@/utils/functions/Axios'
import Cookies from 'js-cookie'
import useAuth from '@/utils/hooks/useAuth'
import { toast } from 'react-toastify'

const LoginModal = ({ loginModal, setLoginModal }: IProps) => {
	return (
		<Dialog
			open={loginModal}
			onClose={() => setLoginModal(false)}
			fullWidth
		>
			<DialogTitle>התחברות</DialogTitle>
			<DialogContent>
				<LoginContainer setLoginModal={setLoginModal} />
			</DialogContent>
			<DialogActions>
				<Button onClick={() => setLoginModal(false)}>ביטול</Button>
			</DialogActions>
		</Dialog>
	)
}

export const LoginContainer = ({ setLoginModal }: ILoginContainerProps) => {
	const { mutate } = useAuth()

	const [isLoading, setIsLoading] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (email.length < 7 || password.length < 1) return toast.error('חלק מהפרטים חסרים')

		setIsLoading(true)

		const loginData = {
			email,
			password,
		}

		try {
			const { data } = await Axios.post('/api/auth/login', loginData)
			toast.success('התחברת בהצלחה!')
			Cookies.set('token', data.token, { expires: 7 })
			await mutate()
			setLoginModal && setLoginModal(false)
		} catch (error) {
			toast.error('אחד או יותר מהפרטים שגוי!')
		}
		setIsLoading(false)
	}

	return (
		<form
			onSubmit={handleSubmit}
			className='flex flex-col'
		>
			<TextField
				id='email'
				label='אימייל'
				variant='outlined'
				onChange={(e) => setEmail(e.target.value)}
				value={email}
				margin='normal'
				type='text'
				disabled={isLoading}
			/>

			<TextField
				id='password'
				label='סיסמה'
				variant='outlined'
				onChange={(e) => setPassword(e.target.value)}
				value={password}
				margin='normal'
				type='password'
				disabled={isLoading}
			/>

			<div className='my-2' />

			<Button
				className='!w-full my-4'
				disabled={isLoading}
				type='submit'
				color='secondary'
				variant='contained'
				size='medium'
			>
				{isLoading ? 'אנא המתן...' : 'התחברות'}
			</Button>
		</form>
	)
}

interface ILoginContainerProps {
	setLoginModal?: React.Dispatch<React.SetStateAction<boolean>>
}

interface IProps {
	loginModal: boolean
	setLoginModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default LoginModal
