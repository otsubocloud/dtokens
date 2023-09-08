import { reset, yellow } from '../utils/coloring'

export default function consoleWarn(message: string) {
  console.warn(`${yellow}[dtokens warn] ${message}${reset}`)
}
