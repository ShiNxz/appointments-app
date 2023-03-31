import type { DateSelectArg, EventClickArg, EventContentArg } from '@fullcalendar/core'
import type { IAppointments, IBreak, ISpecialDate, IWeeklyHours } from '@/utils/models/User'

import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'

import { useState } from 'react'
import moment from 'moment'
import GenerateWorkingDates from '@/utils/functions/GenerateWorkingDates'
import EventModal from './EventModal'
import CalendarModal from './Modal'
import BreakModal from './BreakModal'

const renderEventContent = (eventContent: EventContentArg) => {
	return eventContent.view.type === 'timeGridWeek' ? (
		<div>
			<div className='fc-event-time text-center text-slate-800'>
				{eventContent.timeText.includes(':') ? eventContent.timeText : eventContent.timeText + ':00'}
			</div>
			<div className='fc-event-title text-center text-slate-800 font-medium leading-3'>
				{eventContent.event.title}
			</div>
		</div>
	) : (
		<>
			<div className='fc-daygrid-event-dot'></div>
			<div className='fc-event-time'>
				{eventContent.timeText.includes(':') ? eventContent.timeText : eventContent.timeText + ':00'}
			</div>
			<div className='fc-event-title'>{eventContent.event.title}</div>
		</>
	)
}

const ManageCalendar = ({ weeklyHours, specialDates, appointments, breaks, mutate, manager }: IProps) => {
	const workingDays = GenerateWorkingDates(weeklyHours, specialDates, appointments, breaks)

	const [selectedEvent, setSelectedEvent] = useState<EventClickArg | null>(null)
	const [selectedBreak, setSelectedBreak] = useState<EventClickArg | null>(null)

	const [selectedDate, setSelectedDate] = useState<Date | null>(null)

	const handleDateSelect = (arg: DateSelectArg) => {
		if (arg.start.getDay() + 1 !== arg.end.getDay()) return
		setSelectedDate(arg.start)
	}

	const apps = workingDays.reduce((acc: any, day) => {
		if (day.appointments?.length === 0) return acc

		return [
			...acc,
			...day.appointments?.map((app) => {
				const newDate = moment(`${app.date} ${app.start}`, 'DD.MM.YYYY HH:mm')
				return {
					start: newDate.toDate(),
					end: newDate.add(15, 'minutes').toDate(),
					title: `תור: ${app.info.name || 'ללא שם'}`,
					appId: app.id,
				}
			}),
		]
	}, [])

	const workingHours = workingDays.map((day) => {
		return {
			start: day.start,
			end: day.end,
			title: day.break ? 'הפסקה' : 'יום עבודה',
			appId: day.break ? day.breakId : 'weekly',
			backgroundColor: day.break ? '#e7caca' : '#d6d6d6',
			displayEventEnd: true,
		}
	})

	return (
		<>
			<FullCalendar
				initialView='timeGridWeek'
				plugins={[dayGridPlugin, interactionPlugin, timeGridPlugin]}
				events={[...apps, ...workingHours]}
				selectable={true}
				slotDuration='00:10:00'
				headerToolbar={{
					center: 'title',
					right: 'timeGridWeek,dayGridMonth',
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
				eventMaxStack={5}
				eventContent={renderEventContent}
				locale='he'
				direction='rtl'
				viewClassNames='bg-white'
				eventClick={(info) =>
					manager
						? undefined
						: info.event.title !== 'יום עבודה' && info.event.title === 'הפסקה'
						? setSelectedBreak(info)
						: setSelectedEvent(info)
				}
				eventColor='#ffd99f'
				eventClassNames='cursor-pointer'
				select={manager ? undefined : handleDateSelect}
			/>
			{!manager && (
				<>
					<EventModal
						selectedEvent={selectedEvent}
						setSelectedEvent={setSelectedEvent}
						mutate={mutate}
					/>
					<BreakModal
						selectedBreak={selectedBreak}
						setSelectedBreak={setSelectedBreak}
						mutate={mutate}
					/>
					<CalendarModal
						selectedDate={selectedDate}
						setSelectedDate={setSelectedDate}
						mutate={mutate}
					/>
				</>
			)}
		</>
	)
}

interface IProps {
	weeklyHours: IWeeklyHours[]
	specialDates: ISpecialDate[]
	appointments: IAppointments[]
	breaks: IBreak[]
	mutate: () => Promise<any>
	manager?: boolean
}

export default ManageCalendar
