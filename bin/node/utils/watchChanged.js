const path = require('path')
const { watch } = require('./watch')
const { CONFIG_FILE_NAME } = require('../config/const')
const projectRoot = process.cwd()

exports.watchChanged = function (scriptType, callback) {
  watch(
    path.resolve(projectRoot, `${CONFIG_FILE_NAME}.${scriptType}`),
    () => {
      callback()
    },
    () => {
      console.log(`[error]: '${CONFIG_FILE_NAME}.${scriptType}' is not found.`)
      process.exit()
    }
  )
}
