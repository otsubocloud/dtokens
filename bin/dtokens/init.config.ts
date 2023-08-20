// @ts-ignore
import { defineTokens } from '{root}'
// @ts-ignore
import { defaults, palettes } from '{presets}'

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
    sizes: defaults.sizes,
    px: defaults.px,
    fonts: defaults.fonts,
    fontSizes: defaults.fontSizes,
    fontWeights: defaults.fontWeights,
    lineHeights: defaults.lineHeights,
    letterSpacings: defaults.letterSpacings,
    radii: defaults.radii,
    shadows: defaults.shadows,
    breakpoints: defaults.breakpoints,
    colors: {
      primary: palettes.blue,
      secondary: palettes.teal,
      error: palettes.red,
      warning: palettes.amber,
      success: palettes.green,
      info: palettes.sky,
    },
  },
})
