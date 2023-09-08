export default function isStringOrNumber(
  value?: string | number | any
): value is string | number {
  return (
    typeof value === 'string' || typeof value === 'number'
  )
}
