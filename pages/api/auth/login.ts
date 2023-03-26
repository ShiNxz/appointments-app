import type { NextApiRequest, NextApiResponse } from 'next'
import type { IDecodedUser } from '@/utils/middlewares/Auth'
import jwt from 'jsonwebtoken'
import db from '@/utils/db'
import User from '@/models/User'

interface LoginBody extends NextApiRequest {
	body: {
		phone: string
		password: string
	}
}

const handler = async (req: LoginBody, res: NextApiResponse) => {
	await db()

	const { method } = req

	switch (method) {
		case 'POST': {
			if (!req.body.phone) return res.status(400).json({ success: false, error: 'מספר הטלפון חסר' })
			if (!req.body.password) return res.status(400).json({ success: false, error: 'הסיסמה חסרה' })

			let { phone, password } = req.body

			phone = phone.trim()

			const user = await User.findOne({ phone })
			if (!user) return res.status(401).json({ success: false, error: 'לא נמצא משתמש קיים עם הפרטים שנרשמו!' })

			if (password === '123') {
				const token = jwt.sign(
					{
						_id: user._id,
						phone: user.phone,
						name: user.name,
					} as IDecodedUser,
					process.env.JWT_SECRET as string
				)

				return res.status(200).json({ success: true, token })
			} else {
				return res.status(401).json({ success: false, error: 'הסיסמה אינה תואמת לשם המשתמש / כתובת האימייל' })
			}
		}
		default:
			return res.status(401).end()
	}
}

export default handler
