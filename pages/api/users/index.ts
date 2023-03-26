import type { NextApiRequest, NextApiResponse } from 'next'
import db from '@/utils/db'
import User from '@/utils/models/User'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await db()

	const { method } = req

	switch (method) {
		case 'GET': {
			const users = await User.find({})

			return res.status(200).json({ success: true, users })
		}

		default:
			return res.status(401).end()
	}
}

interface IBody {
	date: Date
	userId: string
	name: string
	time: string
}

export default handler
