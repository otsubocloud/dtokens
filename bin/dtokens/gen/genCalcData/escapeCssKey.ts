import { invalidRegExp } from '../const'

export default function escapeCssKey(key: string) {
  // ok ".", "/"
  return key
    .replace(invalidRegExp, '')
    .replace(/\./g, '\\.')
    .replace(/\//g, '\\/')
}
