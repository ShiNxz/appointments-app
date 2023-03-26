import type { DateSelectArg } from '@fullcalendar/core'
import type { IAvailableDate } from '@/utils/models/User'

import { useState } from 'react'

import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import FullCalendar from '@fullcalendar/react'

import CalendarModal from './Modal'
import FormatDate from '@/utils/functions/FormatDate'

const renderEventContent = (eventContent: any) => (
	<>
		<b>{eventContent.timeText}</b>
		<i className='p-2'>{eventContent.event.title}</i>
	</>
)

const TimesCalendar = ({ avDates, mutate }: IProps) => {
	const [selectedDate, setSelectedDate] = useState<Date | null>(null)

	const handleDateSelect = (arg: DateSelectArg) => {
		if (arg.start.getDay() + 1 !== arg.end.getDay()) return
		setSelectedDate(arg.start)
	}

	const newTimes = avDates.map((avDate) => ({
		title: `${avDate.end} - ${avDate.start}`,
		date: FormatDate(new Date(avDate.date)),
	}))

	return (
		<>
			<FullCalendar
				initialView='dayGridMonth'
				plugins={[dayGridPlugin, interactionPlugin]}
				events={newTimes}
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
				timeZone='Europe/Jerusalem'
				select={handleDateSelect}
				viewClassNames={'bg-white'}
			/>
			<CalendarModal
				selectedDate={selectedDate}
				setSelectedDate={setSelectedDate}
				mutate={mutate}
			/>
		</>
	)
}

interface IProps {
	avDates: IAvailableDate[]
	mutate: () => Promise<void>
}

export default TimesCalendar
