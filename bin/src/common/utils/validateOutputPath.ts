export default function validateOutputPath(
  path: string | undefined,
  expect: 'file' | 'directory'
) {
  if (!path) return null

  const last = path
    .split('/')
    .filter(str => !!str)
    .pop()

  if (expect === 'directory') {
    if (!last || last?.includes('.')) {
      return null
    }
    return path
      .split('/')
      .filter(str => !!str)
      .join('/')
  } else {
    if (path.match(/.+\/$/)) {
      return null
    }
    if (!last || !last?.includes('.')) {
      return null
    }
    return path
      .split('/')
      .filter(str => !!str)
      .join('/')
  }
}
