export const toKebabCase = (str: string = '') => {
  if (!str) return ''
  return String(str)
    .replace(/^[^A-Za-z0-9*]*|[^A-Za-z0-9*]*$/g, '')
    .replace(/([a-z])([A-Z])/g, function (m, a, b) {
      return a + '_' + b.toLowerCase()
    })
    .replace(/[^A-Za-z0-9*]+|_+/g, '-')
    .toLowerCase()
}

export const toSnakeCase = (str: string) => {
  if (!str) return ''
  return String(str)
    .replace(/^[^A-Za-z0-9*]*|[^A-Za-z0-9*]*$/g, '')
    .replace(/([a-z])([A-Z])/g, function (m, a, b) {
      return a + '_' + b.toLowerCase()
    })
    .replace(/[^A-Za-z0-9*]+|_+/g, '_')
    .toLowerCase()
}

export const toCamelCase = (str: string) => {
  if (!str) return ''
  return String(str)
    .replace(/^[^A-Za-z0-9*]*|[^A-Za-z0-9*]*$/g, '')
    .replace(/[^A-Za-z0-9*]+/g, '$')
    .replace(/([a-z])([A-Z])/g, function (m, a, b) {
      return a + '$' + b
    })
    .toLowerCase()
    .replace(/(\$)(\w)/g, function (m, a, b) {
      return b.toUpperCase()
    })
}

export const toPascalCase = (str: string) => {
  if (!str) return ''
  return String(str)
    .replace(/^[^A-Za-z0-9*]*|[^A-Za-z0-9*]*$/g, '$')
    .replace(/[^A-Za-z0-9*]+/g, '$')
    .replace(/([a-z])([A-Z])/g, function (m, a, b) {
      return a + '$' + b
    })
    .toLowerCase()
    .replace(/(\$)(\w?)/g, function (m, a, b) {
      return b.toUpperCase()
    })
}
