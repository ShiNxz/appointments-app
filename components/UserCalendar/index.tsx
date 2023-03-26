import type { DateSelectArg, EventContentArg } from '@fullcalendar/core'
import type { IAppointments, ISpecialDate, IWeeklyHours } from '@/utils/models/User'

import { useState } from 'react'

import FullCalendar from '@fullcalendar/react'
import interactionPlugin from '@fullcalendar/interaction'
import dayGridPlugin from '@fullcalendar/daygrid'
import GenerateWorkingDates from '@/utils/functions/GenerateWorkingDates'

import CalendarModal from './Modal'
import DaysSettings from './DaysSettings'

const TimesCalendar = ({ weeklyHours, specialDates, appointments, mutate }: IProps) => {
	const [selectedDate, setSelectedDate] = useState<Date | null>(null)

	const handleDateSelect = (arg: DateSelectArg) => {
		if (arg.start.getDay() + 1 !== arg.end.getDay()) return
		setSelectedDate(arg.start)
	}

	const workingDays = GenerateWorkingDates(weeklyHours, specialDates, appointments)

	return (
		<>
			<DaysSettings mutate={mutate} />
			<FullCalendar
				initialView='dayGridMonth'
				plugins={[dayGridPlugin, interactionPlugin]}
				events={workingDays}
				selectable={true}
				headerToolbar={{
					center: '',
					right: 'title',
					left: 'prev,next today',
				}}
				buttonText={{
					today: 'היום',
				}}
				locale='he'
				direction='rtl'
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
	mutate: () => Promise<void>
	weeklyHours: IWeeklyHours[]
	specialDates: ISpecialDate[]
	appointments: IAppointments[]
}

export default TimesCalendar
