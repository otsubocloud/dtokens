import _path from 'path'
import chalk from 'chalk'
import { DefineTokensSource } from '../../config/types.ts'
import replaceVariables from './formatData/replaceVariables.ts'
import mapTokenKeys from './formatData/mapTokenKeys.ts'
import toCleanData from './formatData/toCleanData'
import genCalcData from './genCalcData'
import genTsFile from './genFiles/genTsFile'
import genCssFile from './genFiles/genCssFile'
import getRelativeProjectRoot from '../../utils/node/getRelativeProjectRoot.ts'

const relativeProjectRoot = getRelativeProjectRoot(
  _path.dirname(import.meta.url)
)

import(relativeProjectRoot + 'dtokens.config.ts').then(
  s => {
    const source = s.default as DefineTokensSource
    const { config } = source

    const targets = config?.targets

    let data = replaceVariables(source)
    data = mapTokenKeys(data)
    data = toCleanData(data)

    const calcData = genCalcData(data)

    if (!targets || targets?.includes('ts')) {
      genTsFile(calcData, config)
    }

    if (!targets || targets?.includes('css')) {
      genCssFile(calcData, 'css', config)
    }

    if (!targets || targets?.includes('scss')) {
      genCssFile(calcData, 'scss', config)
    }

    console.log(
      chalk.green('The configured tokens are generated.')
    )
  }
)
