import { TokenData } from './types'

export type RecursivelyTokens = {
  [key: string]: string | number | TokenData | undefined
}

export type GenCalcData = {
  valueType: 'string' | 'number' | 'object'
  rootKey: string
  typeName: string
  value: string | number | TokenData<string | number>
  jsonCode: string
  typeCode: string
  varCode: string
  varTypeCode: string
  vars: VarDataRow[]
}
export type GenCalcSource = {
  tokens: GenCalcData[]
}

export type VarDataRow = {
  pathKeys: string[]
  cssKey: string
  jsKey: string
  value: string | number
}
