import { invalidRegExp } from '../const'

export default function escapeJsonKey(key: string) {
  return key
    .replace(invalidRegExp, '')
}
