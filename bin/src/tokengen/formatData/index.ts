import { DefineTokensSource } from '../../common/config/types'
import genCalcData from '../genCalcData'
import toCleanRootKeys from './toCleanRootKeys'
import toCleanData from './toCleanData'
import replaceVariables from './replaceVariables'
import trimPassKeys from './trimPassKeys'
import mapTokenKeys from './mapTokenKeys'

export default function formatData(source: DefineTokensSource) {
  let __originalData = source
  __originalData = toCleanRootKeys(source)
  __originalData = toCleanData(__originalData)
  __originalData = replaceVariables(__originalData)
  const originalData = trimPassKeys(__originalData, true)

  let mappedData = mapTokenKeys(originalData)
  mappedData = trimPassKeys(mappedData)

  const calcSource = genCalcData(mappedData)

  return {
    originalData,
    mappedData,
    calcSource,
  }
}
