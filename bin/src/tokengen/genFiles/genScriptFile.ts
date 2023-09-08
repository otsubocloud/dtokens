import { DefineConfig, ValuesConfig } from '../../common/config/types'

import tabSpaces from '../../common/utils/tabSpaces'
import validateOutputPath from '../../common/utils/validateOutputPath'
import consoleError from '../../common/fn/consoleError'
import writeFile from './writeFile'
import wrapKey from '../../common/utils/wrapKey'
import {
  GenCalcData,
  GenCalcSource,
  VarDataRow,
} from '../../common/config/dev.types'
import forEach from '../../common/utils/forEach'
import { NOT_EDIT_MESSAGE } from '../const'

export default function genScriptFile(
  calcSource: GenCalcSource,
  type: 'ts' | 'js',
  outfile: string,
  config?: DefineConfig,
  options?: { consoleOnly?: boolean }
) {
  const { values, outputs } = config || {}
  const jsType = outputs?.jsType || 'module'

  const rows = calcSource.tokens

  let code = ''

  code += NOT_EDIT_MESSAGE
  code += '\n'

  const genType =
    type === 'ts'
      ? 'ts'
      : type === 'js' && jsType === 'module'
      ? 'module'
      : 'require'

  code += tokensCode(rows, values, genType)

  if (genType === 'ts') {
    code += deprecatedTypesCode(rows)
  }
  code += deprecatedCode(rows, genType)

  const validOutfile = validateOutputPath(outfile, 'file')
  if (validOutfile) {
    writeFile(validOutfile, code, options?.consoleOnly)
  } else {
    consoleError(`"${outfile}" is invalid file path.`)
  }
}

const tokensCode = (
  rows: GenCalcData[],
  values?: ValuesConfig,
  genType: 'ts' | 'module' | 'require' = 'ts'
) => {
  let v = ''

  const { tokensPriority = 'pure-value', tokensWithV = true } = values || {}

  if (tokensWithV) {
    v += header('secondary tokens')

    if (genType === 'ts' || genType === 'module') {
      v += `export const tokensV = {\n`
    } else {
      v += `const tokensV = {\n`
    }
    v += genTokensJsonCode(
      rows,
      1,
      tokensPriority === 'pure-value' ? 'css-var' : 'pure-value'
    )
    v += `}\n`
    v += `\n`
  }

  v += header('primary tokens')

  v += `const tokens = {\n`
  v += genTokensJsonCode(rows, 1, tokensPriority)
  if (tokensWithV) {
    v += tabSpaces(1) + `v: tokensV,\n`
  }
  v += `}\n`
  v += `\n`

  if (genType === 'ts' || genType === 'module') {
    v += `export default tokens\n`
  } else {
    v += `exports.tokens = tokens\n`
    v += `exports.tokensV = tokensV\n`
  }
  v += `\n`

  return v
}

/** --------------
 * utils
 * */

const header = (str: string) => {
  let v = ''
  v += `// - - - - -\n`
  v += `// ${str}\n`
  v += `\n`
  return v
}
const genTokensJsonCode = (
  rows: GenCalcData[],
  tabSpace = 1,
  type: 'css-var' | 'pure-value'
) => {
  let code = ''
  rows.forEach(({ rootKey, jsonCode, varCode, value, valueType }) => {
    const keyStr = `${wrapKey(rootKey)}: `

    const valueStr = (() => {
      if (type === 'pure-value') {
        return valueType === 'object'
          ? jsonCode.split('\n').join('\n' + tabSpaces(tabSpace))
          : valueType === 'string'
          ? `"${value}"`
          : value
      } else {
        return valueType === 'object'
          ? varCode.split('\n').join('\n' + tabSpaces(tabSpace))
          : varCode.replace(',\n', '')
      }
    })()
    code += tabSpaces(tabSpace) + keyStr + valueStr + ',\n'
  })
  return code
}

/** --------------
 * deprecated codes
 * */

const deprecatedTypesCode = (rows: GenCalcData[]) => {
  let code = ''
  code += `// - - - - -\n`
  code += `// Token Types (deprecated)\n`
  code += `\n`

  rows.forEach(({ typeName, typeCode }) => {
    code += `/** @deprecated */\n`
    code += `export type ${typeName} = ` + typeCode
    code += `\n`
  })

  return code
}

const deprecatedCode = (
  rows: GenCalcData[],
  genType: 'ts' | 'module' | 'require' = 'ts'
) => {
  const allVars = (() => {
    let arr: VarDataRow[] = []
    rows.forEach(row => {
      arr = arr.concat(row.vars)
    })
    return arr
  })()

  let code = ''
  code += `\n`

  if (genType === 'ts') {
    code += `// - - - - -\n`
    code += `// DesignTokenKey (deprecated)\n`
    code += `\n`

    /** DesignTokenKey */
    code += `/** @deprecated */\n`
    if (rows.length) {
      code += `export type DesignTokenKey =\n`
    } else {
      code += `export type DesignTokenKey = string\n`
    }
    allVars.forEach(({ cssKey }) => {
      code += tabSpaces(1) + `| '${cssKey}'\n`
    })
    code += `\n`
  }

  code += `// - - - - -\n`
  code += `// TokenDic (deprecated)\n`
  code += `\n`

  /** TokenDic */
  if (genType === 'ts') {
    code += `/** @deprecated */\n`
    code += `export type TokenDic = { [key in DesignTokenKey]: string }\n`
    code += `\n`
  }

  /** tokenDic */
  code += `/** @deprecated */\n`
  if (genType === 'ts') {
    code += `export const tokenDic: TokenDic = {\n`
  } else if (genType === 'module') {
    code += `export const tokenDic = {\n`
  } else {
    code += `const tokenDic = {\n`
  }
  allVars.forEach(({ cssKey, value }) => {
    code += tabSpaces(1) + `"${cssKey}": "${value}",\n`
  })
  code += `}\n`
  code += `\n`

  code += `// - - - - -\n`
  code += `// getter functions (deprecated)\n`
  code += `\n`

  if (genType === 'require') {
    code += `/** @deprecated */\n`
    code += `exports.tokenDic = tokenDic`
  }

  /** function token */
  code += `/** @deprecated */\n`
  if (genType === 'ts') {
    code += `export const token = (key: DesignTokenKey) => {\n`
  } else if (genType === 'module') {
    code += `export const token = key => {\n`
  } else {
    code += `exports.token = key => {\n`
  }
  code += tabSpaces(1) + `return tokenDic[key]\n`
  code += `}\n`
  code += `\n`

  /** function tokenv */
  code += `/** @deprecated */\n`
  if (genType === 'ts') {
    code += `export const tokenv = (key: DesignTokenKey) => {\n`
  } else if (genType === 'module') {
    code += `export const tokenv = key => {\n`
  } else {
    code += `exports.tokenv = key => {\n`
  }
  code +=
    tabSpaces(1) +
    `return "var(--" + key.replace(/\\./g, '\\\\.').replace(/\\//g, '\\\\/') + ")"\n`
  code += `}\n`

  return code
}
