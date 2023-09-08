import {
  DefineTokens,
  DefineTokensSource,
  TokenData,
} from '../../common/config/types'

export default function mapTokenKeys(source: DefineTokensSource) {
  if (!source.tokens || !source?.config?.mapKeys) {
    return source
  }
  const { tokens } = source
  const { mapKeys } = source.config

  const targetKeys = Object.keys(mapKeys).filter(key => key !== 'BOOK_BG')

  const mapTokens = (tokens: DefineTokens) => {
    const newTokens: DefineTokensSource['tokens'] = {}
    for (let key of Object.keys(tokens)) {
      const v = tokens[key]
      if (targetKeys.includes(key)) {
        const newKey = mapKeys[key]

        if (v) {
          // 既に存在している場合はマージ
          const alreadyValue = newTokens[newKey]
          if (!!alreadyValue) {
            newTokens[newKey] = mergeAlreadyValue(alreadyValue, v)
          } else {
            newTokens[newKey] = v
          }
        }
      } else {
        newTokens[key] = v
      }
    }
    return newTokens
  }

  const newTokens: DefineTokens = mapTokens(tokens)

  return {
    ...source,
    tokens: newTokens,
  }
}

const mergeAlreadyValue = (
  alreadyValue: string | number | TokenData,
  v: string | number | TokenData
) => {
  if (typeof alreadyValue === 'object' && typeof v === 'object') {
    return {
      ...alreadyValue,
      ...v,
    }
  }
  /*else if (
		typeof alreadyValue === 'object' &&
		typeof v !== 'object'
	) {
		return {
			...alreadyValue,
			value: v,
		}
	} else if (
		typeof alreadyValue !== 'object' &&
		typeof v === 'object'
	) {
		return {
			...v,
			value: alreadyValue,
		}
	}*/
  return v
}
