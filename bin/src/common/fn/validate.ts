import { DefineTokensSource } from '../config/types'
import consoleError from './consoleError'

export default function validate(source: DefineTokensSource) {
  if (!source) {
    consoleError(`data source is not defined.`)
    return { isError: true }
  }
  const isValidTokens = !!source.tokens && !!Object.keys(source.tokens).length
  if (!isValidTokens) {
    if (!isValidTokens) consoleError(`tokens is not defined.`)
    return { isError: true }
  }
  return { isValidTokens }
}
