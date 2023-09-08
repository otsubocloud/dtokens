import { DefineTokensSource } from '../common/config/types'
import genScriptFile from './genFiles/genScriptFile'
import genCssFile from './genFiles/genCssFile'
import genJsonFile from './genFiles/genJsonFile'
import formatData from './formatData'
import { DEFAULT_OUTPUT_DIR } from './const'
import validate from '../common/fn/validate'

const relativeProjectRoot = process.env.RELATIVE_PATH
const scriptType = process.env.SCRIPT_TYPE
const configFileName = process.env.CONFIG_FILE_NAME
const targetFile =
  scriptType === 'js' ? `${configFileName}.js` : `${configFileName}.ts`

import(relativeProjectRoot + targetFile).then(s => {
  const source = s.default.default as DefineTokensSource

  const { isError, isValidTokens } = validate(source)
  if (isError) {
    throw new Error('')
    process.exit(1)
  }

  const { config } = source

  const { tsFile, cssFile, scssFile, jsonFile, jsFile } = (() => {
    const outputs = config?.outputs
    const isEmpty = !outputs || !Object.keys(outputs).length
    return {
      tsFile: isEmpty ? DEFAULT_OUTPUT_DIR + '/index.ts' : outputs?.tsFile,
      cssFile: isEmpty ? DEFAULT_OUTPUT_DIR + '/css.css' : outputs?.cssFile,
      scssFile: isEmpty ? DEFAULT_OUTPUT_DIR + '/scss.scss' : outputs?.scssFile,
      jsFile: outputs?.jsFile,
      jsonFile: outputs?.jsonFile,
    }
  })()

  const { mappedData, calcSource } = formatData(source)

  if (isValidTokens) {
    if (tsFile) {
      genScriptFile(calcSource, 'ts', tsFile, config)
    }
    if (jsFile) {
      genScriptFile(calcSource, 'js', jsFile, config)
    }
    if (cssFile) {
      genCssFile(calcSource, 'css', cssFile, config)
    }
    if (scssFile) {
      genCssFile(calcSource, 'scss', scssFile, config)
    }
    if (jsonFile) {
      genJsonFile(mappedData, jsonFile)
    }
  }

  console.log('\u2705  The tokens files are generated.')
  ;(() => {
    const data = {
      TS: tsFile,
      JS: jsFile,
      CSS: cssFile,
      SCSS: scssFile,
      JSON: jsonFile,
    }
    Object.entries(data).forEach(([key, outfile]) => {
      if (outfile) console.log(`\u2728 ${key} File --> ${outfile}`)
    })
  })()
})
