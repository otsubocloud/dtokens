import tabSpaces from './tabSpaces'
import { toKebabCase } from './toCase'

type Data = {
  [p: string]: string | number | Data | undefined | null
}

export default function jsonToCssCode(
  data: any,
  options?: {
    trimBrackets?: boolean
    nest?: boolean
  }
) {
  const { trimBrackets } = options || {}
  const loop = (data: Data, s: number) => {
    let code = ''
    const keys = Object.keys(data)
    if (!trimBrackets) code += `{\n`
    keys.forEach(key => {
      const value = data[key]
      if (
        value !== null &&
        typeof value === 'object' &&
        !Array.isArray(value)
      ) {
        code += tabSpaces(s + 1) + `${key}: ` + loop(value, s + 1)
      } else {
        const cssKey = toKebabCase(key)
        code += tabSpaces(s + 1) + `${cssKey}: ` + value + ';\n'
      }
    })
    if (!trimBrackets) code += tabSpaces(s) + '}\n'
    return code
  }
  return loop(data, trimBrackets ? -1 : 0)
}
