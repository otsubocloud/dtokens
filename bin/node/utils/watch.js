const { lstatSync, existsSync } = require('fs')

exports.watch = function (path, changedCallback, errorCallback) {
  let lastCTime = null
  setInterval(() => {
    if (existsSync(path)) {
      const ctime = String(lstatSync(path).ctime)
      // 初回は判定を除く
      if (lastCTime !== null && lastCTime !== ctime) {
        changedCallback()
      }
      lastCTime = ctime
    } else {
      errorCallback?.()
    }
  }, 3000)
}
