import moment from 'moment'
import { IAppointments } from '../models/User'

const GetUserAppointments = (appointments: IAppointments[]) => {
	const newAppointments: IApp[] = []

	appointments
		.sort((a, b) => parseInt(a.start) - parseInt(b.start)) // Sort by start time
		.sort((a, b) => parseInt(a.date) - parseInt(b.date)) // Sort by date, todo check if it works and if not convert it to date -> unix time -> sort
		.map((app) => {
			const startTime = app.start
			const title = `פגישה עם ${app.info.name}`

			const newDate = moment(app.date).set({
				hour: parseInt(startTime.split(':')[0]),
				minute: parseInt(startTime.split(':')[1]),
			})

			console.log(newDate.toDate())

			return newAppointments.push({
				title,
				date: newDate.toDate(),
			})
		})

	return newAppointments
}

interface IApp {
	title: string
	date: Date
}

export default GetUserAppointments
