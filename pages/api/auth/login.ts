import type { NextApiRequest, NextApiResponse } from 'next'
import type { IDecodedUser } from '@/utils/middlewares/Auth'
import jwt from 'jsonwebtoken'
import db from '@/utils/db'
import User from '@/models/User'

interface LoginBody extends NextApiRequest {
	body: {
		email: string
		password: string
	}
}

const handler = async (req: LoginBody, res: NextApiResponse) => {
	await db()

	const { method } = req

	switch (method) {
		case 'POST': {
			if (!req.body.email) return res.status(400).json({ success: false, error: 'כתובת האימייל חסרה' })
			if (!req.body.password) return res.status(400).json({ success: false, error: 'הסיסמה חסרה' })

			let { email, password } = req.body

			const user = await User.findOne({ email })
			if (!user) return res.status(401).json({ success: false, error: 'לא נמצא משתמש קיים עם הפרטים שנרשמו!' })
			console.log(user.password, password)
			if (password === user.password) {
				const token = jwt.sign(
					{
						_id: user._id,
						email: user.email,
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
