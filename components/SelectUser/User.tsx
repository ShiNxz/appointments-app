import { useRouter } from 'next/router'

const User = ({ _id, name }: IProps) => {
	const router = useRouter()

	return (
		<div
			className='rounded-lg bg-white p-12 duration-300 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border border-slate-100 cursor-pointer text-xl font-medium'
			onClick={() => router.push('/' + _id)}
		>
			{name}
		</div>
	)
}

interface IProps {
	_id: string
	name: string
}

export default User
