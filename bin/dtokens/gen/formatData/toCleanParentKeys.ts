import {
  DefineTokensSource,
  MapKeys,
} from '../../../config/types.ts'
import removeEscapeString from '../../../utils/removeEscapeString'
import { toCamelCase } from 'js-convert-case'

export default function toCleanParentKeys(
  source: DefineTokensSource
) {
  if (!source.tokens) {
    return source
  }
  const { tokens, config } = source

  const clean = (v: string) => {
    return toCamelCase(removeEscapeString(v))
  }

  // clean token keys
  const newTokens: DefineTokensSource['tokens'] = {}
  Object.keys(tokens).map((key, i) => {
    const newKey = clean(key)
    newTokens[newKey] = tokens[key]
  })

  // clean map keys
  if (!!config?.mapKeys) {
    const newMapKeys: MapKeys = {}
    Object.keys(config.mapKeys).map(key => {
      const newKey = clean(key)
      const mapKey = config.mapKeys![key]
      if (mapKey) {
        newMapKeys[newKey] = clean(mapKey)
      }
    })
    return {
      ...source,
      config: { ...config, mapKeys: newMapKeys },
      tokens: newTokens,
    }
  }

  return {
    ...source,
    tokens: newTokens,
  }
}
