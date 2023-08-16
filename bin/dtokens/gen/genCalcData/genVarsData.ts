import { toKebabCase, toSnakeCase } from 'js-convert-case'
import { TokenData, CssRules } from '../../../config/types'
import isStringOrNumber from '../../../utils/isStringOrNumber'
import isValidValue from '../../../utils/isValidValue'
import escapeCssKey from './escapeCssKey'

export default function genVarsData(
  parentKey: string,
  data: string | number | TokenData,
  cssRules: CssRules
): {
  key: string
  value: string
}[] {
  if (isStringOrNumber(data)) {
    return [
      {
        key: namingKey([parentKey], cssRules),
        value: String(data),
      },
    ]
  }

  const arr: {
    key: string
    value: string
  }[] = []

  const repeat = (data: TokenData, names: string[]) => {
    for (let key of Object.keys(data)) {
      const value = data[key]
      if (isValidValue(value)) {
        if (
          typeof value === 'string' ||
          typeof value === 'number'
        ) {
          arr.push({
            key: namingKey(names.concat([key]), cssRules),
            value: String(value),
          })
        } else if (typeof value === 'object') {
          repeat(value, names.concat([key]))
        }
      }
    }
  }
  repeat(data as TokenData, [parentKey])

  return arr
}

const namingKey = (
  names: string[],
  {
    prefix,
    naming = 'unset',
    separation = '-',
    decimalPoint = 'dot',
  }: CssRules
) => {
  const sp = (() => {
    switch (separation) {
      case '-':
        return '-'
      case '_':
        return '_'
      default:
        return separation.length > 2
          ? separation.slice(0, 2)
          : separation
    }
  })()

  const convertName = (name: string) => {
    let newName = (() => {
      switch (naming) {
        case 'kebab':
          return toKebabCase(name)
        case 'snake':
          return toSnakeCase(name)
        default:
          return name
      }
    })()

    if (
      decimalPoint == 'underscore' ||
      decimalPoint == 'hyphen'
    ) {
      if (/[0-9]*\.[0-9]+/.test(newName)) {
        const rp = decimalPoint == 'underscore' ? '_' : '-'
        newName = newName.replace(/\./g, rp)
      }
    }
    return escapeCssKey(newName)
  }

  return (
    (prefix || '') +
    names.map(name => convertName(name)).join(sp)
  )
}
