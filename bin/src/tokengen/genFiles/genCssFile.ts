import { DefineTokensSource } from '../../common/config/types'
import { GenCalcData, GenCalcSource } from '../../common/config/dev.types'
import tabSpaces from '../../common/utils/tabSpaces'
import validateOutputPath from '../../common/utils/validateOutputPath'
import consoleError from '../../common/fn/consoleError'
import writeFile from './writeFile'
import forEach from '../../common/utils/forEach'
import { NOT_EDIT_MESSAGE } from '../const'

export default function genCssFile(
  calcSource: GenCalcSource,
  type: 'css' | 'scss',
  outfile?: string,
  config?: DefineTokensSource['config'],
  options?: { consoleOnly?: boolean; forBook?: boolean }
) {
  const isCss = type === 'css'
  const { forBook, consoleOnly } = options || {}

  const contentCode = (
    rows: GenCalcData[],
    spaceCount: number,
    valuesType: 'pure-value' | 'css-var' = 'pure-value',
    prefix: string = ''
  ) => {
    const space = tabSpaces(spaceCount)

    const objects = rows.filter(row => row.valueType === 'object')
    const others = rows.filter(row => row.valueType !== 'object')

    const toVar = (key: string, value: string | number) => {
      if (isCss) {
        return `--${key}: ${value};`
      } else {
        if (valuesType === 'pure-value') {
          return `$${prefix}${key}: ${value};`
        } else {
          return `$${prefix}${key}: var(--${key});`
        }
      }
    }

    let v = ''

    objects.forEach(({ rootKey, vars }) => {
      v += space + `/* ${rootKey} */\n`
      vars.forEach(({ cssKey, value }) => {
        v += space + toVar(cssKey, value) + '\n'
      })
    })

    if (others.length) {
      v += space + `/* others */\n`
      others.forEach(({ vars }) => {
        const { cssKey, value } = vars[0] || {}
        v += space + toVar(cssKey, value) + '\n'
      })
    }
    return v
  }

  let code = ''

  code += NOT_EDIT_MESSAGE
  code += '\n'

  if (isCss) {
    code += `:root {\n`
    code += contentCode(calcSource.tokens, 1)
    code += `}\n`
    code += `\n`
  } else {
    const { scssWithV = true, scssPriority = 'pure-value' } =
      config?.values || {}

    code += contentCode(calcSource.tokens, 0, scssPriority)

    if (scssWithV) {
      code += `\n`
      code += `/* - - - - - - - -\n`
      code += `css variables\n`
      code += `- - - - - - - - - */\n`
      code += `\n`
      code += contentCode(
        calcSource.tokens,
        0,
        scssPriority === 'css-var' ? 'pure-value' : 'css-var',
        'v-'
      )
    }
  }

  if (!outfile) {
    return code
  }

  const validOutfile = validateOutputPath(outfile, 'file')
  if (validOutfile) {
    writeFile(validOutfile, code, consoleOnly)
  } else {
    consoleError(`"${outfile}" is invalid file path.`)
  }
}
