export type RecursivelyData = {
  [p: string]: string | number | RecursivelyData | undefined
}

export default function toCleanJson<T>(
  data: T,
  shouldValid: (
    key: string,
    value: any,
    details: { nest: number; keys: string[] }
  ) => boolean
) {
  const loop = (data: any, nest: number, keys: string[]) => {
    const newData: RecursivelyData = {}
    const dataKeys = Object.keys(data)
    dataKeys.forEach(key => {
      const value = (data as any)[key]
      if (
        value !== null &&
        typeof value === 'object' &&
        !Array.isArray(value)
      ) {
        const obj = loop(value, nest + 1, keys.concat([key]))
        if (obj) newData[key] = obj
      } else {
        if (shouldValid(key, value, { nest, keys })) {
          newData[key] = value
        }
      }
    })
    const newKeys = Object.keys(newData)
    return newKeys.length ? newData : undefined
  }
  return loop(data, 0, [])
}
