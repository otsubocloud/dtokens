export default function getObjectValueFromPath(
  data: { [p: string]: any },
  pathKeys: string[]
):  any | undefined {
  let current = data
  for (let key of pathKeys) {
    let value = current?.[key]
    if (value !== undefined) {
      current = value
    } else {
      return
    }
  }
  return current
}
