import type { DateSelectArg, DayCellContentArg, EventContentArg } from '@fullcalendar/core'
import type { IUser } from '@/utils/models/User'

import { useState } from 'react'

import FullCalendar from '@fullcalendar/react'
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'

import CalendarModal from './Modal'
import FormatDate from '@/utils/functions/FormatDate'
import generateTimeSlots from '@/utils/functions/TimeSlots'
import GenerateWorkingDates from '@/utils/functions/GenerateWorkingDates'
import moment from 'moment'

const renderEventContent = (eventContent: EventContentArg) => {
	return (
		<>
			<div className='fc-daygrid-event-dot'></div>
			<div className='fc-event-time'>
				{eventContent.timeText.includes(':') ? eventContent.timeText : eventContent.timeText + ':00'}
			</div>
			<div className='fc-event-title'>תור - {eventContent.event.title}</div>
		</>
	)
}

const CalendarDiv = ({ user, mutate }: IProps) => {
	const [selectedDate, setSelectedDate] = useState<Date | null>(null)

	const handleDateSelect = (arg: DateClickArg) => {
		if (!isCanSelectDate(new Date(arg.date))) return
		setSelectedDate(arg.date)
	}

	const workingDays = GenerateWorkingDates(user.weeklyHours, user.specialDates, user.appointments, user.breaks)

	const isCanSelectDate = (date: Date) =>
		(workingDays &&
			workingDays.some(
				(d) =>
					FormatDate(new Date(d.start)) === FormatDate(new Date(date)) &&
					moment(d.start).format('HH:mm') !== '00:00'
			)) ||
		false

	const avDates =
		(selectedDate &&
			workingDays &&
			workingDays.find((date) => FormatDate(new Date(date.start)) === FormatDate(new Date(selectedDate)))) ||
		null

	const renderCell = (date: DayCellContentArg) => {
		return selectedDate && FormatDate(date.date) === FormatDate(new Date(selectedDate))
			? 'bg-blue-200'
			: isCanSelectDate(new Date(date.date))
			? 'cursor-pointer bg-blue-50'
			: 'cursor-not-allowed bg-red-50'
	}

	const times =
		(avDates &&
			generateTimeSlots(avDates.start, avDates.end).filter((time) => {
				if (avDates.appointments.some((app) => app.start === time.start)) return false

				if (avDates.breaks && avDates.breaks.length > 0) {
					// Check if any of the breaks overlap with the current time slot
					for (let i = 0; i < avDates.breaks.length; i++) {
						const breakStart = moment(avDates.breaks[i].start, 'HH:mm')
						const breakEnd = moment(avDates.breaks[i].end, 'HH:mm')
						const slotStart = moment(time.start, 'HH:mm')
						const slotEnd = moment(time.end, 'HH:mm')

						if (slotStart.isBefore(breakEnd) && slotEnd.isAfter(breakStart)) {
							// The current time slot overlaps with a break, return false
							return false
						}
					}
				}

				return true
			})) ||
		null

	const apps = workingDays.reduce((acc: any, day) => {
		if (day.appointments.length === 0) return acc

		return [
			...acc,
			...day.appointments.map((app) => {
				const newDate = moment(`${app.date} ${app.start}`, 'DD.MM.YYYY HH:mm')
				return {
					start: newDate.toDate(),
					title: app.info.name || 'ללא שם',
					onClick: console.log,
				}
			}),
		]
	}, [])

	return (
		<>
			<FullCalendar
				initialView='dayGridMonth'
				plugins={[dayGridPlugin, interactionPlugin]}
				events={apps}
				selectable={true}
				headerToolbar={{
					center: '',
					right: 'title',
					left: 'prev,next today',
				}}
				buttonText={{
					today: 'היום',
				}}
				eventMaxStack={1}
				eventContent={renderEventContent}
				locale='he'
				direction='rtl'
				dateClick={handleDateSelect}
				viewClassNames='bg-white'
				dayCellClassNames={renderCell}
			/>
			<CalendarModal
				times={times}
				selectedDate={selectedDate}
				setSelectedDate={setSelectedDate}
				mutate={mutate}
			/>
		</>
	)
}

interface IProps {
	user: IUser
	mutate: () => Promise<void>
}

export default CalendarDiv
