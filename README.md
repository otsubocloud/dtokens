# dtokens

Simple design-tokens generator.

### Prerequisites 
- Typescript environment
- node >= v16.15.1

## Get Started
1. Install
```sh
npm i -D dtokens
```
2. Run command
```sh
npm run dtokens init
```

3. The command will automatically create the following files at the root of your project directory.
```
./dtokens.config.ts

./design-tokens /index.ts
                /css.css
                /scss.scss
```



## Usage


#### CSS
```css
import "../design-tokens/css.css";

.header {
  font-size: var(--fontSizes-md);
}
```

#### SCSS
```scss
@import "../design-tokens/scss";

.header {
  font-size: $fontSizes-md;
}
```

#### Typescript
```jsx
import tokens from '../design-tokens'

return (
  <div style={{
    fontSizes: tokens.fontSizes.md,
  }} />
)
```

> Other approaches at Typescript
> ```jsx
> import "../design-tokens/css.css";
> import tokens, { token, tokenv } from '../design-tokens'
> 
> return (
>   <div style={{
>     width: tokens.sizes[4], // => "1rem"
>     height: token('sizes-4'), // => "1rem"
>     minHeight: tokenv('sizes-4'), // => "var(--sizes-4)"
>   }} />
> )
> ```

## Customize Tokens

1. Change `dtokens.config.ts` file at the root of your project directory.

```ts
// dtokens.config.ts

import { defineTokens } from "dtokens"

export default defineTokens({
  config: {},
  tokens: {},
})
```

2. Run `dtokens` command to regenerate the token files.
```sh
npm run dtokens
```


## Configuration Tips

### Referencing other values

```js
// dtokens.config.ts

export default defineTokens({
  tokens: {
    colors: {
      primary: {
        500: '#ff0000',
      }
    },
    text: {
      color: {
        main: '{colors.primary.500}',
      }
    }
  }
})
```

### Token key mapping

```ts
// dtokens.config.ts

export default defineTokens({
  config: {
    mapKeys: {
      fontSizes: 'fs',
    }
  },
  tokens: {
    fontSizes: {
      2: '14px',
      3: '16px',
    },
  }
})
```

> Usage 
> ```scss
> // SCSS
> @import "../design-tokens/scss";
> 
> .box {
>   font-size: $fs-3;
> }
> ```
### Configure with utilities

```js
// dtokens.config.ts
import { defineTokens } from 'dtokens'
const { pxToRem, remToPx, scalingFactors, toFontFamily } from 'dtokens/utils'

export default defineTokens({
  tokens: {
    fonts: {
      sans: toFontFamily(['Roboto', 'Helvetica Neue', 'sans-serif']),
      // => "Roboto, 'Helvetica Neue', sans-serif"
    },
    fontSizes: {
      sm: pxToRem(14), // => "0.875rem"
      md: pxToRem(16), // => "1rem"
    },
    sizes: {
      topbarH: remToPx(4), // => "64px"
    },
    spacing: {
      ...scalingFactors([1, 2, 4, 8, 16, 32], {
        scaling: 4, //  variable => pxToRem( variable * 4 )
        unit: 'rem',
      }),
    },
  }
})
```

## API
```tsx
// dtokens.config.ts
function defineTokens(source: {
  config?: {
    targets?: ("ts" | "css" | "scss")[] // default: ['ts', 'css', 'scss']
    outputs?: {
      tsFile?: string // default: 'design-tokens/index.ts'
      cssFile?: string // default: 'design-tokens/css.css'
      scssFile?: string // default: 'design-tokens/scss.scss'
    }
    cssRules?: {
      prefix?: string // e.g. 'd-'
      separation?: '-' |  '_' | string // default: '-'
      naming?: 'unset' | 'kebab' | 'snake' // default: 'unset'
      decimalPoint?: 'dot' | 'underscore' | 'hyphen' // default: 'dot'
    },
    mapKeys?: {
      spacing?: string
      sizes?: string
      fonts?: string
      fontSizes?: string
      fontWeights?: string
      lineHeights?: string
      letterSpacings?: string
      radii?: string
      shadows?: string
      breakpoints?: string
      colors?: string
      [key: string]: string
    },
  },
  tokens: {
    spacing?: {
      [key: string]: string | Object
    },
    sizes?: {
      [key: string]: string | Object
    },
    fonts?: {
      [key: string]: string | Object
    },
    fontSizes?: {
      [key: string]: string | number | Object
    },
    fontWeights?: {
      [key: string]: string | number | Object
    },
    lineHeights?: {
      [key: string]: string | number | Object
    },
    letterSpacings?: {
      [key: string]: string | number | Object
    },
    radii?: {
      [key: string]: string | number | Object
    },
    shadows?: {
      [key: string]: string | number | Object
    },
    breakpoints?: {
      [key: string]: string | number | Object
    },
    colors?: {
      [key: string]: string | Object
    },
    // - - - -
    // Set any tokens as you like
    [key: string]: {
      [key: string]: string | number | Object
    }
  },
}) 
```


## License

[MIT License](https://andreasonny.mit-license.org/2019) © otsubocloud
