import type { EventClickArg, EventContentArg } from '@fullcalendar/core'
import type { IAppointments, ISpecialDate, IWeeklyHours } from '@/utils/models/User'

import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

import { useState } from 'react'
import moment from 'moment'
import GenerateWorkingDates from '@/utils/functions/GenerateWorkingDates'
import EventModal from './EventModal'

const renderEventContent = (eventContent: EventContentArg) => {
	return eventContent.view.type === 'timeGridWeek' ? (
		<div>
			<div className='fc-event-time text-center text-slate-800'>
				{eventContent.timeText.includes(':') ? eventContent.timeText : eventContent.timeText + ':00'}
			</div>
			<div className='fc-event-title text-center text-slate-800 font-medium leading-3'>
				תור - {eventContent.event.title}
			</div>
		</div>
	) : (
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
					end: newDate.add(15, 'minutes').toDate(),
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
				plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
				events={apps}
				selectable={true}
				slotDuration='00:10:00'
				headerToolbar={{
					center: 'title',
					right: 'dayGridMonth,timeGridWeek',
					left: 'prev,next today',
				}}
				slotMinTime='06:00:00'
				slotMaxTime='23:00:00'
				allDayText='כל היום'
				buttonText={{
					today: 'היום',
					week: 'שבועי',
					month: 'חודשי',
				}}
				slotLabelFormat={[{ hour: '2-digit', minute: '2-digit', hour12: false }]}
				eventMaxStack={1}
				eventContent={renderEventContent}
				locale='he'
				direction='rtl'
				viewClassNames='bg-white'
				eventClick={(info) => {
					setSelectedEvent(info)
				}}
				eventColor='#ffd99f'
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
