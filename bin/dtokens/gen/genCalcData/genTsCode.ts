import { TokenData } from '../../../config/types'
import tabSpaces from '../../../utils/tabSpaces'
import isValidValue from '../../../utils/isValidValue'
import wrapKey from './wrapKey'

export default function genTsCode(
  data: string | number | TokenData,
  mode: 'json' | 'type'
) {
  const repeat = (
    data: TokenData | number | string,
    tabs: number
  ) => {
    if (
      typeof data === 'string' ||
      typeof data === 'number'
    ) {
      return mode === 'json'
        ? `${
            typeof data === 'string' ? `"${data}"` : data
          },\n`
        : `${
            typeof data === 'string' ? 'string' : 'number'
          }\n`
    } else if (typeof data === 'object') {
      let str = `{\n`
      Object.keys(data).forEach(key => {
        const value = data[key]
        if (isValidValue(value)) {
          str +=
            tabSpaces(tabs) +
            `${wrapKey(key)}: ${repeat(value, tabs + 1)}`
        }
      })

      str +=
        tabSpaces(tabs - 1) +
        (tabs === 1
          ? '}'
          : mode === 'json'
          ? `},\n`
          : `}\n`)
      return str
    }
  }

  return repeat(data, 1) || ''
}
