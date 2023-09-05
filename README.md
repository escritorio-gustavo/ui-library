<p>
  <img width="100%" src="https://assets.solidjs.com/banner?type=shelf-ui&background=tiles&project=%20" alt="shelf-ui">
</p>

# shelf-ui

[![pnpm](https://img.shields.io/badge/maintained%20with-pnpm-cc00ff.svg?style=for-the-badge&logo=pnpm)](https://pnpm.io/)

Small component library for SolidJS to help speed up the process of building UI's without worrying about styling

## Quick start

Install it:

```bash
npm i shelf-ui
# or
yarn add shelf-ui
# or
pnpm add shelf-ui
```

Use it:

```tsx
import shelf-ui from 'shelf-ui'
```

```js
// tailwind.config.js
import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './node_modules/shelf-ui/dist/**.*',
    /* your paths here */
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant('em', ({ container }) => {
        container.walkRules(rule => {
          rule.selector = `.em\\:${rule.selector.slice(1)}`
          rule.walkDecls(decl => {
            decl.value = decl.value.replace('rem', 'em')
          })
        })
      })
    }),
  ],
}
```
