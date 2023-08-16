// @ts-ignore
import { defineTokens } from '{root}'
// @ts-ignore
import { defaults } from '{presets}'

export default defineTokens({
  config: {
    targets: ['ts', 'css', 'scss'],
    outputs: {
      tsFile: 'design-tokens/index.ts',
      cssFile: 'design-tokens/css.css',
      scssFile: 'design-tokens/scss.scss',
    },
  },
  tokens: {
    spacing: defaults.spacing,
    sizes: defaults.sizesLikePx,
    fonts: defaults.fonts,
    fontSizes: defaults.fontSizes,
    fontWeights: defaults.fontWeights,
    lineHeights: defaults.lineHeights,
    letterSpacings: defaults.letterSpacings,
    radii: defaults.radii,
    shadows: defaults.shadows,
    breakpoints: defaults.breakpoints,
    colors: {},
  },
})
