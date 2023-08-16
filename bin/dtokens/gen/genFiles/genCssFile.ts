import {
  CalcData,
  DefineTokensSource,
} from '../../../config/types'
import { DEFAULT_OUTPUT_DIR } from '../const'
import tabSpaces from '../../../utils/tabSpaces'
import validateOutputPath from '../../../utils/validateOutputPath'
import consoleError from '../../../fn/consoleError'
import writeFile from './writeFile'

export default function genCssFile(
  dataSource: CalcData[],
  type: 'css' | 'scss',
  config?: DefineTokensSource['config'],
  options?: { consoleOnly?: boolean }
) {
  const isCss = type === 'css'

  const outfile = isCss
    ? config?.outputs?.cssFile ??
      `${DEFAULT_OUTPUT_DIR}/css.css`
    : config?.outputs?.scssFile ??
      `${DEFAULT_OUTPUT_DIR}/scss.scss`

  const objects = dataSource.filter(
    row => row.valueType === 'object'
  )
  const others = dataSource.filter(
    row => row.valueType !== 'object'
  )

  const contentCode = (spaceCount: number) => {
    const space = tabSpaces(spaceCount)

    const toVar = (key: string, value: string) => {
      return isCss
        ? `--${key}: ${value};`
        : `$${key}: ${value};`
    }

    let v = ''
    objects.forEach(({ parentKey, vars }) => {
      v += space + `/* ${parentKey} */\n`
      vars.forEach(({ key, value }) => {
        v += space + toVar(key, value) + '\n'
      })
      v += `\n`
    })

    if (others.length) {
      v += space + `/* others */\n`
      others.forEach(({ vars }) => {
        const { key, value } = vars[0] || {}
        v += space + toVar(key, value) + '\n'
      })
      v += `\n`
    }
    return v
  }

  let code = ''

  if (isCss) {
    code += `:root {\n`
    code += `\n`
    code += contentCode(1)
    code += `}\n`
  } else {
    code += contentCode(0)
  }

  const validOutfile = validateOutputPath(outfile, 'file')
  if (validOutfile) {
    writeFile(validOutfile, code, options?.consoleOnly)
  } else {
    consoleError(`"${outfile}" is invalid file path.`)
  }
}
