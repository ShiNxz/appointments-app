import type { NextApiRequest, NextApiResponse } from 'next'
import type { IDecodedUser } from '@/utils/middlewares/Auth'
import jwt from 'jsonwebtoken'
import db from '@/utils/db'
import User, { IWeeklyHours } from '@/models/User'
import Company from '@/utils/models/Company'

export interface RegisterCompanyBody extends NextApiRequest {
	body: IRegisterCompany
}

export interface IRegisterCompany {
	company: string
	name: string
	email: string
	password: string
	weeklyHours: IWeeklyHours[]
}

const handler = async (req: RegisterCompanyBody, res: NextApiResponse) => {
	await db()

	const { method } = req

	switch (method) {
		case 'POST': {
			if (!req.body.company) return res.status(400).json({ success: false, error: 'שם החברה חסר' })
			if (!req.body.name) return res.status(400).json({ success: false, error: 'שם החברה חסר' })
			if (!req.body.email) return res.status(400).json({ success: false, error: 'כתובת האימייל חסרה' })
			if (!req.body.password) return res.status(400).json({ success: false, error: 'הסיסמה חסרה' })
			if (!req.body.weeklyHours) return res.status(400).json({ success: false, error: 'שעות הפעילות חסרות' })

			let { company: companyName, name, email, password, weeklyHours } = req.body

			if (
				await User.findOne({
					$or: [{ email }, { phone: email }],
				})
			)
				return res.status(400).json({ success: false, error: 'המשתמש או החברה כבר קיימים במערכת' })

			const company = await Company.create({
				name: companyName,
				weeklyHours,
				users: [],
			})

			const user = await User.create({
				name,
				email,
				password,
				company,
				weeklyHours,
				role: 'manager',
			})

			company.users.push(user)

			await company.save()

			const token = jwt.sign(
				{
					_id: user._id,
					email: user.email,
					name: user.name,
				} as IDecodedUser,
				process.env.JWT_SECRET as string
			)

			return res.status(200).json({ success: true, token })
		}
		default:
			return res.status(401).end()
	}
}

export default handler
