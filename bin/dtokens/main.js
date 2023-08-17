#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const {
  getAppModuleRootUrl,
} = require('../utils/node/getAppModuleRoot.js')
const {
  nodeQuestion,
} = require('../utils/node/nodeQuestion.js')
const {
  getRelativeProjectRoot,
} = require('../utils/node/getRelativeProjectRoot.js')

const INIT_CONFIG_FILE = 'bin/dtokens/init.config.ts'
const IS_DEV = false

const arg = process.argv[2]
const projectRootUrl = process.cwd()
const appModuleRootUrl = getAppModuleRootUrl()

const currentAbsoluteDir = (() => {
  const fullPath = __dirname
  const projectRoot = process.cwd()
  return '.' + fullPath.split(projectRoot)[1]
})()

const isConfigExist = fs.existsSync(
  path.join(projectRootUrl, 'dtokens.config.ts')
)

const relativePath = getRelativeProjectRoot(__dirname)

const initConfig = () => {
  let data = fs.readFileSync(
    path.join(appModuleRootUrl, INIT_CONFIG_FILE),
    'utf-8'
  )
  data = data.replace(/\/\/ @ts-ignore\n/g, '')
  if (process.env.NODE_ENV === 'dtokens-dev') {
    data = data.replace('{root}', './user')
    data = data.replace('{presets}', './presets')
  } else if (IS_DEV) {
    data = data.replace(
      '{root}',
      './node_modules/dtokens/user'
    )
    data = data.replace(
      '{presets}',
      './node_modules/dtokens/presets'
    )
  } else {
    data = data.replace('{root}', 'dtokens')
    data = data.replace('{presets}', 'dtokens/presets')
  }
  fs.writeFileSync(
    path.join(projectRootUrl, 'dtokens.config.ts'),
    data
  )
  console.log('Initialization is complete.')
}

const tokenGen = () => {
  const result = execSync(
    `RELATIVE_PATH=${relativePath} ts-node --esm ${currentAbsoluteDir}/gen/exec.ts`
  )
  console.log(result.toString('utf-8'))
}

if (!!arg && arg !== 'init') {
  console.warn(`"drokens ${arg}" is invalid command.`)
}
// - - -
// init
else if (arg === 'init') {
  if (isConfigExist) {
    nodeQuestion(
      'dtokens.config.ts file is already exist. \nAre you sure you want to replace and reset the file? (y)',
      answer => {
        if (answer === 'y') {
          initConfig()
          tokenGen()
        }
      }
    )
  } else {
    initConfig()
    tokenGen()
  }
}
// - - -
// normal
else {
  if (!isConfigExist) {
    initConfig()
  }
  tokenGen()
}
