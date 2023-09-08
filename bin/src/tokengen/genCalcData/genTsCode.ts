import { TokenData } from '../../common/config/types'
import tabSpaces from '../../common/utils/tabSpaces'
import isValidValue from '../../common/utils/isValidValue'
import wrapKey from '../../common/utils/wrapKey'

export default function genTsCode(
  data: string | number | TokenData,
  mode: 'json' | 'type' | 'type-var'
) {
  const repeat = (data: TokenData | number | string, tabs: number) => {
    if (typeof data === 'string' || typeof data === 'number') {
      return mode === 'json'
        ? `${typeof data === 'string' ? `"${data}"` : data},\n`
        : mode === 'type'
        ? `${typeof data === 'string' ? 'string' : 'number'}\n`
        : `string\n`
    } else if (typeof data === 'object') {
      let str = `{\n`
      Object.keys(data).forEach(key => {
        const value = data[key]
        if (isValidValue(value)) {
          str += tabSpaces(tabs) + `${wrapKey(key)}: ${repeat(value, tabs + 1)}`
        }
      })

      str +=
        tabSpaces(tabs - 1) +
        (tabs === 1 ? '}' : mode === 'json' ? `},\n` : `}\n`)
      return str
    }
  }

  return repeat(data, 1) || ''
}
