import type { NextApiRequest, NextApiResponse } from 'next'
import db from '@/utils/db'
import User from '@/utils/models/User'
import Company from '@/utils/models/Company'
//
const objectIdPattern = /^[0-9a-fA-F]{24}$/
export const isValidObjectId = (id: any): boolean => objectIdPattern.test(id)

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await db()

	const { method } = req

	switch (method) {
		case 'GET': {
			const { companyId } = req.query

			if (!isValidObjectId(companyId)) return res.status(400).json({ success: false, error: 'החברה אינה קיימת' })

			const company = await Company.findOne({
				_id: companyId,
			})
				.populate({
					path: 'users',
					model: User,
					// select: '-password',
					select: 'name email role weeklyHours _id',
				})
				.lean()

			if (!company) return res.status(400).json({ success: false, error: 'החברה אינה קיימת' })

			return res.status(200).json({ success: true, company })
		}

		default:
			return res.status(401).end()
	}
}

export default handler
