import {
  CalcData,
  DefineTokensSource,
} from '../../../config/types'
import genVarsData from './genVarsData'
import genTsCode from './genTsCode'
import { toPascalCase } from 'js-convert-case'

export default function genCalcData(
  source: DefineTokensSource
) {
  const { tokens, config } = source

  const arr: CalcData[] = []
  Object.keys(tokens).forEach(key => {
    const value = tokens[key]!

    const parentKey = key // toCleanParentKeysでフォーマット済み
    const typeName = toPascalCase(parentKey)
    const jsonCode = genTsCode(value, 'json')
    const typeCode = genTsCode(value, 'type')

    const vars = genVarsData(
      parentKey,
      value,
      config?.cssRules || {}
    )

    const valueType =
      typeof value === 'string'
        ? 'string'
        : typeof value === 'number'
        ? 'number'
        : 'object'

    arr.push({
      valueType,
      parentKey,
      typeName,
      value,
      jsonCode,
      typeCode,
      vars,
    })
  })

  return arr
}
