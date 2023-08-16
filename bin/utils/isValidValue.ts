import { TokenData } from '../config/types'

export default function isValidValue(
  value: any
): value is string | number | TokenData {
  if (value === null || value === undefined) return false

  const ofType = typeof value
  if (
    ofType === 'object' &&
    Object.keys(value).length > 0
  ) {
    return true
  } else if (
    ofType === 'string' ||
    ofType === 'number' ||
    ofType === 'bigint'
  ) {
    return true
  }
  return false
}
