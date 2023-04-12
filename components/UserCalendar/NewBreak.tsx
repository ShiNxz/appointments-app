import type { TDay } from '@/utils/models/User'
import type { Dayjs } from 'dayjs'
import type { IBreakData } from '@/pages/api/admin/user/breaks'
import { Button, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'
import { useState } from 'react'
import { TimeField } from '@mui/x-date-pickers'
import { toast } from 'react-toastify'
import Axios from '@/utils/functions/Axios'

// OUTDATED COMPONENT
const NewBreak = () => {
	const days = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת']

	const [isLoading, setIsLoading] = useState(false)

	const [day, setDay] = useState<TDay>(0)
	const [start, setStart] = useState<Dayjs | null>(null)
	const [end, setEnd] = useState<Dayjs | null>(null)

	const handleChangeDay = (event: SelectChangeEvent<TDay>) => setDay(event.target.value as TDay)

	const handleSubmit = async () => {
		setIsLoading(true)

		if (!start || !end) {
			setIsLoading(false)
			return toast.error('יש לבחור שעת התחלה ושעת סיום לכל יום')
		}

		if (start.isAfter(end)) {
			setIsLoading(false)
			return toast.error('שעת התחלה לא יכולה להיות אחרי שעת הסיום')
		}

		const data: IBreakData = {
			day,
			start: start.format('HH:mm'),
			end: end.format('HH:mm'),
		}

		try {
			await Axios.post('/api/admin/user/breaks', data)

			toast.success('ההפסקה נקבעה בהצלחה!')
		} catch (error) {
			toast.error('אירעה שגיאה בעת קביעת ההפסקה')
		}

		setIsLoading(false)
	}

	return (
		<>
			<FormControl
				disabled={isLoading}
				className='w-52'
			>
				<InputLabel id='time-select-label'>יום</InputLabel>
				<Select
					labelId='time-select-label'
					id='time-select'
					// @ts-ignore
					value={day}
					disabled={isLoading}
					label='שעה'
					renderValue={(time) => days[day]}
					onChange={handleChangeDay}
				>
					{days.map((day, index) => (
						<MenuItem
							key={index}
							value={index}
						>
							{day}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<div className='flex flex-row items-center gap-4 my-4'>
				<TimeField
					label='שעת התחלה'
					value={start}
					onChange={(newVal) => setStart(newVal as Dayjs)}
					format='HH:mm'
					minutesStep={5}
					disabled={isLoading}
				/>
				<TimeField
					label='שעת סיום'
					value={end}
					onChange={(newVal) => setEnd(newVal as Dayjs)}
					format='HH:mm'
					disabled={isLoading}
				/>
			</div>
			<Button
				variant='contained'
				color='primary'
				onClick={handleSubmit}
				className='self-start'
				disabled={isLoading}
			>
				{isLoading ? 'אנא המתן...' : 'שמור שינויים'}
			</Button>
		</>
	)
}

export default NewBreak
