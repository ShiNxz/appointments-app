import type { ISpecialDate, IWeeklyHours, IAppointments, IBreak } from '../models/User'
import moment from 'moment'
import FormatDate from './FormatDate'

const GenerateWorkingDates = (
	weeklyHours: IWeeklyHours[],
	specialDates: ISpecialDate[],
	appointments: IAppointments[],
	breaks: IBreak[]
) => {
	const dates: IWorkingDay[] = []

	const firstDayOfMonth = moment().startOf('month')
	const lastDayOfMonth = moment().endOf('month')

	for (let i = 0; i < 31; i++) {
		const currentDate = moment(firstDayOfMonth).add(i, 'days')

		// Check if current date falls within the current month
		if (!currentDate.isBetween(firstDayOfMonth, lastDayOfMonth, 'day', '[]')) {
			break
		}

		const currentDayOfWeek = currentDate.day()

		// Check if there are any special dates on the current date
		const specialDate = specialDates.find((d) => d.date === FormatDate(currentDate.toDate()))

		if (specialDate) {
			const newDate = moment(`${specialDate.date} ${specialDate.start}`, 'DD.MM.YYYY HH:mm')
			const newEndDate = moment(`${specialDate.date} ${specialDate.end}`, 'DD.MM.YYYY HH:mm')

			dates.push({
				title: specialDate.start + ' - ' + specialDate.end,
				backgroundColor: '#000080',
				borderColor: '#000060',
				start: newDate.toDate(),
				end: newEndDate.toDate(),
				allDay: true,
				appointments: appointments.filter((a) => a.date === FormatDate(currentDate.toDate())),
				breaks: breaks.filter((b) => b.day === currentDayOfWeek),
			})
		} else {
			// Check if there are any weekly hours for the current day of week
			const weeklyHoursForDay = weeklyHours.find((h) => h.day === currentDayOfWeek)

			if (weeklyHoursForDay) {
				const newDate = moment(currentDate).set({
					hour: parseInt(weeklyHoursForDay.start.split(':')[0]),
					minute: parseInt(weeklyHoursForDay.start.split(':')[1]),
				})

				const newEndDate = moment(currentDate).set({
					hour: parseInt(weeklyHoursForDay.end.split(':')[0]),
					minute: parseInt(weeklyHoursForDay.end.split(':')[1]),
				})

				dates.push({
					title: weeklyHoursForDay.start + ' - ' + weeklyHoursForDay.end,
					start: newDate.toDate(),
					end: newEndDate.toDate(),
					allDay: true,
					appointments: appointments.filter((a) => a.date === FormatDate(currentDate.toDate())),
					breaks: breaks.filter((b) => b.day === currentDayOfWeek),
				})
			}
		}

		// Check if there are any breaks for the current date
		const currentBreaks = breaks.filter((b) => b.day === currentDayOfWeek)

		if (currentBreaks.length > 0) {
			currentBreaks.forEach((b) => {
				const newDate = moment(currentDate).set({
					hour: parseInt(b.start.split(':')[0]),
					minute: parseInt(b.start.split(':')[1]),
				})

				const newEndDate = moment(currentDate).set({
					hour: parseInt(b.end.split(':')[0]),
					minute: parseInt(b.end.split(':')[1]),
				})

				dates.push({
					title: `הפסקה: ${b.start} -  ${b.end}`,
					start: newDate.toDate(),
					end: newEndDate.toDate(),
					allDay: false,
					appointments: [],
					break: true,
					breakId: b.id,
				})
			})
		}
	}

	return dates
}

interface IWorkingDay {
	title: string
	backgroundColor?: string
	borderColor?: string
	start: Date
	end: Date
	allDay: boolean
	appointments: IAppointments[]
	breaks?: IBreak[]
	break?: boolean
	breakId?: string
}

export default GenerateWorkingDates
