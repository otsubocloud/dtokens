import {
  DefineConfig,
  DefineStyles,
  DefineTokens,
  DefineTokensSource,
  TokenData,
} from '../bin/src/common/config/types'

const defineTokens: DefineTokensFunc = source => source as DefineTokensSource

export default defineTokens

export type DefineTokensFunc = {
  <Tokens extends DefineTokens>(config?: {
    config?: DefineConfig
    tokens: Tokens
  }): DefineTokensSource
}
