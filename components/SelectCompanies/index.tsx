import type { ICompany } from '@/utils/models/Company'
import Company from './Company'

const SelectCompany = ({ companies }: IProps) => {
	return (
		<div className='grid grid-cols-5 gap-4'>
			{companies.map((company) => (
				<Company
					_id={company._id}
					name={company.name}
					key={company._id}
				/>
			))}
		</div>
	)
}

interface IProps {
	companies: ICompany[]
}

export default SelectCompany
