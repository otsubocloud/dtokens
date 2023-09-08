import { CssRules, TokenData } from '../../common/config/types'
import tabSpaces from '../../common/utils/tabSpaces'
import isValidValue from '../../common/utils/isValidValue'
import wrapKey from '../../common/utils/wrapKey'
import isStringOrNumber from '../../common/utils/isStringOrNumber'
import namingCssKey from './namingCssKey'

export default function genTsVarCode(
  rootKey: string,
  data: string | number | TokenData,
  cssRules?: CssRules
) {
  const repeat = (
    data: TokenData | number | string,
    tabs: number,
    names: string[]
  ) => {
    if (isStringOrNumber(data)) {
      return `"var(--${namingCssKey(names, cssRules)})",\n`
    } else if (typeof data === 'object') {
      let str = `{\n`
      Object.keys(data).forEach(key => {
        const value = data[key]
        if (isValidValue(value)) {
          str +=
            tabSpaces(tabs) +
            `${wrapKey(key)}: ${repeat(value, tabs + 1, names.concat([key]))}`
        }
      })

      str += tabSpaces(tabs - 1) + (tabs === 1 ? '}' : `},\n`)
      return str
    }
  }

  return repeat(data, 1, [rootKey]) || ''
}
