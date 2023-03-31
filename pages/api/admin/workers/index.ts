import type { NextApiRequest, NextApiResponse } from 'next'
import type { IDBUser, IDecodedUser } from '@/utils/middlewares/Auth'
import jwt from 'jsonwebtoken'
import db from '@/utils/db'
import User from '@/models/User'
import Company from '@/utils/models/Company'
import AuthMiddleware from '@/utils/middlewares/Auth'

export interface RegisterCompanyBody extends NextApiRequest {
	body: IRegisterWorker
}

export interface IRegisterWorker {
	name: string
	email: string
	password: string
}

const handler = async (req: RegisterCompanyBody, res: NextApiResponse) => {
	await db()

	const { method } = req

	switch (method) {
		case 'POST': {
			const user = (await AuthMiddleware(req, res)) as IDBUser
			if (!user) return

			const company = await Company.findOne({
				_id: user.company,
			}).populate({
				path: 'users',
				model: User,
				select: 'name email role',
			})

			if (!company) return res.status(400).json({ success: false, error: 'החברה אינה קיימת' })
			if (!req.body.name) return res.status(400).json({ success: false, error: 'שם החברה חסר' })
			if (!req.body.email) return res.status(400).json({ success: false, error: 'כתובת האימייל חסרה' })
			if (!req.body.password) return res.status(400).json({ success: false, error: 'הסיסמה חסרה' })

			let { name, email, password } = req.body

			if (
				await User.findOne({
					$or: [{ email }, { phone: email }],
				})
			)
				return res.status(400).json({ success: false, error: 'המשתמש כבר קיים במערכת' })

			const newUser = await User.create({
				name,
				email,
				password,
				company,
				weeklyHours: company.weeklyHours,
				role: 'user',
			})

			company.users.push(newUser)

			await company.save()

			return res.status(200).json({ success: true })
		}
		default:
			return res.status(401).end()
	}
}

export default handler
