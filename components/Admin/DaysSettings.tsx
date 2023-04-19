import type { IWeeklyHours, TDay } from '@/utils/models/User'
import { useEffect, useMemo, useState } from 'react'
import { TimeField } from '@mui/x-date-pickers'
import { toast } from 'react-toastify'
import { Button, Switch } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import Axios from '@/utils/functions/Axios'
import moment from 'moment'

const DaysSettings = ({ mutate, weeklyHours }: IProps) => {
	const [isLoading, setIsLoading] = useState(false)

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

	const [state, setState] = useState<IState[] | null>(null)

	useEffect(() => {
		if (!weeklyHours) return

		if (weeklyHours.length === 0)
			return setState(days.map((day) => ({ ...day, start: dayjs(), end: dayjs(), disabled: false })))

		const newState = days.map((day, index) => {
			const dayHours = weeklyHours.find((dayHour) => dayHour.day === index)
			return {
				...day,
				start: dayHours?.start ? dayjs(dayHours.start, 'HH:mm') : null,
				end: dayHours?.end ? dayjs(dayHours.end, 'HH:mm') : null,
				disabled: dayHours?.disabled || false,
			}
		})

		setState(newState)
	}, [days, weeklyHours])

	const handleSubmit = async () => {
		setIsLoading(true)
		console.log(state)
		if (state?.some((day) => !day.disabled && day.start!.isAfter(day.end!))) {
			setIsLoading(false)
			return toast.error('שעת התחלה לא יכולה להיות אחרי שעת הסיום')
		}

		if (state?.some((day) => !day.disabled && (!day.start || !day.end))) {
			setIsLoading(false)
			return toast.error('יש לבחור שעת התחלה ושעת סיום לכל יום')
		}

		const data: IWeeklyHours[] | null =
			state &&
			state.map((day, index) => ({
				day: index as TDay,
				start: day.disabled ? '' : moment(day.start!.toDate(), 'HH:mm').format('HH:mm'),
				end: day.disabled ? '' : moment(day.end!.toDate(), 'HH:mm').format('HH:mm'),
				disabled: day.disabled || false,
			}))

		try {
			await Axios.put('/api/admin/company', data)

			toast.success('זמני העבודה של החברה נקבעו בהצלחה')
			await mutate()
		} catch (error) {
			toast.error('אירעה שגיאה בעת קביעת זמני העבודה')
		}

		setIsLoading(false)
	}

	const handleChangeTime = (index: number, type: 'start' | 'end', value: Dayjs | null) => {
		if (!state) return

		setState((prevState) => {
			const newState = [...prevState!]
			newState[index][type] = value
			newState
				.filter((day) => !day[type]?.isValid() && !day.disabled)
				.forEach((day) => {
					day[type] = value
				})
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
						value={state && state[index].start}
						onChange={(newVal) => handleChangeTime(index, 'start', newVal as Dayjs | null)}
						format='HH:mm'
						minutesStep={5}
						disabled={isLoading || (state && state[index].disabled) || false}
					/>
					<TimeField
						label='שעת סיום'
						value={state && state[index].end}
						onChange={(newVal) => handleChangeTime(index, 'end', newVal as Dayjs | null)}
						format='HH:mm'
						disabled={isLoading || (state && state[index].disabled) || false}
					/>
					<Switch
						checked={(state && !state[index].disabled) || false}
						onChange={(_, newValue) =>
							setState((prevState) => {
								const newState = [...prevState!]
								newState[index] = { ...newState[index], start: null, end: null, disabled: !newValue }
								return newState
							})
						}
					/>
				</div>
			))}
			<Button
				variant='contained'
				color='primary'
				onClick={handleSubmit}
				className='self-start'
				disabled={isLoading}
			>
				{isLoading ? 'אנא המתן...' : 'שמור שינויים'}
			</Button>
		</div>
	)
}

interface IProps {
	weeklyHours: IWeeklyHours[] | null
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
	disabled: boolean
}

export default DaysSettings
