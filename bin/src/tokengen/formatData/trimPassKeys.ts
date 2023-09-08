import { DefineTokens, DefineTokensSource } from '../../common/config/types'
import { RecursivelyTokens } from '../../common/config/dev.types'
import isPassKey from './isPassKey'
import isStringOrNumber from '../../common/utils/isStringOrNumber'

/** @description
 * "(pass_key)": 400 などの不正値も取り除く
 * */
export default function trimPassKeys(
  source: DefineTokensSource,
  skipRootConvert?: boolean
) {
  if (!source.tokens) {
    return source
  }
  const { tokens } = source

  const loop = (tokens: RecursivelyTokens, i: number) => {
    const isSkip = skipRootConvert && i === 0
    let newTokens: RecursivelyTokens = {}
    Object.keys(tokens).forEach(key => {
      const data = tokens[key]
      if (isPassKey(key) && !isSkip) {
        if (typeof data === 'object') {
          newTokens = {
            ...newTokens,
            ...loop(data, i + 1),
          }
        }
      } else {
        if (isStringOrNumber(data)) {
          newTokens[key] = data
        } else if (!!data) {
          newTokens[key] = loop(data, i + 1)
        }
      }
    })
    return newTokens
  }
  const newTokens: DefineTokens = loop(tokens, 0)

  return {
    ...source,
    tokens: newTokens,
  }
}
