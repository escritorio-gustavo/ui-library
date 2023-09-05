const formatter = new Intl.NumberFormat(undefined, { notation: 'standard' })

export default function formatInt(value: number) {
  return formatter.format(value)
}
