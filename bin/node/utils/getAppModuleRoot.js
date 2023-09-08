const packageName = require('../../../package.json').name

exports.getAppModuleRootUrl = function () {
  const arr = __dirname.replace(/\\/g, '/').split('/')
  let nodeModuleIndex = null
  for (let i = arr.length - 1; i > 0; i--) {
    if (arr[i] === 'node_modules') {
      nodeModuleIndex = i
      break
    }
  }

  const cwdUrl = process.cwd().replace(/\\/g, '/')
  if (nodeModuleIndex !== null) {
    return cwdUrl + '/node_modules/' + packageName
  } else {
    return cwdUrl
  }
}
