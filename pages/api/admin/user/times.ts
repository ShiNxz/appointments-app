import type { NextApiRequest, NextApiResponse } from 'next'
import type { ISpecialDate, IWeeklyHours } from '@/utils/models/User'
import db from '@/utils/db'
import FormatDate from '@/utils/functions/FormatDate'
import AuthMiddleware, { IDBUser } from '@/utils/middlewares/Auth'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await db()

	const { method } = req

	switch (method) {
		case 'GET': {
			const user = (await AuthMiddleware(req, res)) as IDBUser
			if (!user) return

			return res.status(200).json({ success: true, user })
		}

		// SPECIAL HOURS
		case 'POST': {
			const { date, start, end } = req.body as ISpecialDate

			const user = (await AuthMiddleware(req, res)) as IDBUser
			if (!user) return

			const index = user.specialDates.findIndex(
				(d) => FormatDate(new Date(d.date)) === FormatDate(new Date(date))
			)

			const newDate: ISpecialDate = {
				date,
				start,
				end,
			}

			if (index !== -1) {
				user.specialDates[index] = newDate
			} else user.specialDates.push(newDate)

			await user.save()

			return res.status(200).json({ success: true })
		}

		// WEEKLY HOURS
		case 'PUT': {
			const days = req.body as IWeeklyHours[]

			const user = (await AuthMiddleware(req, res)) as IDBUser
			if (!user) return

			user.weeklyHours = days
			await user.save()

			return res.status(200).json({ success: true })
		}

		default:
			return res.status(401).end()
	}
}

export default handler
