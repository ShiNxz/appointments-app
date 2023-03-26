import Link from 'next/link'

const SidebarOption = ({ Icon, title, active, path }: ISidebarOptionProps) => {
	return (
		<Link
			className={`rounded-lg flex flex-row items-center p-4 px-6 duration-200 mb-2 ${
				active ? 'bg-blue-600 text-white' : 'text-slate-800 bg-white hover:bg-blue-500 hover:text-white'
			}`}
			href={path}
		>
			<Icon className='ml-2' />
			<h3>{title}</h3>
		</Link>
	)
}

interface ISidebarOptionProps {
	path: string
	title: string
	Icon: any
	active: boolean
}

export default SidebarOption
