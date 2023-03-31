import type { IRegisterWorker } from '@/pages/api/admin/workers'
import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import Axios from '@/utils/functions/Axios'

const CreateWorker = ({ mutate }: IProps) => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [isLoading, setIsLoading] = useState(false)

	const handleSubmit = async () => {
		setIsLoading(true)

		const data: IRegisterWorker = {
			name,
			email,
			password,
		}

		try {
			const {
				data: { success, token },
			} = await Axios.post('/api/admin/workers', data)
			if (success) {
				await mutate()
				toast.success('המשתמש נוצר בהצלחה!')
			}
		} catch (error) {
			toast.error('אירעה שגיאה ביצירת המשתמש')
		}

		setIsLoading(false)
	}

	return (
		<div className='flex flex-col items-center justify-center gap-4 mb-12 mt-4 w-96'>
			<TextField
				value={name}
				onChange={(e) => setName(e.target.value)}
				label='שם העובד'
				color='primary'
				variant='outlined'
				size='small'
				disabled={isLoading}
				fullWidth
			/>
			<TextField
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				label='כתובת אימייל'
				color='primary'
				variant='outlined'
				size='small'
				disabled={isLoading}
				fullWidth
			/>
			<TextField
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				label='סיסמה'
				color='primary'
				variant='outlined'
				size='small'
				disabled={isLoading}
				fullWidth
			/>
			<Button
				variant='contained'
				color='primary'
				size='small'
				fullWidth
				onClick={handleSubmit}
				disabled={isLoading}
			>
				צור משתמש
			</Button>
		</div>
	)
}

interface IProps {
	mutate: () => Promise<void>
}

export default CreateWorker
