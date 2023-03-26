import type { IAvailableDate } from '../models/User'
import moment from 'moment'

const GetUserEvents = (avDates: IAvailableDate[]) => {
	const apps: IApp[] = []

	avDates
		.sort((a, b) => parseInt(a.start) - parseInt(b.start))
		.map((avDate) => {
			avDate.appointments.map((app) => {
				const startTime = app.start
				const title = `פגישה עם ${app.appointment.name}`

				const newDate = moment(avDate.date).set({
					hour: parseInt(startTime.split(':')[0]),
					minute: parseInt(startTime.split(':')[1]),
				})

				console.log(newDate.toDate())
				return apps.push({
					title,
					date: newDate.toDate(),
				})
			})
		})

	return apps
}

interface IApp {
	title: string
	date: Date
}

export default GetUserEvents
