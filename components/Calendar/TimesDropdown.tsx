import type { Times } from '@/utils/functions/TimeSlots'
import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'

const TimesDropdown = ({ times, time, setTime }: IProps) => {
	const handleChange = (event: SelectChangeEvent<Times>) =>
		setTime(times.find((time) => time.start === event.target.value)!)

	return (
		<FormControl
			disabled={!times || times.length === 0}
			className='w-52'
		>
			<InputLabel id='time-select-label'>שעה</InputLabel>
			<Select
				labelId='time-select-label'
				id='time-select'
				// @ts-ignore
				value={time || ''}
				disabled={!times || times.length === 0}
				label='שעה'
				renderValue={(time) => (
					<>
						{time.start}-{time.end}
					</>
				)}
				onChange={handleChange}
			>
				{times.map((time) => (
					<MenuItem
						key={time.start}
						value={time.start}
					>
						{time.start}-{time.end}
					</MenuItem>
				))}
			</Select>
		</FormControl>
	)
}

interface IProps {
	times: Times[]
	time: Times | undefined
	setTime: (time: Times) => void
}

export default TimesDropdown
