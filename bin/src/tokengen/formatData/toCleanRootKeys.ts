import { DefineTokensSource, MapKeys } from '../../common/config/types'
import isPassKey from './isPassKey'

/** @description tokensのrootKeyとmapKeysに不整合文字があれば取り除く
 * type型名の生成時に不整合が生まれないようにするため */
export default function toCleanRootKeys(source: DefineTokensSource) {
  if (!source.tokens) {
    return source
  }
  const { tokens, config } = source

  // clean token keys
  const newTokens: DefineTokensSource['tokens'] = {}
  Object.keys(tokens).map((key, i) => {
    const newKey = cleanRootKey(key)
    newTokens[newKey] = tokens[key]
  })

  // clean map keys
  if (!!config?.mapKeys) {
    const newMapKeys: MapKeys = {}
    Object.keys(config.mapKeys).map(key => {
      const newKey = cleanRootKey(key)
      const mapKey = config.mapKeys![key]
      if (mapKey) {
        newMapKeys[newKey] = cleanRootKey(mapKey)
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

const cleanRootKey = (v: string) => {
  let key = v.replace(/[^a-zA-Z0-9-_()]/g, '')

  if (!isPassKey(key)) {
    key = key.replace(/[()]/g, '')
  }
  return key
}
