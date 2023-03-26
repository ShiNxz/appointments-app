// const FormatDate = (date: Date) => {
// 	const year = date.getFullYear().toString()
// 	const month = (date.getMonth() + 1).toString().padStart(2, '0')
// 	const day = date.getDate().toString().padStart(2, '0')
// 	return `${year}-${month}-${day}`
// }

const FormatDate = (date: Date): string => {
	const newDate = new Date(date)
	const currentOffset = newDate.getTimezoneOffset()
	const israelTZOffset = -2 * 60 // Israel is UTC+2
	const tzDiff = currentOffset / 60 - israelTZOffset / 60
	const tzPrefix = tzDiff >= 0 ? '+' : '-'
	const tzOffsetStr = `UTC${tzPrefix}${Math.abs(tzDiff)}` // fix that
	const formattedDate = newDate.toLocaleDateString('he-IL', { timeZone: 'Asia/Jerusalem' })
	// const formattedTime = newDate.toLocaleTimeString('he-IL', { timeZone: tzOffsetStr })
	return formattedDate
}

export default FormatDate
