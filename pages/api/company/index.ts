import type { NextApiRequest, NextApiResponse } from 'next'
import db from '@/utils/db'
import Company from '@/utils/models/Company'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await db()

	const { method } = req

	switch (method) {
		case 'GET': {
			const companies = await Company.find({}).select('name _id').lean()

			return res.status(200).json({ success: true, companies })
		}
		default:
			return res.status(401).end()
	}
}

export default handler
