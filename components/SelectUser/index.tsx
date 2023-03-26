import type { IUser } from '@/utils/models/User'
import User from './User'

const SelectUser = ({ users }: IProps) => {
	return (
		<div className='grid grid-cols-5 gap-4'>
			{users.map((user) => (
				<User
					_id={user._id}
					name={user.name}
					key={user._id}
				/>
			))}
		</div>
	)
}

interface IProps {
	users: IUser[]
}

export default SelectUser
