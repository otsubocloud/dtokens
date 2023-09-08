
exports.getRelativeProjectRoot = function (fullPath) {
  const projectUrl = process.cwd().replace(/\\/g, '/')
  const currentDir = fullPath.split(projectUrl)[1]
  let path = ''
  const names = currentDir.split('/').filter(path => !!path)
  for (let i = names.length - 1; i >= 0; i--) {
    path += '../'
  }
  return path
}
