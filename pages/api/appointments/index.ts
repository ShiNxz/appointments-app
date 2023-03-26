import type { NextApiRequest, NextApiResponse } from 'next'
import type { Times } from '@/utils/functions/TimeSlots'
import db from '@/utils/db'
import User from '@/utils/models/User'
import FormatDate from '@/utils/functions/FormatDate'

const getTimestamp = (date: Date, timeStr: string) => {
	const [hours, minutes] = timeStr.split(':').map((n) => parseInt(n))
	const datetime = new Date(date)
	datetime.setHours(hours, minutes, 0, 0)
	return datetime.getTime()
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await db()

	const { method } = req

	switch (method) {
		case 'GET': {
			const users = await User.find({})

			return res.status(200).json({ success: true, users })
		}

		case 'POST': {
			const { name, phone, userId, date, time } = req.body as INewAppBody

			const user = await User.findOne({ _id: userId })
			if (!user) return res.status(404).json({ success: false, message: 'המשתמש לא נמצא!' })

			if (user.appointments.find((a) => a.date === FormatDate(new Date(date)) && a.start === time.start))
				return res.status(400).json({ success: false, message: 'הזמן תפוס!' })

			const isSpecialDate =
				user.specialDates.find((d) => {
					const dayMatches = d.date === FormatDate(date)
					const startTimestamp = getTimestamp(date, d.start)
					const endTimestamp = getTimestamp(date, d.end)
					const rangeStart = getTimestamp(date, time.start)
					const rangeEnd = getTimestamp(date, time.end)
					const overlaps = startTimestamp <= rangeEnd && endTimestamp >= rangeStart
					return dayMatches && overlaps
				}) !== undefined

			const isWeeklyHour =
				user.weeklyHours.find((d) => {
					const dayMatches = d.day === new Date(date).getDay()
					const startTimestamp = getTimestamp(date, d.start)
					const endTimestamp = getTimestamp(date, d.end)
					const rangeStart = getTimestamp(date, time.start)
					const rangeEnd = getTimestamp(date, time.end)
					const overlaps = startTimestamp <= rangeEnd && endTimestamp >= rangeStart
					return dayMatches && overlaps
				}) !== undefined

			if (!isSpecialDate && !isWeeklyHour)
				return res.status(400).json({ success: false, message: 'הזמן שנבחר לא קיים!' })

			const appId = Math.random().toString(36)

			user.appointments.push({
				id: appId,
				info: { name, phone },
				date: FormatDate(new Date(date)),
				start: time.start,
			})

			await user.save()

			return res.status(200).json({ success: true })
		}

		default:
			return res.status(401).end()
	}
}

export interface INewAppBody {
	name: string
	phone: string
	userId: string
	date: Date
	time: Times
}

export default handler
