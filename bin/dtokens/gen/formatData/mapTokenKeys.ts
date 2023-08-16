import { DefineTokensSource } from './../../../config/types'

export default function mapTokenKeys(
  source: DefineTokensSource
) {
  if (!source.tokens || !source?.config?.mapKeys) {
    return source
  }
  const { tokens } = source
  const { mapKeys } = source.config

  const newTokens: DefineTokensSource['tokens'] = {}

  const targetKeys = Object.keys(mapKeys)
  for (let key of Object.keys(tokens)) {
    const v = tokens[key]
    if (targetKeys.includes(key)) {
      const newKey = mapKeys[key]
      if (v) newTokens[newKey] = v
      delete newTokens[key]
    } else {
      newTokens[key] = v
    }
  }

  return {
    ...source,
    tokens: newTokens,
  }
}
