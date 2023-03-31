import type { Times } from '@/utils/functions/TimeSlots'
import type { INewAppBody } from '@/pages/api/appointments'
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@mui/material'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import Axios from '@/utils/functions/Axios'
import FormatDate from '@/utils/functions/FormatDate'
import TimesDropdown from './TimesDropdown'

const CalendarModal = ({ times, selectedDate, setSelectedDate, mutate }: IProps) => {
	const [isLoading, setIsLoading] = useState(false)

	const router = useRouter()
	const { userId } = router.query as { userId: string }

	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')

	const [time, setTime] = useState<Times>({
		start: (times && times[0].start) || '',
		end: (times && times[0].end) || '',
	})

	const handleClose = () => setSelectedDate(null)

	const handleSubmit = async () => {
		if (!selectedDate || !userId) return toast.error('אירעה שגיאה בעת קביעת התור')
		setIsLoading(true)

		const data: INewAppBody = { date: selectedDate, userId, time, name, phone }

		try {
			await Axios.post('/api/appointments', data)
			toast.success('התור נקבע בהצלחה')
			await mutate()
			handleClose()
		} catch (error) {
			toast.error('אירעה שגיאה בעת קביעת התור')
		}

		setIsLoading(false)
	}

	return (
		<Dialog
			open={!!selectedDate}
			onClose={isLoading ? undefined : handleClose}
			fullWidth
		>
			<DialogTitle>קביעת תור לתאריך {selectedDate && FormatDate(selectedDate)}</DialogTitle>
			<DialogContent>
				<DialogContentText>יש לרשום שם מלא וטלפון</DialogContentText>
				<div className='gap-4 flex flex-col my-8'>
					<TimesDropdown
						time={time}
						times={times || []}
						setTime={setTime}
					/>
					<TextField
						id='name'
						label='שם'
						variant='outlined'
						value={name}
						onChange={(e) => setName(e.target.value)}
						disabled={isLoading}
					/>
					<TextField
						id='phone'
						label='טלפון'
						variant='outlined'
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						disabled={isLoading}
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
	times: Times[] | null
	selectedDate: Date | null
	setSelectedDate: (date: Date | null) => void
	mutate: () => Promise<void>
}

export default CalendarModal
