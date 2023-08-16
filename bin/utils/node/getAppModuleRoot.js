import path from 'path'

export default function getAppModuleRootUrl() {
  const currentUrl = path.dirname(import.meta.url)
  const arr = currentUrl.split('/')
  let nodeModuleIndex = null
  for (let i = arr.length - 1; i > 0; i--) {
    if (arr[i] === 'node_modules') {
      nodeModuleIndex = i
      break
    }
  }

  if (nodeModuleIndex !== null) {
    return (
      process.cwd() +
      '/' +
      arr
        .slice(nodeModuleIndex, nodeModuleIndex + 2)
        .join('/')
    )
  } else {
    return process.cwd()
  }
}
