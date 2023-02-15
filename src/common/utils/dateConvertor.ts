export const date = (date: string) => {
  return (new Date(Date.parse(date)).toLocaleDateString())
}