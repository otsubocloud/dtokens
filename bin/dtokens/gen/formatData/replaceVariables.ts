import {
  DefineTokensSource,
  TokenData,
} from '../../../config/types.ts'
import isStringOrNumber from '../../../utils/isStringOrNumber.ts'
import consoleError from '../../../fn/consoleError.ts'
import consoleWarn from '../../../fn/consoleWarn.ts'

const MAX_RECURSIVE_COUNT = 40

export default function replaceVariables(
  config: DefineTokensSource
) {
  const { tokens } = config

  let recursiveCount = 0

  const recursive = (
    tokens: DefineTokensSource['tokens']
  ) => {
    let newTokens: DefineTokensSource['tokens'] = {}

    const repeat = (
      value: TokenData | string | number | undefined
    ) => {
      if (typeof value === 'string') {
        return replaceVariable(value, tokens)
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
    ...config,
    tokens: newTokens,
  }
}

const isVariable = (valueOrVariable: string) =>
  !!valueOrVariable.match(/^\{.*}$/)

const replaceVariable = (
  valueOrVariable: string,
  tokens: DefineTokensSource['tokens']
): string | number | undefined => {
  if (isVariable(valueOrVariable)) {
    const variable = valueOrVariable
      .replace(/^\{/, '')
      .replace(/}$/, '')
    const keys = variable.split('.')

    let matchedValue: any
    let current: any = tokens
    for (let key of keys) {
      if (
        current !== undefined &&
        current[key] !== undefined
      ) {
        if (isStringOrNumber(current[key])) {
          matchedValue = current[key]
          break
        } else {
          current = current[key]
        }
      }
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
