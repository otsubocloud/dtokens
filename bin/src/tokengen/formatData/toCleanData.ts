import { DefineTokensSource, TokenData } from '../../common/config/types'
import isValidValue from '../../common/utils/isValidValue'
import isStringOrNumber from '../../common/utils/isStringOrNumber'
import isPassKey from './isPassKey'

const MAX_REPEAT = 10

/** @description stringとnumber以外は受け付けないように。
 * null や undefined や関数などの値を取り除く
 * */
export default function toCleanData(source: DefineTokensSource) {
  if (!source.tokens) {
    return source
  }
  const { tokens } = source

  let repeatCount = 0
  let invalidFlag = false
  const repeat = (tokens: any): any => {
    invalidFlag = false
    const recursive = (data: any) => {
      const newData: {
        [key: string]: string | number | TokenData
      } = {}
      for (let key of Object.keys(data)) {
        const v = data[key]
        const newKey = cleanJsonKey(key)
        if (isValidValue(v)) {
          if (isStringOrNumber(v)) {
            newData[newKey] = v
          } else {
            newData[newKey] = recursive(v)
          }
        } else {
          invalidFlag = true
        }
      }
      return newData
    }
    const newTokens = recursive(tokens)
    repeatCount += 1
    if (repeatCount > MAX_REPEAT) return newTokens
    return invalidFlag ? repeat(newTokens) : newTokens
  }

  const newTokens = repeat(tokens) as DefineTokensSource['tokens']

  return {
    ...source,
    tokens: newTokens,
  }
}

/** @description rootKeyとは違って./が含まれていることに注意
 * ※ space['1.5'] や　grid['1/3'] の入力を想定 */
const cleanJsonKey = (v: string) => {
  let key = v.replace(/[^a-zA-Z0-9-_./()]/g, '')

  if (!isPassKey(key)) {
    key = key.replace(/[()]/g, '')
  }
  return key
}
