import type { NextApiRequest, NextApiResponse } from 'next'
import type { IDBUser } from '@/utils/middlewares/Auth'
import db from '@/utils/db'
import User, { IBreak, IWeeklyHours } from '@/models/User'
import Company from '@/utils/models/Company'
import AuthMiddleware from '@/utils/middlewares/Auth'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await db()

	const { method } = req

	switch (method) {
		case 'GET': {
			const { userId } = req.query as { userId: string }

			const user = (await AuthMiddleware(req, res)) as IDBUser
			if (!user) return

			const company = await Company.findOne({
				_id: user.company,
			}).populate({
				path: 'users',
				model: User,
			})

			if (!company) return res.status(400).json({ success: false, error: 'החברה אינה קיימת' })

			const worker = company.users.find((u) => u._id.toString() === userId.toString())
			if (!worker) return res.status(400).json({ success: false, error: 'העובד אינו קיים' })

			return res.status(200).json({ success: true, user: worker, company })
		}

		// WEEKLY HOURS AND BREAKS
		case 'PUT': {
			const { days, breaks } = req.body as { days: IWeeklyHours[]; breaks: IBreak[] }
			const { userId } = req.query as { userId: string }

			const user = (await AuthMiddleware(req, res)) as IDBUser
			if (!user) return

			const dbUser = await User.findOne({ _id: userId })
			if (!dbUser) return res.status(404).json({ success: false, error: 'לא נמצא משתמש קיים עם הפרטים שנרשמו!' })

			dbUser.weeklyHours = days
			dbUser.breaks = breaks

			await dbUser.save()

			return res.status(200).json({ success: true })
		}

		default:
			return res.status(401).end()
	}
}

export default handler
