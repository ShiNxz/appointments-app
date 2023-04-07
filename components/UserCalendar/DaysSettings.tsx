import type { IBreak, IWeeklyHours, TDay } from '@/utils/models/User'
import { useEffect, useMemo, useState } from 'react'
import { TimeField } from '@mui/x-date-pickers'
import { toast } from 'react-toastify'
import { Button, Switch } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import Axios from '@/utils/functions/Axios'
import moment from 'moment'

const DaysSettings = ({ mutate, weeklyHours, companyWeeklyHours, breaks }: IProps) => {
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
			return setState(days.map((day) => ({ ...day, start: null, end: null, disabled: false, breaks: [] })))

		const newState = days.map((day, index) => {
			const dayHours = weeklyHours.find((dayHour) => dayHour.day === index)
			if (!dayHours) return { ...day, start: null, end: null, disabled: false, breaks: [] }

			return {
				...day,
				start: dayHours?.start ? dayjs(dayHours.start, 'HH:mm') : null,
				end: dayHours?.end ? dayjs(dayHours.end, 'HH:mm') : null,
				disabled: dayHours.disabled,
				breaks:
					breaks
						?.filter((breakItem) => breakItem.day === index)
						?.map((b) => ({
							day: index as TDay,
							id: b.id,
							start: dayjs(b.start, 'HH:mm'),
							end: dayjs(b.end, 'HH:mm'),
						})) || [],
			}
		})

		setState(newState)
	}, [days, weeklyHours, breaks])

	const handleSubmit = async () => {
		setIsLoading(true)

		if (!state) return toast.error('לא נמצאו זמני עבודה')

		if (state?.filter((s) => !s.disabled).some((day) => !day.start || day.start.isAfter(day.end!))) {
			setIsLoading(false)
			return toast.error('שעת התחלה לא יכולה להיות אחרי שעת הסיום')
		}

		if (state?.filter((s) => !s.disabled).some((day) => !day.start || !day.end)) {
			setIsLoading(false)
			return toast.error('יש לבחור שעת התחלה ושעת סיום לכל יום')
		}

		if (!companyWeeklyHours) return toast.error('לא נמצאו זמני עבודה לחברה')

		// check if the user didnt choose hours that above or below the company hours
		if (
			state.some((day, i) => {
				if (day.disabled) return false

				if (
					!day.start ||
					day.start.isBefore(dayjs(companyWeeklyHours[i].start, 'HH:mm')) ||
					!day.end ||
					day.end.isAfter(dayjs(companyWeeklyHours[i].end, 'HH:mm'))
				)
					return true

				return false
			})
		) {
			setIsLoading(false)
			return toast.error('הזמנים שבחרת חורגים מזמני העבודה של החברה')
		}

		const newBreaks: IBreak[] = []

		state
			.map((s, day) => ({ ...s, day }))
			.forEach((s) => {
				if (s.disabled) return
				if (s.breaks?.length === 0) return

				s.breaks?.forEach((b) => {
					const id = Math.random().toString(36).substr(2, 9)
					if (!b.start || !b.end) return
					return newBreaks.push({
						id,
						day: s.day as TDay,
						start: b.start.format('HH:mm'),
						end: b.end.format('HH:mm'),
					})
				})
			})

		setIsLoading(false)

		const data: { days: IWeeklyHours[]; breaks: IBreak[] } = {
			days: state.map((day, index) => ({
				day: index as TDay,
				start: moment(day.start!.toDate(), 'HH:mm').format('HH:mm'),
				end: moment(day.end!.toDate(), 'HH:mm').format('HH:mm'),
				disabled: day.disabled,
			})),
			breaks: newBreaks || [],
		}

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

	const handleChangeBreak = (dayIndex: number, index: number, type: 'start' | 'end', value: Dayjs | null) => {
		if (!state) return

		setState((prevState) => {
			const newState = [...prevState!]
			newState[dayIndex].breaks![index][type] = value
			return newState
		})
	}

	const handleAddBreak = (day: number) => {
		if (!state) return

		setState((prevState) => {
			const newState = [...prevState!]
			newState[day].breaks?.push({
				start: null,
				end: null,
				id: Math.random().toString(36).substr(2, 9),
				day: day as TDay,
			})
			return newState
		})

		console.log(state)
	}

	const handleRemoveBreak = (day: number, index: number) => {
		if (!state) return

		setState((prevState) => {
			const newState = [...prevState!]
			newState[day].breaks?.splice(index, 1)
			return newState
		})
	}

	return (
		<div className='flex flex-col gap-4 mb-12'>
			{days.map((day, dayIndex) => (
				<>
					<div
						className='flex flex-row items-center gap-4 mb-2'
						key={day.name}
					>
						<div className='w-18'>{day.title}</div>
						<TimeField
							label='שעת התחלה'
							value={(state && state[dayIndex].start) || null}
							onChange={(newVal) => handleChangeTime(dayIndex, 'start', newVal as Dayjs | null)}
							format='HH:mm'
							minutesStep={5}
							disabled={(state && state[dayIndex].disabled) || isLoading}
						/>
						<TimeField
							label='שעת סיום'
							value={(state && state[dayIndex].end) || null}
							onChange={(newVal) => handleChangeTime(dayIndex, 'end', newVal as Dayjs | null)}
							format='HH:mm'
							disabled={(state && state[dayIndex].disabled) || isLoading}
						/>
						<Switch
							checked={(state && !state[dayIndex].disabled) || false}
							onChange={(_, newValue) =>
								setState((prevState) => {
									const newState = [...prevState!]
									newState[dayIndex] = {
										...newState[dayIndex],
										start: null,
										end: null,
										disabled: !newValue,
									}
									return newState
								})
							}
						/>
					</div>
					{state &&
						state[dayIndex].breaks?.map((b, index) => (
							<div
								className='flex flex-row items-center gap-4'
								key={b.id}
							>
								<TimeField
									label='שעת התחלה'
									value={b.start || null}
									onChange={(newVal) => handleChangeBreak(dayIndex, index, 'start', newVal)}
									format='HH:mm'
									minutesStep={5}
									color='secondary'
									size='small'
									disabled={(state && state[dayIndex].disabled) || isLoading}
								/>
								<TimeField
									label='שעת סיום'
									value={b.end || null}
									onChange={(newVal) =>
										handleChangeBreak(dayIndex, index, 'end', newVal as Dayjs | null)
									}
									format='HH:mm'
									color='secondary'
									size='small'
									disabled={(state && state[dayIndex].disabled) || isLoading}
								/>
								<Button
									variant='contained'
									color='secondary'
									size='small'
									onClick={() => handleRemoveBreak(dayIndex, index)}
								>
									מחיקת הפסקה
								</Button>
							</div>
						))}
					<Button
						variant='contained'
						color='info'
						size='small'
						onClick={() => handleAddBreak(dayIndex)}
						disabled={(state && state[dayIndex].disabled) || isLoading}
						className='mb-2 !w-auto'
					>
						הוספת הפסקה
					</Button>
				</>
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
	companyWeeklyHours: IWeeklyHours[] | null
	breaks: IBreak[] | null
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
	breaks: INewBreak[] | null
}

interface INewBreak {
	id: string
	day: TDay
	start: Dayjs | null
	end: Dayjs | null
}

export default DaysSettings
