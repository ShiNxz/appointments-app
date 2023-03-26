import { models, model, Schema, Model } from 'mongoose'
import { IAppointment } from './Appointment'

export interface IUser extends Document {
	_id: string

	name: string
	phone: string

	// Available times
	dates: IAvailableDate[]

	createdAt: number
	updatedAt: number
}

export interface IAvailableDate {
	date: Date
	start: string // 10:00
	end: string // 17:00
	appointments: ISheduledApp[]
}

export interface ISheduledApp {
	appointment: IAppointment
	start: string // 10:00
}

const UserSchema = new Schema(
	{
		name: String,
		phone: String,

		dates: [
			{
				date: Date,
				start: String,
				end: String,
				appointments: [
					{
						appointment: {
							type: Schema.Types.ObjectId,
							ref: 'Appointment',
						},
						start: String,
					},
				],
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
