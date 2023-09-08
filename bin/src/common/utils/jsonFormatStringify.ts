import tabSpaces from './tabSpaces'
import wrapKey from './wrapKey'

type Data = {
  [p: string]: any
}
export default function jsonFormatStringify(data: Data) {
  const loop = (data: Data, s: number) => {
    let code = ''
    const keys = Object.keys(data)
    code += `{\n`
    keys.forEach(key => {
      const value = data[key]
      if (
        value !== null &&
        typeof value === 'object' &&
        !Array.isArray(value)
      ) {
        code += tabSpaces(s + 1) + `${wrapKey(key)}: ` + loop(value, s + 1)
      } else {
        code +=
          tabSpaces(s + 1) + `${wrapKey(key)}: ` + JSON.stringify(value) + ',\n'
      }
    })
    code += tabSpaces(s) + (s === 0 ? '}\n' : '},\n')
    return code
  }
  return loop(data, 0)
}
