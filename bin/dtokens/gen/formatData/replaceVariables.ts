import {
  DefineTokensSource,
  TokenData,
} from '../../../config/types.ts'
import isStringOrNumber from '../../../utils/isStringOrNumber.ts'
import consoleError from '../../../fn/consoleError.ts'
import consoleWarn from '../../../fn/consoleWarn.ts'
import mapTokenKeys from './mapTokenKeys'

const MAX_RECURSIVE_COUNT = 40

export default function replaceVariables(
  source: DefineTokensSource
) {
  const { tokens } = source
  const { tokens: mappedTokens } = mapTokenKeys(source)

  let recursiveCount = 0

  const recursive = (
    tokens: DefineTokensSource['tokens']
  ) => {
    let newTokens: DefineTokensSource['tokens'] = {}

    const repeat = (
      value: TokenData | string | number | undefined
    ) => {
      if (typeof value === 'string') {
        return replaceVariable(value, tokens, mappedTokens)
      } else if (typeof value === 'number') {
        return value
      } else if (typeof value === 'object') {
        const d: TokenData = {}
        const keys = Object.keys(value)
        for (let key of keys) {
          d[key] = repeat(value[key])
        }
        return d
      }
    }

    for (let key of Object.keys(tokens)) {
      newTokens[key] = repeat(tokens[key])
    }

    const refValuesCount = (() => {
      let c = 0
      const repeat = (
        value: TokenData | string | number | undefined
      ) => {
        if (typeof value === 'string') {
          if (isVariable(value)) {
            c += 1
          }
        } else if (typeof value === 'number') {
        } else if (typeof value === 'object') {
          const keys = Object.keys(value)
          for (let key of keys) {
            repeat(value[key])
          }
        }
      }
      repeat(newTokens)
      return c
    })()

    recursiveCount += 1

    if (recursiveCount > MAX_RECURSIVE_COUNT) {
      consoleError(
        `Maximum ref-variable detections depth exceeded.`
      )
    } else if (refValuesCount) {
      newTokens = recursive(newTokens)
    }

    return newTokens
  }

  const newTokens = recursive(tokens)

  return {
    ...source,
    tokens: newTokens,
  }
}

const isVariable = (valueOrVariable: string) =>
  !!valueOrVariable.match(/^\{.*}$/)

const replaceVariable = (
  valueOrVariable: string,
  tokens: DefineTokensSource['tokens'],
  mappedTokens: DefineTokensSource['tokens']
): string | number | undefined => {
  if (isVariable(valueOrVariable)) {
    const variable = valueOrVariable
      .replace(/^\{/, '')
      .replace(/}$/, '')
    const keys = keysConvert(variable)

    const getMatchedValue = (
      detectTokens: DefineTokensSource['tokens']
    ) => {
      let matched: any
      let current: any = detectTokens
      for (let key of keys) {
        if (
          current !== undefined &&
          current[key] !== undefined
        ) {
          if (isStringOrNumber(current[key])) {
            matched = current[key]
            break
          } else {
            current = current[key]
          }
        }
      }
      return matched
    }

    let matchedValue = getMatchedValue(mappedTokens)
    if (!matchedValue) {
      matchedValue = getMatchedValue(tokens)
    }

    if (isStringOrNumber(matchedValue)) {
      return matchedValue
    } else if (typeof matchedValue === 'object') {
      consoleWarn(
        `Variable of "${valueOrVariable}" referred Object.`
      )
      return undefined
    } else {
      consoleWarn(
        `Variable of "${valueOrVariable}" is undefined.`
      )
      return undefined
    }
  } else {
    return valueOrVariable
  }
}

const keysConvert = (variable: string) => {
  const arr = variable.split('.')
  const keys: string[] = []
  let nums: string[] = []
  arr.forEach((str, i) => {
    if (str.match(/^[0-9]+$/)) {
      nums.push(str)
    } else {
      if (nums.length) {
        keys.push(nums.join('.'))
        nums = []
      }
      keys.push(str)
    }
  })
  if (nums.length) {
    keys.push(nums.join('.'))
  }
  return keys
}
