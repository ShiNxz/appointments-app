import type { NextApiRequest, NextApiResponse } from 'next'
import type { ISpecialDate, IWeeklyHours, TDay } from '@/utils/models/User'
import db from '@/utils/db'
import FormatDate from '@/utils/functions/FormatDate'
import AuthMiddleware, { IDBUser } from '@/utils/middlewares/Auth'
import User from '@/utils/models/User'

export interface IBreakData {
	day: TDay
	start: string
	end: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await db()

	const { method } = req

	switch (method) {
		case 'GET': {
			const user = (await AuthMiddleware(req, res)) as IDBUser
			if (!user) return

			return res.status(200).json({ success: true, user })
		}

		case 'POST': {
			const { day, start, end } = req.body as IBreakData

			const user = (await AuthMiddleware(req, res)) as IDBUser
			if (!user) return

			const dbUser = await User.findOne({ _id: user._id })
			if (!dbUser) return res.status(404).json({ success: false, error: 'לא נמצא משתמש קיים עם הפרטים שנרשמו!' })

			const id = Math.random().toString(36).substr(2, 9)
			dbUser.breaks.push({ id, day, start, end })

			await dbUser.save()

			return res.status(200).json({ success: true })
		}

		case 'DELETE': {
			const { breakId } = req.body

			const user = (await AuthMiddleware(req, res)) as IDBUser
			if (!user) return

			const dbUser = await User.findOne({ _id: user._id })
			if (!dbUser) return res.status(404).json({ success: false, error: 'לא נמצא משתמש קיים עם הפרטים שנרשמו!' })

			dbUser.breaks = dbUser.breaks.filter((b) => b.id.toString() !== breakId)

			await dbUser.save()

			return res.status(200).json({ success: true })
		}

		default:
			return res.status(401).end()
	}
}

export default handler
