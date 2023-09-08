import { DefineTokensSource } from '../../common/config/types'
import {
  GenCalcData,
  GenCalcSource,
  RecursivelyTokens,
} from '../../common/config/dev.types'
import genVarsData from './genVarsData'
import genTsCode from './genTsCode'
import forEach from '../../common/utils/forEach'
import genTsVarCode from './genTsVarCode'
import { toPascalCase } from '../../common/utils/toCase'

export default function genCalcData(source: DefineTokensSource) {
  const { tokens, config } = source

  const gen = (tokens: RecursivelyTokens) => {
    const arr: GenCalcData[] = []
    Object.keys(tokens).forEach(key => {
      const value = tokens[key]!

      const rootKey = key // toCleanParentKeysでフォーマット済み
      const typeName = toPascalCase(rootKey)
      const jsonCode = genTsCode(value, 'json')
      const varCode = genTsVarCode(rootKey, value, config?.cssRules)
      const typeCode = genTsCode(value, 'type')
      const varTypeCode = genTsCode(value, 'type-var')

      const vars = genVarsData(rootKey, value, config?.cssRules || {})

      const valueType =
        typeof value === 'string'
          ? 'string'
          : typeof value === 'number'
          ? 'number'
          : 'object'

      arr.push({
        valueType,
        rootKey,
        typeName,
        value,
        jsonCode,
        typeCode,
        varCode,
        varTypeCode,
        vars,
      })
    })

    return arr
  }

  const calcSource: GenCalcSource = {
    tokens: gen(tokens),
  }

  return calcSource
}
