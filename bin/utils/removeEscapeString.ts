export default function removeEscapeString(key: string) {
  return key.replace(/[^a-zA-Z0-9_]/g, '')
}
