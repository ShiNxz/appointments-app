import { models, model, Schema, Model } from 'mongoose'

export interface IAppointment extends Document {
	_id: string

	name: string
	phone: string

	createdAt: number
	updatedAt: number
}

const AppointmentSchema = new Schema(
	{
		name: String,
		phone: String,

		createdAt: Number,
		updatedAt: Number,
	},
	{
		collection: 'Appointments',
		timestamps: { currentTime: () => Math.floor(Date.now() / 1000) },
	}
)

const Appointment: Model<IAppointment> = models.Appointment || model<IAppointment>('Appointment', AppointmentSchema)
export default Appointment
