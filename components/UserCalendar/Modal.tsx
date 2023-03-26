import type { ISpecialDate } from '@/utils/models/User'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { TimeField } from '@mui/x-date-pickers'
import Axios from '@/utils/functions/Axios'
import dayjs, { Dayjs } from 'dayjs'
import FormatDate from '@/utils/functions/FormatDate'
import moment from 'moment'

const CalendarModal = ({ selectedDate, setSelectedDate, mutate }: IProps) => {
	const [isLoading, setIsLoading] = useState(false)

	const [start, setStart] = useState<Dayjs | null>(dayjs())
	const [end, setEnd] = useState<Dayjs | null>(dayjs())

	const handleClose = () => setSelectedDate(null)

	const handleSubmit = async () => {
		if (!start || !end) return toast.error('יש לבחור שעת התחלה ושעת סיום')
		if (!selectedDate) return toast.error('אירעה שגיאה בעת קביעת הזמנים')

		setIsLoading(true)

		try {
			const data: ISpecialDate = {
				start: moment(start.toDate(), 'HH:mm').format('HH:mm'),
				end: moment(end.toDate(), 'HH:mm').format('HH:mm'),
				date: FormatDate(selectedDate),
			}

			await Axios.post('/api/admin/user/times', data)

			toast.success('הזמנים לתאריך נקבעו בהצלחה')
			await mutate()
			handleClose()
		} catch (error) {
			toast.error('אירעה שגיאה בעת קביעת הזמנים')
		}

		setIsLoading(false)
	}

	return (
		<Dialog
			open={!!selectedDate}
			onClose={isLoading ? undefined : handleClose}
			fullWidth
		>
			<DialogTitle>קביעת זמני תורים לתאריך {selectedDate && FormatDate(selectedDate)}</DialogTitle>
			<DialogContent>
				<DialogContentText>יש לבחור שעת התחלה ושעת סיום</DialogContentText>
				<div className='flex flex-row gap-4 items-center py-8'>
					<TimeField
						label='שעת התחלה'
						value={start}
						onChange={(newValue) => setStart(newValue)}
						format='HH:mm'
					/>
					<TimeField
						label='שעת סיום'
						value={end}
						onChange={(newValue) => setEnd(newValue)}
						format='HH:mm'
					/>
				</div>
			</DialogContent>
			<DialogActions>
				<Button
					onClick={handleClose}
					disabled={isLoading}
				>
					ביטול
				</Button>
				<Button
					onClick={handleSubmit}
					variant='contained'
					disabled={isLoading}
				>
					אישור
				</Button>
			</DialogActions>
		</Dialog>
	)
}

interface IProps {
	selectedDate: Date | null
	setSelectedDate: (date: Date | null) => void
	mutate: () => Promise<void>
}

interface ITimes {
	start: string
	end: string
}

export default CalendarModal
