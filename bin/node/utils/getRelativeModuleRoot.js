const {
  getAppModuleRootUrl,
} = require('./getAppModuleRoot')

exports.getRelativeModuleRoot = function (fullPath) {
  const moduleUrl = getAppModuleRootUrl().replace(
    /\\/g,
    '/'
  )
  const currentDir = fullPath.split(moduleUrl)[1]
  let path = ''
  const names = currentDir.split('/').filter(path => !!path)
  for (let i = names.length - 1; i >= 0; i--) {
    path += '../'
  }
  return path
}
