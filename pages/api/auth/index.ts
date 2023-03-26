import type { NextApiRequest, NextApiResponse } from 'next'
import type { IDecodedUser } from '@/utils/middlewares/Auth'

import db from '@/utils/db'
import User from '@/utils/models/User'
import jwt from 'jsonwebtoken'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	await db()

	const { method } = req

	switch (method) {
		/**
		 * Handle checking if user is logged in and exists
		 */
		case 'GET': {
			if (!('token' in req.cookies)) return res.status(400).json({ success: false, error: 'error to auth' })
			if (!req.cookies.token) return res.status(400).json({ success: false, error: 'error to auth' })

			let decoded: IDecodedUser
			let dbUser: { name: string; phone: string } | null = null

			if (req.cookies.token) {
				try {
					decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET as string) as IDecodedUser
					let user = await User.findOne({ _id: decoded._id })
					if (!user) return res.status(401).json({ success: false, error: 'Unable to auth' })

					const foundUser: IAuthUser = {
						name: user.name,
						phone: user.phone,
					}

					dbUser = foundUser
				} catch (e) {
					return res.status(401).json({ success: false, error: 'Unable to auth' })
				}
			}

			return dbUser
				? res.status(200).json(dbUser)
				: res.status(401).json({ success: false, error: 'Unable to auth' })
		}

		default:
			return res.status(401).end()
	}
}

export interface IAuthUser {
	name: string
	phone: string
}

export default handler
