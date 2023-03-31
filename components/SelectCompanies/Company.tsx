import { useRouter } from 'next/router'

const Company = ({ _id, name }: IProps) => {
	const router = useRouter()

	return (
		<div
			className='rounded-lg bg-white p-12 duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border border-slate-100 cursor-pointer text-xl font-medium flex flex-col items-center justify-center gap-4'
			onClick={() => router.push(_id)}
		>
			<img
				src='https://freepngimg.com/thumb/business/70298-management-business-icons-consultant-company-social-marketing-thumb.png'
				className='w-24 h-24'
				alt='company'
			/>
			{name}
		</div>
	)
}

interface IProps {
	_id: string
	name: string
}

export default Company
