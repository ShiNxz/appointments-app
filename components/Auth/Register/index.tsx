import type { TDay } from '@/utils/models/User'
import type { IRegisterCompany } from '@/pages/api/company/register'
import { Button, TextField } from '@mui/material'
import { useMemo, useState } from 'react'
import DaysSettings, { IDay, IState } from './DaysSettings'
import { toast } from 'react-toastify'
import moment from 'moment'
import Axios from '@/utils/functions/Axios'
import dayjs from 'dayjs'
import Cookies from 'js-cookie'
import { useRouter } from 'next/router'
import useAuth from '@/utils/hooks/useAuth'

const RegisterForm = () => {
	const router = useRouter()

	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')

	const [step, setStep] = useState(1)
	const [isLoading, setIsLoading] = useState(false)

	const { mutate } = useAuth()

	const days: IDay[] = useMemo(
		() => [
			{ name: 'Sunday', title: 'ראשון' },
			{ name: 'Monday', title: 'שני' },
			{ name: 'Tuesday', title: 'שלישי' },
			{ name: 'Wednesday', title: 'רביעי' },
			{ name: 'Thursday', title: 'חמישי' },
			{ name: 'Friday', title: 'שישי' },
			{ name: 'Saturday', title: 'שבת' },
		],
		[]
	)

	const [weeklyHours, setWeeklyHours] = useState<IState[]>(
		days.map((day) => ({ ...day, start: dayjs(), end: dayjs() }))
	)

	const handleSubmitStep1 = () => {
		if (!name) return toast.error('יש להזין שם מלא')
		if (!email) return toast.error('יש כתובת אימייל תקינה')
		if (!password) return toast.error('יש להזין סיסמא')

		if (!/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) return toast.error('כתובת האימייל אינה תקינה')
		if (password.length < 6) return toast.error('הסיסמא חייבת להכיל לפחות 6 תווים')

		setStep(2)
	}

	const handleSubmitStep2 = async () => {
		setIsLoading(true)

		if (weeklyHours?.some((day) => day.start!.isAfter(day.end!))) {
			setIsLoading(false)
			return toast.error('שעת התחלה לא יכולה להיות אחרי שעת הסיום')
		}

		if (weeklyHours?.some((day) => !day.start || !day.end)) {
			setIsLoading(false)
			return toast.error('יש לבחור שעת התחלה ושעת סיום לכל יום')
		}

		const data: IRegisterCompany = {
			name,
			email,
			password,
			weeklyHours:
				weeklyHours &&
				weeklyHours.map((day, index) => ({
					day: index as TDay,
					start: moment(day.start!.toDate(), 'HH:mm').format('HH:mm'),
					end: moment(day.end!.toDate(), 'HH:mm').format('HH:mm'),
				})),
		}

		try {
			const {
				data: { success, token },
			} = await Axios.post('/api/company/register', data)
			if (success) {
				Cookies.set('token', token, { expires: 30 })
				await mutate()
				router.push('/')
			}

			toast.success('ההרשמה הסתיימה בהצלחה, אנא המתן...')
		} catch (error) {
			toast.error('אירעה שגיאה בהרשמה')
		}

		setIsLoading(false)
	}

	return (
		<>
			<div className='flex flex-col items-center justify-center h-screen bg-slate-100'>
				<div className='flex flex-col items-center justify-center w-fit p-12 bg-white rounded-lg shadow-lg'>
					<div className='flex flex-col items-center justify-center w-full'>
						<h1 className='text-2xl font-bold text-gray-800'>הרשמה כחברה</h1>
						<p className='text-sm text-gray-600'>הזינו פרטי התקשרות ושעות פעילות על מנת להרשם כחברה</p>
					</div>
					<div className=''>
						{step === 1 && (
							<Step1
								name={name}
								setName={setName}
								email={email}
								setEmail={setEmail}
								password={password}
								setPassword={setPassword}
								handleSubmit={handleSubmitStep1}
							/>
						)}

						{step === 2 && (
							<DaysSettings
								days={days}
								state={weeklyHours}
								setState={setWeeklyHours}
								handleSubmit={handleSubmitStep2}
								isLoading={isLoading}
							/>
						)}
					</div>
				</div>
			</div>
		</>
	)
}

const Step1 = ({ name, setName, email, setEmail, password, setPassword, handleSubmit }: IStep1) => {
	return (
		<div className='flex flex-col items-center justify-center w-full gap-4 p-4 mt-4'>
			<TextField
				value={name}
				onChange={(e) => setName(e.target.value)}
				label='שם החברה'
				color='primary'
				variant='outlined'
				size='small'
				fullWidth
			/>
			<TextField
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				label='כתובת אימייל'
				color='primary'
				variant='outlined'
				size='small'
				fullWidth
			/>
			<TextField
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				label='סיסמה'
				color='primary'
				variant='outlined'
				size='small'
				type='password'
				fullWidth
			/>
			<Button
				variant='contained'
				color='primary'
				size='small'
				fullWidth
				onClick={handleSubmit}
			>
				מעבר לשלב הבא
			</Button>
		</div>
	)
}

interface IStep1 {
	name: string
	setName: (name: string) => void
	email: string
	setEmail: (email: string) => void
	password: string
	setPassword: (password: string) => void
	handleSubmit: () => void
}

export default RegisterForm
