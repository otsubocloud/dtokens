import type * as CSS from 'csstype'

export type DefineTokensSource = {
  config?: DefineConfig
  tokens: DefineTokens
}

export type StylesSampleType = 'box' | 'text' | 'text-box'

export type StyleData = {
  [key in string | 'BOOK_SAMPLE']: CSS.Properties | StylesSampleType
}

export type DefineStyles = {
  text?: StyleData
} & {
  [key: string]: StyleData
}

export type DefineConfig = {
  targets?: ('ts' | 'css' | 'scss')[]
  outputs?: OutputsConfig
  values?: ValuesConfig
  cssRules?: CssRules
  mapKeys?: MapKeys
}

export type OutputsConfig = {
  tsFile?: string
  jsFile?: string
  cssFile?: string
  scssFile?: string
  jsonFile?: string
  jsType?: 'module' | 'require'
}

export type DefineTokens = SystemTokens & {
  [key: string]: string | number | TokenData | undefined
}

export type MapKeys = {
  [key in keyof SystemTokens]?: string
} & {
  [key: string]: string
}

type SystemTokens = {
  spacing?: TokenData
  sizes?: TokenData
  fonts?: TokenData<string>
  fontSizes?: TokenData
  fontWeights?: TokenData
  lineHeights?: TokenData
  letterSpacing?: TokenData
  radii?: TokenData
  shadows?: TokenData
  breakpoints?: TokenData
  colors?: TokenData<string>
}

export type TokenData<T extends string | number = string | number> = {
  [p: string | number]: T | TokenData<T> | undefined
}

export type CssRules = {
  prefix?: string
  separation?: Separation
  naming?: Naming
  decimalPoint?: DecimalPoint
}
export type Naming = 'kebab' | 'snake' | 'camel' | 'pascal' | 'unset'
export type Separation = string | '-' | '_' | 'auto'
export type DecimalPoint = 'dot' | 'underscore' | 'hyphen'

export type ValuesConfig = {
  tokensPriority?: 'pure-value' | 'css-var'
  scssPriority?: 'pure-value' | 'css-var'
  tokensWithV?: boolean
  scssWithV?: boolean
}
