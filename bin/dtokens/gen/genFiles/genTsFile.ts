import {
  CalcData,
  DefineTokensSource,
} from '../../../config/types'

import { DEFAULT_OUTPUT_DIR } from '../const'
import tabSpaces from '../../../utils/tabSpaces'
import validateOutputPath from '../../../utils/validateOutputPath'
import consoleError from '../../../fn/consoleError'
import writeFile from './writeFile'

export default function genTsFile(
  dataSource: CalcData[],
  config?: DefineTokensSource['config'],
  options?: { consoleOnly?: boolean }
) {
  const outfile =
    config?.outputs?.tsFile ||
    DEFAULT_OUTPUT_DIR + '/index.ts'

  const objects = dataSource.filter(
    row => row.valueType === 'object'
  )
  const allVars = (() => {
    let arr: { key: string; value: string }[] = []
    dataSource.forEach(row => {
      arr = arr.concat(row.vars)
    })
    return arr
  })()

  let code = '\n'

  objects.forEach(row => {
    const { typeName, typeCode, parentKey, jsonCode } = row
    code += `// - - - - -\n`
    code += `// ${typeName}\n`
    code += `\n`
    code += `export type ${typeName} = ` + typeCode + '\n'
    code +=
      `export const ${parentKey}: ${typeName} = ` +
      jsonCode +
      '\n'
    code += `\n`
  })

  code += `// - - - - -\n`
  code += `// DesignTokens\n`
  code += `\n`

  code += `type DesignTokens = {\n`
  dataSource.forEach(
    ({ parentKey, typeName, valueType }) => {
      code +=
        tabSpaces(1) +
        `${parentKey}: ` +
        (valueType === 'object'
          ? typeName
          : valueType === 'string'
          ? `string`
          : 'number') +
        '\n'
    }
  )
  code += `}\n`
  code += `const tokens: DesignTokens = {\n`
  dataSource.forEach(
    ({ parentKey, typeName, value, valueType }) => {
      code +=
        tabSpaces(1) +
        (valueType === 'object'
          ? `${parentKey},`
          : valueType === 'string'
          ? `${parentKey}: "${value}",`
          : `${parentKey}: ${value},`) +
        '\n'
    }
  )
  code += `}\n`
  code += `\n`
  code += `export default tokens\n`
  code += `\n`

  code += `// - - - - -\n`
  code += `// DesignTokenKey\n`
  code += `\n`

  code += `export type DesignTokenKey =\n`
  allVars.forEach(({ key }) => {
    code += tabSpaces(1) + `| '${key}'\n`
  })

  code += `\n`

  code += `// - - - - -\n`
  code += `// TokenDic\n`
  code += `\n`

  code += `export type TokenDic = { [key in DesignTokenKey]: string }\n\n`
  code += `export const tokenDic: TokenDic = {\n`
  allVars.forEach(({ key, value }) => {
    code += tabSpaces(1) + `"${key}": "${value}",\n`
  })
  code += `}\n`

  code += `\n`
  code += `// - - - - -\n`
  code += `// getter\n`
  code += `\n`
  code += `export const token = (key: DesignTokenKey) => {\n`
  code += tabSpaces(1) + `return tokenDic[key]\n`
  code += `}\n`
  code += `\n`
  code += `export const tokenv = (key: DesignTokenKey) => {\n`
  code +=
    tabSpaces(1) +
    `return "var(--" + key.replace(/\\./g, '\\\\.').replace(/\\//g, '\\\\/') + ")"\n`
  code += `}\n`

  const validOutfile = validateOutputPath(outfile, 'file')
  if (validOutfile) {
    writeFile(validOutfile, code, options?.consoleOnly)
  } else {
    consoleError(`"${outfile}" is invalid file path.`)
  }
}
