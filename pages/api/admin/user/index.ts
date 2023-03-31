import type { NextApiRequest, NextApiResponse } from 'next'
import AuthMiddleware, { IDBUser } from '@/utils/middlewares/Auth'
import db from '@/utils/db'
import Company from '@/utils/models/Company'

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

			if (!company) return res.status(404).json({ success: false, error: 'לא נמצאה חברה עם הפרטים שנרשמו!' })

			return res.status(200).json({ success: true, user, company })
		}

		default:
			return res.status(401).end()
	}
}

export default handler
