import moment from 'moment'

const generateTimeSlots = (startTime: Date, endTime: Date): Times[] => {
	const start = moment(startTime, 'HH:mm')
	const end = moment(endTime, 'HH:mm')
	console.log(end)
	const timeSlots = []

	let current = moment(start)

	while (current <= end && current.add(15) <= end) {
		timeSlots.push({ start: current.format('HH:mm'), end: current.add(15, 'minutes').format('HH:mm') })
	}

	return timeSlots
}

export interface Times {
	start: string
	end: string
}

export default generateTimeSlots
