exports.getAppModuleRootUrl = function () {
  const arr = __dirname.split('/')
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
