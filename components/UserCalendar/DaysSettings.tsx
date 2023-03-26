import type { IWeeklyHours, TDay } from '@/utils/models/User'
import { useState } from 'react'
import { TimeField } from '@mui/x-date-pickers'
import dayjs, { Dayjs } from 'dayjs'
import Axios from '@/utils/functions/Axios'
import { toast } from 'react-toastify'
import { Button } from '@mui/material'
import moment from 'moment'

const DaysSettings = ({ mutate }: IProps) => {
	const [isLoading, setIsLoading] = useState(false)

	const days: IDay[] = [
		{ name: 'Sunday', title: 'ראשון' },
		{ name: 'Monday', title: 'שני' },
		{ name: 'Tuesday', title: 'שלישי' },
		{ name: 'Wednesday', title: 'רביעי' },
		{ name: 'Thursday', title: 'חמישי' },
		{ name: 'Friday', title: 'שישי' },
		{ name: 'Saturday', title: 'שבת' },
	]

	const [state, setState] = useState<IState[]>(days.map((day) => ({ ...day, start: dayjs(), end: dayjs() })))

	const handleSubmit = async () => {
		setIsLoading(true)

		if (state?.some((day) => day.start!.isAfter(day.end!))) {
			setIsLoading(false)
			return toast.error('שעת התחלה לא יכולה להיות אחרי שעת הסיום')
		}

		if (state?.some((day) => !day.start || !day.end)) {
			setIsLoading(false)
			return toast.error('יש לבחור שעת התחלה ושעת סיום לכל יום')
		}

		const data: IWeeklyHours[] = state.map((day, index) => ({
			day: index as TDay,
			start: moment(day.start!.toDate(), 'HH:mm').format('HH:mm'),
			end: moment(day.end!.toDate(), 'HH:mm').format('HH:mm'),
		}))

		try {
			await Axios.put('/api/admin/user/times', data)

			toast.success('זמני העבודה נקבעו בהצלחה')
			await mutate()
		} catch (error) {
			toast.error('אירעה שגיאה בעת קביעת זמני העבודה')
		}

		setIsLoading(false)
	}

	const handleChangeTime = (index: number, type: 'start' | 'end', value: Dayjs | null) => {
		setState((prevState) => {
			const newState = [...prevState]
			newState[index][type] = value
			return newState
		})
	}

	return (
		<div className='flex flex-col gap-4 mb-12'>
			{days.map((day, index) => (
				<div
					className='flex flex-row items-center gap-4'
					key={day.name}
				>
					<div className='w-20'>{day.title}</div>
					<TimeField
						label='שעת התחלה'
						value={state[index].start}
						onChange={(newVal) => handleChangeTime(index, 'start', newVal as Dayjs | null)}
						format='HH:mm'
					/>
					<TimeField
						label='שעת סיום'
						value={state[index].end}
						onChange={(newVal) => handleChangeTime(index, 'end', newVal as Dayjs | null)}
						format='HH:mm'
					/>
				</div>
			))}
			<Button
				variant='contained'
				color='primary'
				onClick={handleSubmit}
				disabled={isLoading}
				className='self-start'
			>
				{isLoading ? 'אנא המתן...' : 'שמור שינויים'}
			</Button>
		</div>
	)
}

interface IProps {
	mutate: () => Promise<void>
}

interface IDay {
	name: string
	title: string
}

interface IState {
	name: string
	title: string
	start: Dayjs | null
	end: Dayjs | null
}

export default DaysSettings
