import type { NextApiRequest, NextApiResponse } from 'next'
import AuthMiddleware, { IDBUser } from '@/utils/middlewares/Auth'
import db from '@/utils/db'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await db()

	const { method } = req

	switch (method) {
		case 'GET': {
			const user = (await AuthMiddleware(req, res)) as IDBUser
			if (!user) return

			return res.status(200).json({ success: true, user })
		}

		default:
			return res.status(401).end()
	}
}

export default handler
