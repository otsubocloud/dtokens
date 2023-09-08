# dtokens 

`beta version`

Simple design-tokens generator. 


### Prerequisites 
- Typescript environment
- node >= v16.15.1

## Get Started
1. Install
```sh
npm i -D dtokens
```
2. Update `package.json` file
```js
{
  ...
  "scripts": {
    ...
    "tokengen": "dtokens", // <- add
    ...
  },
  ...
}
```

3. Run `init` command
```sh
npm run tokengen init
```

4. The command will automatically create the following files at the root of your project directory.
```
./dtokens.config.ts

./design-tokens /index.ts
                /css.css
                /scss.scss
```



## Usage

#### CSS in JS
```jsx
import tokens from '../design-tokens'

return (
  <h3 style={{
    fontSize: tokens.fontSize.md,
  }}>
     Header
  </h3>
)
```

#### CSS
```css
import "../design-tokens/css.css";

.header {
  font-size: var(--fontSize-md);
}
```

#### SCSS
```scss
@import "../design-tokens/scss";

.header {
  font-size: $fontSize-md;
}
```

### CSS variable approaches
> CSS in JS
> ```jsx
> import "../design-tokens/css.css";
> import tokens from '../design-tokens'
> 
> return (
>   <h3 style={{
>     fontSize: tokens.v.fontSize.md, // -> "var(--fontSize-md)"
>   }}>
>     Header
>   </h3>
> )
> ```

> SCSS
> ```scss
> @import "../design-tokens/css.css";
> @import "../design-tokens/scss.scss";
> 
> .header {
>   font-size: $v-fontSize-md; // -> var(--fontSize-md)
> }
> ```

> You can use CSS variable as default token value as follows:
> ```js
> defineTokens({
>   config: {
>     ...
>     values: {
>       tokensPriority: 'css-var',
>       scssPriority: 'css-var',
>     }
>     ...
>   },
>   ...
> })

## Customize Tokens

1. Change `dtokens.config` file at the root of your project directory.

```ts
// dtokens.config file

import { defineTokens } from "dtokens"

export default defineTokens({
  config: { ... },
  tokens: {
    ...
  },
})
```

2. Run `tokengen` command to regenerate the token files.
```sh
npm run tokengen
```


## Configuration Tips

### Referencing other values

```js
// dtokens.config file

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


### Nest Hierarchy Skipping

```js
// dtokens.config file

export default defineTokens({
  tokens: {
    '(colors)': {
      primary: {
        500: '#ff0000',
      }
    },
  }
})
```
> Usage 
> ```js
> <div style={{
>   color: tokens.primary[500] // instead of `tokens.colors.primary[500]`
> }} />
> ```

### Configure with utilities

```js
// dtokens.config file

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

### Generate color tokens with [paletten](https://github.com/otsubocloud/paletten)

```js
// dtokens.config file

import { defineTokens } from 'dtokens'
const { paletten } from 'dtokens/utils'

export default defineTokens({
  tokens: {
    colors: {
      primary: {
        // `paletten` will automatically generate color tokens.
        ...paletten('#ff0000')
      }
    }
  }
})
```

## API
```tsx
// dtokens.config file

function defineTokens(source: {
  config?: {
    outputs?: { // set output file path. e.g., 'design-tokens/index.ts'
      tsFile?: string
      jsFile?: string
      cssFile?: string
      scssFile?: string
      jsonFile?: string
      jsType?: 'module' | 'require'
    }
    values?: {
      tokensPriority?: 'pure-value' | 'css-var' // default: 'pure-value'
      scssPriority?: 'pure-value' | 'css-var' // default: 'pure-value'
      tokensWithV?: boolean
      scssWithV?: boolean
    }
    cssRules?: {
      prefix?: string // e.g. 'd-'
      separation?: '-' |  '_' | 'auto' | string // default: '-'; 'auto': separation is depend on 'naming'
      naming?: 'unset' | 'kebab' | 'snake' | 'pascal'| 'camel' // default: 'unset'
      decimalPoint?: 'dot' | 'underscore' | 'hyphen' // default: 'dot'
    },
    mapKeys?: {
      spacing?: string
      sizes?: string
      fonts?: string
      fontSizes?: string
      fontWeights?: string
      lineHeights?: string
      letterSpacing?: string
      radii?: string
      shadows?: string
      breakpoints?: string
      colors?: string
      [key: string]: string
    }
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
    letterSpacing?: {
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
  }
}) 
```


## License

[MIT License](https://andreasonny.mit-license.org/2019) © otsubocloud
