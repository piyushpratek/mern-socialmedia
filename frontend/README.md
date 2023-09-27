# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

Project =
npm install @mui/material @emotion/react @emotion/styled
npm install @mui/icons-material
npm i react-router-dom
npm install @reduxjs/toolkit react-redux axios

src=> Component
=>Header.tsx
=>Login.tsx
=>Home.tsx
=>User.tsx
=>Post.tsx
=>Loader.tsx

src=> store
=> store.ts
=>slice -> user -> userSlice.tsx -> postOfFollowingSlice.ts ->allUsersSlice.ts ->userProfileSlice.ts
=>actionHelpers-> userActionHelper.tsx
=>actionHelpers -> postActionHelpers.ts

=>slice -> post -> likePostSlice.ts -> myPostsSlice.ts -> userPostSlice.ts

src=>types ->types.ts

vite.config.ts => add proxy in this file (backend URL)

alert added at userSlice and then in App.tsx

NOTES=
e.preventDefault()= it is used so that page does not reload
clearErrors()= whenever we call this reducer then state mein error ki value jo bhi hogi wo null ho jayegi/ya khatam
clearErrors: (state) => { state.error = null; } = state will be null whenever fired
clearMessage: (state) => { state.message = null; }, = whenever this will be fired message will ne null
