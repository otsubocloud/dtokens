import {
  DefineTokensSource,
  TokenData,
} from '../../../config/types.ts'
import { invalidRegExp } from '../const'
import isValidValue from '../../../utils/isValidValue'
import isStringOrNumber from '../../../utils/isStringOrNumber'

const MAX_REPEAT = 10

export default function toCleanData(
  source: DefineTokensSource
) {
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
        const newKey = key.replace(invalidRegExp, '')
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

  const newTokens = repeat(
    tokens
  ) as DefineTokensSource['tokens']

  return {
    ...source,
    tokens: newTokens,
  }
}
