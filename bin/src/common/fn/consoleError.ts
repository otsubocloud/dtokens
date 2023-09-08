import { red, reset } from '../utils/coloring'

export default function consoleError(message: string) {
  console.error(`${red}[dtokens error] ${message} ${reset}`)
}
