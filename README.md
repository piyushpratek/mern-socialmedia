# README for Backend and Frontend of Mern Social Media App

## Backend (package.json)

### Package Information

- **Name:** backend
- **Version:** 1.0.0
- **Description:** Backend for a Social Media App where users can add photos, like, comment, and search for other users.
- **Main File:** index.js
- **License:** ISC
- **Author:** Piyush Prateek

### Scripts

- **start:dev:** Start the backend server in development mode without static build.

  ```
  npm run start:dev
  ```

- **start:dev:debug:** Start the backend server in development mode with debugging enabled.

  ```
  npm run start:dev:debug
  ```

- **start:prod:** Start the backend server in production mode without static build.

  ```
  npm run start:prod
  ```

- **start:prod:debug:** Start the backend server in production mode with debugging enabled.

  ```
  npm run start:prod:debug
  ```

- **build:** Build the TypeScript code.

  ```
  npm run build
  ```

- **start:dev-static:** Start the backend server in development mode with static build.

  ```
  npm run start:dev-static
  ```

- **start:prod-static:** Start the backend server in production mode with static build.

  ```
  npm run start:prod-static
  ```

- **start:** Start the backend server.

  ```
  npm start
  ```

- **lint:** Lint the code using ESLint with a maximum of 0 warnings.

  ```
  npm run lint
  ```

- **lint-fix:** Lint the code using ESLint and automatically fix issues.
  ```
  npm run lint-fix
  ```

### Dependencies

- **bcrypt:** ^5.1.1
- **body-parser:** ^1.20.2
- **chalk:** ^4.1.2
- **cloudinary:** ^1.41.0
- **cookie-parser:** ^1.4.6
- **cross-env:** ^7.0.3
- **dotenv:** ^16.3.1
- **express:** ^4.18.2
- **jsonwebtoken:** ^9.0.2
- **mongoose:** ^7.5.1
- **multer:** ^1.4.5-lts.1
- **nodemailer:** ^6.9.5

### Dev Dependencies

- **@types/bcrypt:** ^5.0.0
- **@types/cookie-parser:** ^1.4.4
- **@types/express:** ^4.17.17
- **@types/jsonwebtoken:** ^9.0.3
- **@types/multer:** ^1.4.8
- **@types/node:** ^20.6.1
- **@types/nodemailer:** ^6.4.10
- **ts-node:** ^10.9.1
- **ts-node-dev:** ^2.0.0
- **typescript:** ^5.2.2

---

## Frontend (package.json)

### Package Information

- **Name:** frontend
- **Type:** module (ES modules)
- **Private:** true

### Scripts

- **dev:** Start the frontend development server using Vite.

  ```
  npm run dev
  ```

- **build:** Build the TypeScript code and create a production build.

  ```
  npm run build
  ```

- **lint:** Lint the code using ESLint for TypeScript and TypeScript React files with a maximum of 0 warnings.

  ```
  npm run lint
  ```

- **preview:** Preview the production build with Vite.
  ```
  npm run preview
  ```

### Dependencies

- **@emotion/react:** ^11.11.1
- **@emotion/styled:** ^11.11.0
- **@mui/icons-material:** ^5.14.9
- **@mui/material:** ^5.14.10
- **@reduxjs/toolkit:** ^1.9.6
- **axios:** ^1.5.0
- **react:** ^18.2.0
- **react-dom:** ^18.2.0
- **react-redux:** ^8.1.2
- **react-router-dom:** ^6.16.0

### Dev Dependencies

- **@types/react:** ^18.2.15
- **@types/react-dom:** ^18.2.7
- **@typescript-eslint/eslint-plugin:** ^6.0.0
- **@typescript-eslint/parser:** ^6.0.0
- **@vitejs/plugin-react-swc:** ^3.3.2
- **eslint:** ^8.45.0
- **eslint-plugin-react-hooks:** ^4.6.0
- **eslint-plugin-react-refresh:** ^0.4.3
- **typescript:** ^5.0.2
- **vite:** ^4.4.5
