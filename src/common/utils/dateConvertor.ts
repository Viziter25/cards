export const date = (date: string) => {
  const number = Date.parse(date)
  const day = new Date(number).getDay()
  const mounth = new Date(number).getMonth()
  const year = new Date(number).getFullYear()
  return '' + (day > 9 ? day : '0' + day) + '.' + (mounth > 9 ? mounth : '0' + mounth) + '.' + year
}