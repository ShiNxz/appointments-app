import type { NextApiRequest, NextApiResponse } from 'next'
import type { Times } from '@/utils/functions/TimeSlots'
import db from '@/utils/db'
import AuthMiddleware, { IDBUser } from '@/utils/middlewares/Auth'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await db()

	const { method } = req

	switch (method) {
		case 'DELETE': {
			const { appId } = req.body as { appId: string }

			const user = (await AuthMiddleware(req, res)) as IDBUser
			if (!user) return

			const apps = user.appointments.filter((a) => a.id !== appId)
			user.appointments = apps

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
