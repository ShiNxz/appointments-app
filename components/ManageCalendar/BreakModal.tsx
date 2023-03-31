import type { EventClickArg } from '@fullcalendar/core'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Axios from '@/utils/functions/Axios'

const BreakModal = ({ selectedBreak, setSelectedBreak, mutate }: IProps) => {
	const [isLoading, setIsLoading] = useState(false)

	const breakId = selectedBreak?.event?._def?.extendedProps.appId
	console.log(selectedBreak?.event?._def)
	const handleClose = () => setSelectedBreak(null)

	const handleDelete = async () => {
		if (!breakId) return toast.error('אירעה שגיאה בעת מחיקת ההפסקה')

		setIsLoading(true)

		try {
			await Axios.delete(`/api/admin/user/breaks`, {
				data: { breakId },
			})

			toast.success('ההפסקה בוטלה בהצלחה!')
			await mutate()
			handleClose()
		} catch (error) {
			toast.error('אירעה שגיאה בעת מחיקת ההפסקה!')
		}

		setIsLoading(false)
	}

	return (
		<Dialog
			open={!!selectedBreak}
			onClose={isLoading ? undefined : handleClose}
			fullWidth
		>
			<DialogTitle>ביטול הפסקה</DialogTitle>
			<DialogContent>
				<DialogContentText>האם אתה בטוח שאתה רוצה לבטל את ההפסקה?</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={handleClose}
					disabled={isLoading}
				>
					ביטול
				</Button>
				<Button
					onClick={handleDelete}
					variant='contained'
					disabled={isLoading}
					color='warning'
				>
					אישור מחיקה
				</Button>
			</DialogActions>
		</Dialog>
	)
}

interface IProps {
	selectedBreak: EventClickArg | null
	setSelectedBreak: (event: EventClickArg | null) => void
	mutate: () => Promise<void>
}

export default BreakModal
