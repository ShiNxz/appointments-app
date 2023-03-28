import type { EventClickArg } from '@fullcalendar/core'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useState } from 'react'
import { toast } from 'react-toastify'
import Axios from '@/utils/functions/Axios'

const EventModal = ({ selectedEvent, setSelectedEvent, mutate }: IProps) => {
	const [isLoading, setIsLoading] = useState(false)

	const appId = selectedEvent?.event?._def?.extendedProps.appId
	const name = selectedEvent?.event?._def?.extendedProps.name

	const handleClose = () => setSelectedEvent(null)

	const handleDelete = async () => {
		if (!appId) return toast.error('אירעה שגיאה בעת מחיקת התור')

		setIsLoading(true)

		try {
			await Axios.delete(`/api/admin/appointments`, {
				data: { appId },
			})

			toast.success('התור בוטל בהצלחה!')
			await mutate()
			handleClose()
		} catch (error) {
			toast.error('אירעה שגיאה בעת מחיקת התור')
		}

		setIsLoading(false)
	}

	return (
		<Dialog
			open={!!selectedEvent}
			onClose={isLoading ? undefined : handleClose}
			fullWidth
		>
			<DialogTitle>מחיקה</DialogTitle>
			<DialogContent>
				<DialogContentText>האם אתה בטוח שאתה רוצה למחוק את התור של {selectedEvent?.event.title ? selectedEvent?.event.title : 'ללא שם'}</DialogContentText>
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
	selectedEvent: EventClickArg | null
	setSelectedEvent: (event: EventClickArg | null) => void
	mutate: () => Promise<void>
}

export default EventModal
