import { ICompany } from '@/utils/models/Company'
import WorkersTable from './Table'

const ManageWorkers = ({ company, mutate }: IProps) => {
	return (
		<>
			<WorkersTable
				workers={company?.users || []}
				mutate={mutate}
			/>
		</>
	)
}

interface IProps {
	company: ICompany | null
	mutate: () => Promise<void>
}

export default ManageWorkers
