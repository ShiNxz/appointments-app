import type { EventClickArg, EventContentArg } from '@fullcalendar/core'
import type { IAppointments, ISpecialDate, IWeeklyHours } from '@/utils/models/User'

import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'

import GenerateWorkingDates from '@/utils/functions/GenerateWorkingDates'
import moment from 'moment'
import { useState } from 'react'
import EventModal from './EventModal'

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

const ManageCalendar = ({ weeklyHours, specialDates, appointments, mutate }: IProps) => {
	const workingDays = GenerateWorkingDates(weeklyHours, specialDates, appointments)

	const [selectedEvent, setSelectedEvent] = useState<EventClickArg | null>(null)

	const apps = workingDays.reduce((acc: any, day) => {
		if (day.appointments.length === 0) return acc

		return [
			...acc,
			...day.appointments.map((app) => {
				const newDate = moment(`${app.date} ${app.start}`, 'DD.MM.YYYY HH:mm')
				return {
					start: newDate.toDate(),
					title: app.info.name || 'ללא שם',
					appId: app.id,
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
				viewClassNames='bg-white'
				eventClick={(info) => {
					setSelectedEvent(info)
				}}
				eventClassNames='cursor-pointer'
			/>
			<EventModal
				selectedEvent={selectedEvent}
				setSelectedEvent={setSelectedEvent}
				mutate={mutate}
			/>
		</>
	)
}

interface IProps {
	weeklyHours: IWeeklyHours[]
	specialDates: ISpecialDate[]
	appointments: IAppointments[]
	mutate: () => Promise<any>
}

export default ManageCalendar
