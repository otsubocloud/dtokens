import { MapKeys } from '../../common/config/types'

export default function getMappedRootKey(key: string, mapKeys?: MapKeys) {
  if (!mapKeys) return key
  const oldKeys = Object.keys(mapKeys)
  for (let oldKey of oldKeys) {
    const newKey = mapKeys[oldKey]
    if (key === oldKey) {
      return newKey
    }
  }
  return key
}
