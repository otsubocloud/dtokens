const { CONFIG_FILE_NAME } = require('../config/const')
const fs = require('fs')
const path = require('path')
const { getAppModuleRootUrl } = require('../utils/getAppModuleRoot')
const packageName = require('./../../../package.json').name
const projectRootUrl = process.cwd().replace(/\\/g, '/')
const appModuleRootUrl = getAppModuleRootUrl()

exports.initConfig = function (callback) {
  const initFile = scriptType => {
    const configFileName =
      scriptType === 'js' ? `${CONFIG_FILE_NAME}.js` : `${CONFIG_FILE_NAME}.ts`
    const removeFileName =
      scriptType === 'js' ? `${CONFIG_FILE_NAME}.ts` : `${CONFIG_FILE_NAME}.js`

    let data = fs.readFileSync(
      path.join(appModuleRootUrl, 'bin/node/init/init.config.ts'),
      'utf-8'
    )

    if (scriptType === 'js') {
      data = data.replace(/import {/g, 'const {')
      data = data.replace(/} from '/g, `} = require('`)
      data = data.replace(/}'\n/g, `}')\n`)
      data = data.replace('export default ', `exports.default = `)
      data = data.replace('tsFile:', `jsFile:`)
      data = data.replace('index.ts', `index.js`)
    }

    data = data.replace(/\/\/ @ts-ignore\n/g, '')
    if (process.env.NODE_ENV === 'dtokens-dev') {
      data = data.replace('{root}', './user')
      data = data.replace('{presets}', './presets')
    } else {
      data = data.replace('{root}', packageName)
      data = data.replace('{presets}', packageName + '/presets')
    }
    fs.writeFileSync(path.join(projectRootUrl, configFileName), data)
    console.log('Initialization is complete.')

    if (fs.existsSync(path.join(projectRootUrl, removeFileName))) {
      fs.rmSync(path.join(projectRootUrl, removeFileName))
    }

    callback(scriptType)
  }

  import('inquirer').then(inquirer => {
    const prompt = inquirer.createPromptModule()
    prompt({
      name: 'Please choose script type of configuration',
      type: 'list',
      choices: [
        'Typescript (ESModule/import)',
        'Javascript (CommonJS/require)',
      ],
    }).then((res, d) => {
      const result = res[Object.keys(res)[0]]
      const scriptType = result.match(/Typescript/) ? 'ts' : 'js'
      initFile(scriptType)
    })
  })
}
