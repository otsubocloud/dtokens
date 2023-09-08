export default function wrapKey(key: string) {
  if (key.match(/^[0-9]+$/)) {
    return key
  } else if (
    key[0].match(/[0-9]/) ||
    !key.match(/^[0-9a-zA-Z_]+$/)
  ) {
    return `"${key}"`
  } else {
    return key
  }
}
