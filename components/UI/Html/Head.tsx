import NextHead from 'next/head'

const Head = ({ title }: { title?: string }) => {
	const PageTitle = title ? `Zimun Torim | ${title}` : 'Zimun Torim'

	return (
		<NextHead>
			<title>{PageTitle}</title>
			<meta
				name='description'
				content=''
			/>
			<meta
				name='viewport'
				content='width=device-width, initial-scale=1'
			/>
			<link
				rel='icon'
				href='/assets/logo.png'
			/>
		</NextHead>
	)
}

export default Head
