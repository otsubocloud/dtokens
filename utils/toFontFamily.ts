export default function toFontFamily(names: string[]) {
  const arr: string[] = []
  for (let name of names) {
    const value = name.trim()
    if (value) {
      if (value.match(/\s/g)) {
        arr.push(`'${value}'`)
      } else {
        arr.push(value)
      }
    }
  }
  return arr.join(', ')
}
