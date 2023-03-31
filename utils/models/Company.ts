import type { IUser, IWeeklyHours } from './User'
import { models, model, Schema, Model } from 'mongoose'

export interface ICompany extends Document {
	_id: string

	name: string

	weeklyHours: IWeeklyHours[]

	users: IUser[]

	createdAt: number
	updatedAt: number
}

const CompanySchema = new Schema(
	{
		name: String,
		email: String,

		weeklyHours: [
			{
				day: {
					type: Number,
					enum: [0, 1, 2, 3, 4, 5, 6], // 0 for Sunday, 1 for Monday, etc.
				},
				start: String,
				end: String,
			},
		],

		users: [
			{
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
		],

		createdAt: Number,
		updatedAt: Number,
	},
	{
		collection: 'Companies',
		timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
	}
)

const Company: Model<ICompany> = models.Company || model<ICompany>('Company', CompanySchema)
export default Company
