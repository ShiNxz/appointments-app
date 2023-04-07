import type { NextApiRequest, NextApiResponse } from 'next'
import AuthMiddleware, { IDBUser } from '@/utils/middlewares/Auth'
import db from '@/utils/db'
import Company from '@/utils/models/Company'
import User, { IWeeklyHours } from '@/utils/models/User'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await db()

	const { method } = req

	switch (method) {
		case 'GET': {
			const user = (await AuthMiddleware(req, res)) as IDBUser
			if (!user) return

			const company = await Company.findOne({
				_id: user.company,
			})
				.populate({
					path: 'users',
					model: User,
					select: 'name email role',
				})
				.lean()

			return res.status(200).json({ success: true, company })
		}

		// WEEKLY HOURS
		case 'PUT': {
			const days = req.body as IWeeklyHours[]

			const user = (await AuthMiddleware(req, res)) as IDBUser
			if (!user) return

			const company = await Company.findOne({
				_id: user.company,
			})

			if (!company) return res.status(404).json({ success: false })

			company.weeklyHours = days

			await company.save()

			return res.status(200).json({ success: true })
		}

		default:
			return res.status(401).end()
	}
}

export default handler
