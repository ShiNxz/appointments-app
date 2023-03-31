import type { ICompany } from './Company'
import { models, model, Schema, Model } from 'mongoose'

export interface IUser extends Document {
	_id: string

	name: string
	email: string
	password: string

	company: ICompany

	role: 'user' | 'manager'

	appointments: IAppointments[]
	weeklyHours: IWeeklyHours[]
	specialDates: ISpecialDate[] // Will always override weeklyHours
	breaks: IBreak[]

	createdAt: number
	updatedAt: number
}

export interface IWeeklyHours {
	day: TDay // 0 - Sunday, 1 - Monday, etc.
	start: string // 10:00
	end: string // 17:00
	disabled: boolean
}

export interface IBreak {
	id: string
	day: TDay // 0 - Sunday, 1 - Monday, etc.
	start: string // 10:00
	end: string // 17:00
}

export type TDay = 0 | 1 | 2 | 3 | 4 | 5 | 6

export interface ISpecialDate {
	date: string
	start: string // 10:00
	end: string // 17:00
}

export interface IAppointments {
	id: string
	info: IAppInfo
	date: string
	start: string // 10:00
}

export interface IAppInfo {
	name: string
	phone: string
}

const UserSchema = new Schema(
	{
		name: String,
		email: String,
		password: String,

		company: {
			type: Schema.Types.ObjectId,
			ref: 'Company',
		},

		role: {
			type: String,
			enum: ['user', 'manager'],
		},

		appointments: [
			{
				id: String,
				info: {
					name: String,
					phone: String,
				},
				date: String,
				start: String,
			},
		],

		weeklyHours: [
			{
				day: {
					type: Number,
					enum: [0, 1, 2, 3, 4, 5, 6], // 0 for Sunday, 1 for Monday, etc.
				},
				start: String,
				end: String,
				disabled: Boolean,
			},
		],

		specialDates: [
			{
				date: String,
				start: String,
				end: String,
			},
		],

		breaks: [
			{
				id: String,
				day: {
					type: Number,
					enum: [0, 1, 2, 3, 4, 5, 6], // 0 for Sunday, 1 for Monday, etc.
				},
				start: String,
				end: String,
			},
		],

		createdAt: Number,
		updatedAt: Number,
	},
	{
		collection: 'Users',
		timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
	}
)

const User: Model<IUser> = models.User || model<IUser>('User', UserSchema)
export default User
