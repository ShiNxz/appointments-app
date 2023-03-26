import type { DateSelectArg, DayCellContentArg, EventContentArg } from '@fullcalendar/core'
import type { IAppointment } from '@/utils/models/Appointment'
import type { IUser } from '@/utils/models/User'

import { useState } from 'react'

import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'

import CalendarModal from './Modal'
import FormatDate from '@/utils/functions/FormatDate'
import generateTimeSlots from '@/utils/functions/TimeSlots'
import GetUserEvents from '@/utils/functions/Events'

const renderEventContent = (eventContent: EventContentArg) => {
	return (
		<div className='overflow-hidden bg-blue-200 rounded-lg p-2'>
			<b className='mx-1'>{eventContent.timeText}</b>
			<i className='p-2'>{eventContent.event.title}</i>
		</div>
	)
}

const CalendarDiv = ({ user, mutate }: IProps) => {
	const [selectedDate, setSelectedDate] = useState<Date | null>(null)

	const handleDateSelect = (arg: DateSelectArg) => {
		if (arg.start.getDay() + 1 !== arg.end.getDay()) return
		if (!isCanSelectDate(new Date(arg.start))) return
		setSelectedDate(arg.start)
	}

	const apps = GetUserEvents(user.dates)

	// todo also check if there are free slots
	const isCanSelectDate = (date: Date) =>
		(user && user.dates.some((d) => FormatDate(new Date(d.date)) === FormatDate(new Date(date)))) || false

	const avDates =
		(selectedDate &&
			user &&
			user.dates.find((date) => FormatDate(new Date(date.date)) === FormatDate(new Date(selectedDate)))) ||
		null

	const renderCell = (date: DayCellContentArg) => {
		return selectedDate && FormatDate(date.date) === FormatDate(new Date(selectedDate))
			? 'bg-blue-200'
			: isCanSelectDate(new Date(date.date))
			? 'cursor-pointer bg-blue-50'
			: 'cursor-not-allowed bg-red-50'
	}

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
				locale={'he'}
				direction='rtl'
				timeZone='local'
				select={handleDateSelect}
				viewClassNames='bg-white'
				dayCellClassNames={renderCell}
			/>
			<CalendarModal
				times={
					(avDates &&
						generateTimeSlots(avDates.start, avDates.end).filter(
							(time) => !avDates.appointments.some((app) => app.start === time.start)
						)) ||
					null
				}
				selectedDate={selectedDate}
				setSelectedDate={setSelectedDate}
				mutate={mutate}
			/>
		</>
	)
}

interface IProps {
	user: IUser
	appointments: IAppointment[]
	mutate: () => Promise<void>
}

export default CalendarDiv
