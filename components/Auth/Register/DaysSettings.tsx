import type { Dayjs } from 'dayjs'
import { TimeField } from '@mui/x-date-pickers'
import { Button } from '@mui/material'

const DaysSettings = ({ days, state, setState, isLoading, handleSubmit }: IProps) => {
	const handleChangeTime = (index: number, type: 'start' | 'end', value: Dayjs | null) => {
		if (!state) return

		setState((prevState) => {
			const newState = [...prevState!]
			newState[index][type] = value
			return newState
		})
	}

	return (
		<div className='flex flex-col gap-4 p-12'>
			{days.map((day, index) => (
				<div
					className='flex flex-row items-center gap-4'
					key={day.name}
				>
					<div className='w-16'>{day.title}</div>
					<TimeField
						label='שעת התחלה'
						value={state && state[index].start}
						onChange={(newVal) => handleChangeTime(index, 'start', newVal as Dayjs | null)}
						format='HH:mm'
						minutesStep={5}
						disabled={isLoading}
						size='small'
					/>
					<TimeField
						label='שעת סיום'
						value={state && state[index].end}
						onChange={(newVal) => handleChangeTime(index, 'end', newVal as Dayjs | null)}
						format='HH:mm'
						disabled={isLoading}
						size='small'
					/>
				</div>
			))}
			<Button
				variant='contained'
				color='primary'
				onClick={handleSubmit}
				className='self-start'
				disabled={isLoading}
				fullWidth
			>
				{isLoading ? 'אנא המתן...' : 'שמור שינויים'}
			</Button>
		</div>
	)
}

interface IProps {
	days: IDay[]
	state: IState[]
	setState: React.Dispatch<React.SetStateAction<IState[]>>
	isLoading: boolean
	handleSubmit: () => void
}

export interface IDay {
	name: string
	title: string
}

export interface IState {
	name: string
	title: string
	start: Dayjs | null
	end: Dayjs | null
}

export default DaysSettings
