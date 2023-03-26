import mongoose from 'mongoose'

const { MONGODB_URI, MONGODB_DB } = process.env

if (!MONGODB_URI) throw new Error('MONGODB_URI not defined')
if (!MONGODB_DB) throw new Error('MONGODB_DB not defined')

let cached = (global as any).mongoose

if (!cached) cached = (global as any).mongoose = { conn: null, promise: null }

async function db() {
	if (cached.conn) return cached.conn

	if (!cached.promise) {
		const options = {
			useNewUrlParser: true,
			useUnifiedTopology: true,
			dbName: MONGODB_DB,
		}
		cached.promise = mongoose.connect(`${MONGODB_URI}`, options).then((mongoose) => mongoose)
	}

	cached.conn = await cached.promise

	return cached.conn
}

export default db
