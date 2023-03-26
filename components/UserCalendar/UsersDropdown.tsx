import type { IUser } from '@/utils/models/User'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'

const UsersDropdown = ({ users, user, setUser }: IProps) => {
	const handleChange = (event: SelectChangeEvent<IUser>) =>
		setUser(users.find((user) => user._id === event.target.value)!)

	return (
		<FormControl
			disabled={!users || users.length === 0}
			fullWidth
		>
			<InputLabel id='user-select-label'>משתמש</InputLabel>
			<Select
				labelId='user-select-label'
				id='user-select'
				// @ts-ignore
				value={user || ''}
				disabled={!users || users.length === 0}
				label='משתמש'
				renderValue={(user) => (user as IUser).name}
				onChange={handleChange}
			>
				{users.map((user) => (
					<MenuItem
						key={user._id}
						value={user._id}
					>
						{user.name}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

interface IProps {
	users: IUser[]
	user: IUser | undefined
	setUser: (user: IUser) => void
}

export default UsersDropdown
