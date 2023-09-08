#!/usr/bin/env node
const { CONFIG_FILE_NAME } = require('./config/const')
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')
const { initConfig } = require('./init/init.js')
const { watchChanged } = require('./utils/watchChanged.js')
const { getRelativeDirPath } = require('./utils/getRelativeDirPath')

const argv = process.argv
const arg = argv[2]

const isWatch = argv.includes('--watch') || argv.includes('-w')

const projectRootUrl = process.cwd().replace(/\\/g, '/')

const { isConfigExist, scriptType } = (() => {
  const tsExit = fs.existsSync(
    path.join(projectRootUrl, `${CONFIG_FILE_NAME}.ts`)
  )
  const jsExit = fs.existsSync(
    path.join(projectRootUrl, `${CONFIG_FILE_NAME}.js`)
  )
  return {
    isConfigExist: tsExit || jsExit,
    scriptType: tsExit ? 'ts' : jsExit ? 'js' : null,
  }
})()

const tsExec = (subPath, scriptType) => {
  const currentDirUrl = __dirname.replace(/\\/g, '/')
  const relativePath = getRelativeDirPath(subPath, currentDirUrl)

  const currentDirPath = (() => {
    return '.' + currentDirUrl.split(projectRootUrl)[1]
  })()

  const cmd = scriptType === 'js' ? 'node' : 'ts-node -T --esm'

  try {
    const result = execSync(
      `cross-env RELATIVE_PATH=${relativePath} SCRIPT_TYPE=${scriptType} CONFIG_FILE_NAME=${CONFIG_FILE_NAME} ${cmd} ${currentDirPath}/${subPath}`
    )
    console.log(result.toString('utf-8'))
  } catch (e) {
    process.exit(1)
  }
}

const tokenGen = scriptType => {
  console.log('generating tokens files...')

  const subPath =
    scriptType === 'js' ? '../dist/tokengen/exec.js' : '../src/tokengen/exec.ts'

  tsExec(subPath, scriptType)

  if (isWatch) {
    console.log('start watching changed...')
    watchChanged(scriptType, () => {
      tsExec(subPath, scriptType)
    })
  }
}

if (!isWatch && !!arg && arg !== 'init') {
  console.warn(`"drokens ${arg}" is invalid command.`)
}
// - - -
// init
else if (arg === 'init') {
  if (isConfigExist) {
    import('inquirer').then(inquirer => {
      const prompt = inquirer.createPromptModule()
      prompt({
        name: `"${CONFIG_FILE_NAME.replace(
          '.',
          ' '
        )}" file is already exist:\nAre you sure you want to replace and reset the file?`,
        type: 'list',
        choices: ['[NO]: Cancel', '[YES]: Replace and reset'],
      }).then(res => {
        const result = res[Object.keys(res)[0]]
        const isYes = !!result.match(/\[YES]/)
        if (isYes) {
          initConfig(scriptType => tokenGen(scriptType))
        } else {
          console.log('init canceled.')
          process.exit()
        }
      })
    })
  } else {
    initConfig(scriptType => tokenGen(scriptType))
  }
}
// - - -
// normal
else {
  if (!isConfigExist) {
    initConfig(scriptType => tokenGen(scriptType))
  } else {
    tokenGen(scriptType)
  }
}
