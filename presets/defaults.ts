import {
  scalingFactors,
  pxToRem,
  toFontFamily,
} from '../utils'

export const spacing = {
  px: '1px',
  ...scalingFactors(
    [
      0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10,
      11, 12, 14, 16, 20, 24,
    ],
    {
      scaling: 4,
      unit: 'rem',
    }
  ),
}

export const sizes = {
  px: '1px',
  ...scalingFactors(
    [
      0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 5, 6, 7, 8, 9, 10,
      11, 12, 14, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52,
      56, 60, 64, 72, 80, 96,
    ],
    {
      scaling: 4,
      unit: 'rem',
    }
  ),
}

export const sizesLikePx = {
  px: '1px',
  ...scalingFactors(
    [
      0, 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32, 36, 40,
      44, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192,
      208, 224, 240, 256, 288, 320, 384, 448, 512, 576, 640,
      704, 768, 832, 896, 960,
    ],
    {
      scaling: 1,
      unit: 'rem',
    }
  ),
}

export const sansFontNames = [
  'ui-sans-serif',
  'system-ui',
  'sans-serif',
  'Apple Color Emoji',
  'Segoe UI Emoji',
  'Segoe UI Symbol',
  'Noto Color Emoji',
]
export const serifFontNames = [
  'ui-serif',
  'Georgia',
  'Cambria',
  'Times New Roman',
  'Times',
  'serif',
]
export const monoFontNames = [
  'ui-monospace',
  'SFMono-Regular',
  'Menlo',
  'Monaco',
  'Consolas',
  'Liberation Mono',
  'Courier New',
  'monospace',
]
export const fonts = {
  sans: toFontFamily([...sansFontNames]),
  serif: toFontFamily([...serifFontNames]),
  mono: toFontFamily([...monoFontNames]),
}

export const fontSizes = {
  ['2xs']: pxToRem(10),
  ['xs']: pxToRem(12),
  ['sm']: pxToRem(14),
  ['md']: pxToRem(16),
  ['lg']: pxToRem(18),
  ['xl']: pxToRem(20),
  ['2xl']: pxToRem(24),
  ['3xl']: pxToRem(30),
  ['4xl']: pxToRem(36),
  ['5xl']: pxToRem(48),
}

export const fontWeights = {
  thin: 100,
  extraLight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  black: 900,
}

export const lineHeights = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2,
}

export const letterSpacings = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
}

export const radii = {
  ['px']: '1px',
  ['xs']: pxToRem(2),
  ['sm']: pxToRem(4),
  ['md']: pxToRem(6),
  ['lg']: pxToRem(8),
  ['xl']: pxToRem(12),
  ['2xl']: pxToRem(16),
  ['3xl']: pxToRem(24),
  ['full']: '9999px',
}

export const shadows = {
  ['xs']: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
  ['sm']:
    '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  ['md']:
    '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  ['lg']:
    '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  ['xl']:
    '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  ['2xl']: '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  ['inner']: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  ['none']: 'none',
}

export const breakpoints = {
  ['xs']: '0px',
  ['sm']: '640px',
  ['md']: '900px',
  ['lg']: '1200px',
  ['xl']: '1536px',
}

