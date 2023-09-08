// @ts-ignore
import { defineTokens } from '{root}'
// @ts-ignore
import { defaults, palettes, mapKeys } from '{presets}'

export default defineTokens({
  config: {
    outputs: {
      tsFile: 'design-tokens/index.ts',
      cssFile: 'design-tokens/css.css',
      scssFile: 'design-tokens/scss.scss',
    },
    mapKeys: mapKeys.singularMapKeys,
  },
  tokens: {
    spacing: defaults.spacing,
    sizes: defaults.sizes,
    px: defaults.px,
    fonts: defaults.fonts,
    fontSizes: defaults.fontSizes,
    fontWeights: defaults.fontWeights,
    lineHeights: defaults.lineHeights,
    letterSpacing: defaults.letterSpacing,
    radii: defaults.radii,
    shadows: defaults.shadows,
    breakpoints: defaults.breakpoints,
    colors: {
      primary: palettes.blue,
      secondary: palettes.indigo,
      neutral: palettes.blueGray,
      error: palettes.red,
      warning: palettes.amber,
      success: palettes.green,
      info: palettes.sky,
    },
  },
})
