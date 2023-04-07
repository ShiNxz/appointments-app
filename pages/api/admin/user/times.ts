import type { NextApiRequest, NextApiResponse } from 'next'
import type { IBreak, ISpecialDate, IWeeklyHours } from '@/utils/models/User'
import db from '@/utils/db'
import FormatDate from '@/utils/functions/FormatDate'
import AuthMiddleware, { IDBUser } from '@/utils/middlewares/Auth'
import User from '@/utils/models/User'

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

			const dbUser = await User.findOne({ _id: user._id })
			if (!dbUser) return res.status(404).json({ success: false, error: 'לא נמצא משתמש קיים עם הפרטים שנרשמו!' })

			const index = dbUser.specialDates.findIndex(
				(d) => FormatDate(new Date(d.date)) === FormatDate(new Date(date))
			)

			const newDate: ISpecialDate = {
				date,
				start,
				end,
			}

			if (index !== -1) {
				dbUser.specialDates[index] = newDate
			} else dbUser.specialDates.push(newDate)

			await dbUser.save()

			return res.status(200).json({ success: true })
		}

		// WEEKLY HOURS AND BREAKS
		case 'PUT': {
			const { days, breaks } = req.body as { days: IWeeklyHours[]; breaks: IBreak[] }

			const user = (await AuthMiddleware(req, res)) as IDBUser
			if (!user) return

			const dbUser = await User.findOne({ _id: user._id })
			if (!dbUser) return res.status(404).json({ success: false, error: 'לא נמצא משתמש קיים עם הפרטים שנרשמו!' })

			dbUser.weeklyHours = days
			dbUser.breaks = breaks

			console.log(breaks)

			await dbUser.save()

			return res.status(200).json({ success: true })
		}

		default:
			return res.status(401).end()
	}
}

export default handler
