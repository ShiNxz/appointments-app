import type { NextApiRequest, NextApiResponse } from 'next'
import db from '@/utils/db'
import User from '@/utils/models/User'
import Appointment from '@/utils/models/Appointment'
import type { Times } from '@/utils/functions/TimeSlots'
import FormatDate from '@/utils/functions/FormatDate'
import { C } from '@fullcalendar/core/internal-common'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await db()

	const { method } = req

	switch (method) {
		case 'GET': {
			const users = await User.find({}).populate({
				path: 'dates.appointments.appointment',
				model: Appointment,
			})

			return res.status(200).json({ success: true, users })
		}

		case 'POST': {
			const { name, phone, userId, date, time } = req.body as INewAppBody

			const user = await User.findOne({ _id: userId })
			if (!user) return res.status(404).json({ success: false, message: 'המשתמש לא נמצא!' })

			const timeIndex = user.dates.findIndex(
				(d) =>
					FormatDate(new Date(d.date)) === FormatDate(new Date(date)) &&
					!d.appointments.find((a) => a.start === time.start)
			)

			if (timeIndex === -1) return res.status(404).json({ success: false, message: 'התאריך לא נמצא!' })

			const appId = await Appointment.create({
				name,
				phone,
			})

			if (user.dates[timeIndex].appointments.find((a) => a.start === time.start))
				return res.status(404).json({ success: false, message: 'הזמן תפוס!' })

			user.dates[timeIndex].appointments.push({
				appointment: appId,
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
