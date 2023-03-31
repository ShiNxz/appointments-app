import { IUser } from '@/utils/models/User'
import { Button } from '@mui/material'
import { DataGrid, GridColDef, GridToolbar, heIL } from '@mui/x-data-grid'
import { useRouter } from 'next/router'

const WorkersTable = ({ workers, mutate }: IProps) => {
	const router = useRouter()

	const columns: GridColDef[] = [
		{ field: 'name', headerName: 'שם', width: 150 },
		{ field: 'email', headerName: 'כתובת אימייל', width: 250 },
		{
			field: 'actions',
			headerName: 'פעולות',
			flex: 1,
			renderCell: (params) => {
				return (
					<div className='flex flex-row gap-4'>
						<Button
							color='secondary'
							variant='contained'
							size='small'
							onClick={() => router.push(`/admin/workers/${params.row.id}`)}
						>
							צפייה בתורים ופעילות
						</Button>
						<Button
							color='primary'
							variant='contained'
							size='small'
							disabled
						>
							עריכה
						</Button>
						<Button
							color='error'
							variant='contained'
							size='small'
							disabled
						>
							מחיקה
						</Button>
					</div>
				)
			},
		},
	]

	return (
		<>
			<DataGrid
				rows={workers.map((w) => ({ ...w, id: w._id }))}
				columns={columns}
				className='bg-white !h-fit'
				localeText={heIL.components.MuiDataGrid.defaultProps.localeText}
				components={{ Toolbar: GridToolbar }}
				autoHeight
			/>
		</>
	)
}

interface IProps {
	workers: IUser[]
	mutate: () => Promise<void>
}

export default WorkersTable
