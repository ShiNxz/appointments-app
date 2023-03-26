import moment from 'moment'

const generateTimeSlots = (startTime: string, endTime: string): Times[] => {
	const start = moment(startTime, 'HH:mm')
	const end = moment(endTime, 'HH:mm')
	const timeSlots = []

	let current = moment(start)

	while (current <= end) {
		timeSlots.push({ start: current.format('HH:mm'), end: current.add(15, 'minutes').format('HH:mm') })
	}

	return timeSlots
}

export interface Times {
	start: string
	end: string
}

export default generateTimeSlots
