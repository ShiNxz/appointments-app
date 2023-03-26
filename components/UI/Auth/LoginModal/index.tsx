import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import { useState } from 'react'
import Axios from '@/utils/functions/Axios'
import Cookies from 'js-cookie'
import useAuth from '@/utils/hooks/useAuth'
import { toast } from 'react-toastify'

const LoginModal = ({ loginModal, setLoginModal }: IProps) => {
	const { mutate } = useAuth()

	const [isLoading, setIsLoading] = useState(false)
	const [phone, setPhone] = useState('')
	const [password, setPassword] = useState('')

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		if (phone.length < 7 || password.length < 1) return toast.error('חלק מהפרטים חסרים')

		setIsLoading(true)

		const loginData = {
			phone,
			password,
		}

		try {
			const { data } = await Axios.post('/api/auth/login', loginData)
			toast.success('התחברת בהצלחה!')
			Cookies.set('token', data.token, { expires: 7 })
			await mutate()
			setLoginModal(false)
		} catch (error) {
			toast.error('אחד או יותר מהפרטים שגוי!')
		}
		setIsLoading(false)
	}

	return (
		<Dialog
			open={loginModal}
			onClose={isLoading ? undefined : () => setLoginModal(false)}
			fullWidth
		>
			<DialogTitle>התחברות</DialogTitle>
			<DialogContent>
				<form
					onSubmit={handleSubmit}
					className='flex flex-col'
				>
					<TextField
						id='phone'
						label='מספר טלפון'
						variant='outlined'
						onChange={(e) => setPhone(e.target.value)}
						value={phone}
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
			</DialogContent>
			<DialogActions>
				<Button
					onClick={() => setLoginModal(false)}
					disabled={isLoading}
				>
					ביטול
				</Button>
			</DialogActions>
		</Dialog>
	)
}

interface IProps {
	loginModal: boolean
	setLoginModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default LoginModal
