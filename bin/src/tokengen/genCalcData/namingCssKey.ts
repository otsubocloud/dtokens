import { CssRules } from '../../common/config/types'
import escapeCssKey from './escapeCssKey'
import {
  toKebabCase,
  toSnakeCase,
  toCamelCase,
  toPascalCase,
} from '../../common/utils/toCase'

export default function namingCssKey(
  names: string[],
  cssRules?: CssRules,
  escape: boolean = true
) {
  const {
    prefix,
    naming = 'unset',
    separation = '-',
    decimalPoint = 'dot',
  } = cssRules || {}

  const toCase = (name: string) => {
    switch (naming) {
      case 'kebab':
        return toKebabCase(name)
      case 'snake':
        return toSnakeCase(name)
      case 'camel':
        return toCamelCase(name)
      case 'pascal':
        return toPascalCase(name)
      default:
        return name
    }
  }

  const convert = (name: string) => {
    const hasDecimalPoint = /[0-9]*\.[0-9]+/.test(name)

    if (hasDecimalPoint) {
      return name.replace(/\./g, '*')
    }

    const newName = toCase(name)
    return escape ? escapeCssKey(newName) : newName
  }

  const sp = (() => {
    if (separation === '_' || separation === '-' || separation === 'auto') {
      return separation
    }
    return separation.length > 2 ? separation.slice(0, 2) : separation
  })()

  const rp =
    decimalPoint === 'underscore'
      ? '_'
      : decimalPoint === 'hyphen'
      ? '-'
      : '\\.'

  const key =
    sp === 'auto'
      ? toCase(names.map(name => convert(name)).join('-')).replace('*', rp)
      : names
          .map(name => convert(name))
          .join(sp)
          .replace('*', rp)

  return (prefix || '') + key
}
