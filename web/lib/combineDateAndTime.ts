export const combineDateTime = (date:Date, timeString:string) => {
  const [hours, minutes, seconds] = timeString.split(":").map(Number)
  const result = new Date(date)
  result.setHours(hours, minutes, seconds || 0)
  return result
}