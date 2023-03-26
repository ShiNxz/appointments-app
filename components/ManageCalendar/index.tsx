import type { DateSelectArg, EventContentArg } from '@fullcalendar/core'
import type { IAvailableDate } from '@/utils/models/User'

import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react'

import GetUserEvents from '@/utils/functions/Events'

const renderEventContent = (eventContent: EventContentArg) => {
	console.log(eventContent.event)
	return (
		<div className='overflow-hidden bg-blue-200 rounded-lg p-2'>
			<b className='mx-1'>{eventContent.timeText}</b>
			<i className='p-2'>{eventContent.event.title}</i>
		</div>
	)
}

const ManageCalendar = ({ dates }: IProps) => {
	const handleDateSelect = (arg: DateSelectArg) => {}

	const apps = GetUserEvents(dates)

	return (
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
		/>
	)
}

interface IProps {
	dates: IAvailableDate[]
}

export default ManageCalendar
