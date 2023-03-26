import type { NextApiRequest, NextApiResponse } from 'next'
import type { IAvailableDate } from '@/utils/models/User'
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

		case 'POST': {
			const { date, start, end } = req.body

			const user = (await AuthMiddleware(req, res)) as IDBUser
			if (!user) return

			user.dates = user.dates.filter((d) => FormatDate(new Date(d.date)) !== FormatDate(new Date(date)))

			const newTime: IAvailableDate = {
				date,
				start,
				end,
				appointments: [],
			}

			user.dates.push(newTime)

			await user.save()

			return res.status(200).json({ success: true })
		}

		default:
			return res.status(401).end()
	}
}

export default handler
