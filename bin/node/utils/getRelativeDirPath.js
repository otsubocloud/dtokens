const { getRelativeProjectRoot } = require('./getRelativeProjectRoot')

exports.getRelativeDirPath = function (subPath, currentDirUrl) {
  const relativeCount = (() => {
    const baseCount = subPath.match(/\//g).length
    const prevCount = subPath.split('/').filter(str => str === '..').length
    return prevCount ? baseCount - prevCount - 1 : baseCount
  })()

  return (
    getRelativeProjectRoot(currentDirUrl) +
    [...Array(relativeCount)].map(_ => '../').join('')
  )
}
