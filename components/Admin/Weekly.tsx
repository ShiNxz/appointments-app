import type { IWeeklyHours } from '@/utils/models/User'
import DaysSettings from './DaysSettings'

const AdminDays = ({ mutate, weeklyHours }: IProps) => {
	return (
		<>
			<DaysSettings
				weeklyHours={weeklyHours}
				mutate={mutate}
			/>
		</>
	)
}

interface IProps {
	weeklyHours: IWeeklyHours[] | null
	mutate: () => Promise<void>
}

export default AdminDays
