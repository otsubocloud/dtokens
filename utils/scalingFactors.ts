export default function scalingFactors(
  variables: number[],
  config?: {
    scaling?: number
    unit?: 'rem' | 'px'
    prefix?: string
  }
) {
  const tokens: { [key: string]: string } = {}
  const {
    scaling = 4,
    unit = 'rem',
    prefix = '',
  } = config || {}

  for (let factor of variables) {
    tokens[prefix + factor] =
      unit === 'px'
        ? factor * scaling + 'px'
        : (1 / 16) * factor * scaling + 'rem'
  }
  return tokens
}
