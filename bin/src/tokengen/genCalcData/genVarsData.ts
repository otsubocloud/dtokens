import { TokenData, CssRules } from '../../common/config/types'
import { VarDataRow } from '../../common/config/dev.types'
import isStringOrNumber from '../../common/utils/isStringOrNumber'
import isValidValue from '../../common/utils/isValidValue'
import isPassKey from '../formatData/isPassKey'
import namingCssKey from './namingCssKey'
import namingJsKey from './namingJsKey'

export default function genVarsData(
  rootKey: string,
  data: string | number | TokenData,
  cssRules?: CssRules
): VarDataRow[] {
  const isRootPassKey = isPassKey(rootKey)

  if (isStringOrNumber(data)) {
    if (isRootPassKey) {
      return []
    }
    const pathKeys = [rootKey]
    return [
      {
        pathKeys: pathKeys,
        cssKey: namingCssKey(pathKeys, cssRules),
        jsKey: namingJsKey(pathKeys),
        value: data,
      },
    ]
  }

  const arr: VarDataRow[] = []

  const repeat = (data: TokenData, names: string[]) => {
    for (let key of Object.keys(data)) {
      const value = data[key]
      if (isValidValue(value)) {
        if (isStringOrNumber(value)) {
          const pathKeys = (() => {
            const arr = names.concat([key])
            if (isRootPassKey) {
              return arr.filter(key => key !== rootKey)
            }
            return arr
          })()
          arr.push({
            pathKeys,
            cssKey: namingCssKey(pathKeys, cssRules),
            jsKey: namingJsKey(pathKeys),
            value: value,
          })
        } else if (typeof value === 'object') {
          repeat(value, names.concat([key]))
        }
      }
    }
  }
  repeat(data as TokenData, [rootKey])

  return arr
}
