import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import User, { IUser } from '@/models/User'
import Company from '../models/Company'

const AuthMiddleware = (req: NextApiRequest, res: NextApiResponse) => {
	return new Promise(async (resolve, reject) => {
		if (!('token' in req.cookies)) return reject(res.status(401).json({ success: false, error: 'error to auth' }))
		if (!req.cookies.token) return reject(res.status(401).json({ success: false, error: 'error to auth' }))

		let decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET as string) as IDecodedUser

		const user = await User.findOne({ _id: decoded._id }).lean()

		if (!user)
			return reject(res.status(401).json({ success: false, error: 'לא נמצא משתמש קיים עם הפרטים שנרשמו!' }))

		resolve(user)
	})
}

export interface IDBUser extends IUser {
	markModified(arg0: string): unknown
	save(): unknown
}

export interface IDecodedUser {
	_id: string
	name: string
	email: string
	iat: number
}

export default AuthMiddleware
