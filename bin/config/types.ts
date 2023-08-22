export type DefineTokensSource = {
  config?: {
    targets?: ('ts' | 'css' | 'scss')[]
    outputs?: {
      tsFile?: string
      cssFile?: string
      scssFile?: string
    }
    cssRules?: CssRules
    mapKeys?: MapKeys
  }
  tokens: SystemTokens & {
    [key: string]: string | number | TokenData | undefined
  }
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

export type TokenData<
  T extends string | number = string | number,
> = {
  [p: string | number]: T | TokenData<T> | undefined
}

export type CssRules = {
  prefix?: string
  separation?: Separation
  naming?: Naming
  decimalPoint?: DecimalPoint
}
export type Naming = 'kebab' | 'snake' | 'unset'
export type Separation = string | '-' | '_'
export type DecimalPoint = 'dot' | 'underscore' | 'hyphen'

export type CalcData = {
  valueType: 'string' | 'number' | 'object'
  parentKey: string
  typeName: string
  value: string | number | TokenData<string | number>
  jsonCode: string
  typeCode: string
  vars: {
    key: string
    value: string
  }[]
}
