import {
  DefineConfig,
  DefineTokensSource,
  MapKeys,
  TokenData,
} from '../../common/config/types'
import isStringOrNumber from '../../common/utils/isStringOrNumber'
import consoleWarn from '../../common/fn/consoleWarn'
import mapTokenKeys from './mapTokenKeys'
import trimPassKeys from './trimPassKeys'
import { RecursivelyTokens } from '../../common/config/dev.types'
import forEach from '../../common/utils/forEach'
import namingCssKey from '../genCalcData/namingCssKey'
import getMappedRootKey from './getMappedRootKey'
import isPassKey from './isPassKey'

const MAX_RECURSIVE_COUNT = 40

/** @description "{key}" または "#{key}" を再帰的に置換する
 * "{(colors).primary.500}" にも対応するし、"primary.500" にも対応する */
export default function replaceVariables(source: DefineTokensSource) {
  const { tokens, config } = source
  const { tokens: mappedTokens } = trimPassKeys(mapTokenKeys(source))

  let recursiveCount = 0

  const execLoop = (
    data: RecursivelyTokens,
    ref: {
      originalTokens: RecursivelyTokens
      mappedTokens?: RecursivelyTokens
    },
    distError: boolean = true
  ) => {
    let newData: RecursivelyTokens = {}

    const repeat = (value: TokenData | string | number | undefined) => {
      if (typeof value === 'string') {
        const details = getVariableDetails(value)
        if (!details) {
          return value
        } else {
          let newValue = value
          const refs = {
            tokens: ref.originalTokens,
            mappedTokens: ref.mappedTokens,
            config,
            distError,
          }
          details.ref?.forEach(variable => {
            const jsKey = variable.replace(/^\{/, '').replace(/}$/, '')
            const replaced = replaceVariable(jsKey, 'ref', refs)
            if (replaced !== undefined) {
              newValue = newValue.replace(variable, String(replaced))
            }
          })
          details.css?.forEach(variable => {
            const jsKey = variable.replace(/^#\{/, '').replace(/}$/, '')
            const replaced = replaceVariable(jsKey, 'css', refs)
            if (replaced !== undefined) {
              newValue = newValue.replace(variable, String(replaced))
            }
          })
          return newValue
        }
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

    for (let key of Object.keys(data)) {
      newData[key] = repeat(data[key])
    }

    const getRefValuesList = (_data: RecursivelyTokens) => {
      const arr: string[] = []
      const repeat = (value: TokenData | string | number | undefined) => {
        if (isStringOrNumber(value)) {
          if (typeof value === 'string' && getVariableDetails(value)) {
            arr.push(value)
          }
        } else if (typeof value === 'object') {
          const keys = Object.keys(value)
          for (let key of keys) {
            repeat(value[key])
          }
        }
      }
      repeat(_data)
      return arr
    }

    const remainVars = getRefValuesList(newData)

    recursiveCount += 1

    if (recursiveCount > MAX_RECURSIVE_COUNT) {
      if (distError && remainVars.length) {
        // 限界までループ精査した後に、まだ {key} が残っていれば、ワーニングを出す
        remainVars.forEach(remainVar => {
          consoleWarn(
            `'${remainVar}' was not referenced in your token definitions.`
          )
        })
      }
    } else if (remainVars.length) {
      newData = execLoop(
        newData,
        {
          originalTokens: ref.originalTokens,
          mappedTokens: ref.mappedTokens,
        },
        distError
      )
    }

    return newData
  }

  const newTokens = execLoop(tokens, {
    originalTokens: tokens,
    mappedTokens: mappedTokens,
  })

  return {
    ...source,
    tokens: newTokens,
  }
}

const CSS_REG = new RegExp(/#{[^}]+}/g)
const REF_REG = new RegExp(/(?<!#){[^}]+}/g)

const getVariableDetails = (
  valueOrVariable: string
): { css?: string[]; ref?: string[] } | null => {
  const refMatched = valueOrVariable.match(REF_REG)
  const cssMatched = valueOrVariable.match(CSS_REG)

  if (refMatched || cssMatched) {
    return {
      ref: refMatched ?? undefined,
      css: cssMatched ?? undefined,
    }
  }
  return null
}

const isRefVariable = (valueOrVariable: string) =>
  !!valueOrVariable.match(REF_REG)

const isCssVariable = (valueOrVariable: string) =>
  !!valueOrVariable.match(CSS_REG)

export const replaceVariable = (
  variable: string,
  variableType: 'css' | 'ref',
  refs: {
    tokens: DefineTokensSource['tokens']
    mappedTokens?: DefineTokensSource['tokens']
    config?: DefineConfig
    distError?: boolean
  }
): string | number | undefined => {
  const { tokens, mappedTokens, config, distError = true } = refs

  const keys = keysConvert(variable)

  const getMatchedValue = (detectTokens: DefineTokensSource['tokens']) => {
    let matched: any
    let current: any = detectTokens
    for (let key of keys) {
      if (current !== undefined && current[key] !== undefined) {
        if (isStringOrNumber(current[key])) {
          matched = current[key]
          break
        } else {
          current = current[key]
        }
      } else {
        break // 重要
      }
    }
    return matched
  }

  let matchedValue = mappedTokens ? getMatchedValue(mappedTokens) : undefined
  if (!matchedValue) {
    matchedValue = getMatchedValue(tokens)
  }

  if (isStringOrNumber(matchedValue)) {
    // ここで css var の場合は、mapped後のcss key を生成しなければならない
    if (variableType === 'css') {
      const newKeys = getMappedPathKeys(keys, config?.mapKeys)
      return `var(--${namingCssKey(newKeys, config?.cssRules)})`
    }
    return matchedValue
  } else if (typeof matchedValue === 'object') {
    if (distError) {
      consoleWarn(`Variable of "${variable}" referred Object.`)
    }
    return undefined
  }
  return undefined
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

const getMappedPathKeys = (names: string[], mapKeys?: MapKeys) => {
  const rootKey = getMappedRootKey(names[0], mapKeys)
  const newNames = [rootKey]
    .concat(names.slice(1))
    .filter(str => !isPassKey(str))
  return newNames
}
