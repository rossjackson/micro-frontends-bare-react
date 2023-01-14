# Micro-frontends Implementation
This is a bare monorepo implementation of a micro-frontends using 2 react application on one application shell.

vscode
babelrc
prettierrc
npmrc

Create folders:
1. account
2.

Add base react code without using creat-react-app

```
> npm i react react-dom
> npm i -D @types/react @types/react-dom typescript webpack webpack-cli html-webpack-plugin webpack-dev-server babel-loader css-loader mini-css-extract-plugin prettier ts-loader ts-node @types/node
```

```
> ./node_modules/.bin/tsc --init  
```

appshell written in react

prereq:
- .vscode/workspace settings
- .prettierrc
- .npmrc
- .gitignore
- public folder


create a react application from scratch:

```
> npm init -y
> npm i react react-dom

> npm i -D @babel/plugin-transform-runtime \
  @babel/preset-env \
  @babel/preset-react \
  @babel/preset-typescript \
  @types/node \
  @types/react \
  @types/react-dom \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser \
  babel-loader \
  copy-webpack-plugin \
  css-loader \
  eslint \
  eslint-plugin-react \
  eslint-plugin-react-hooks \
  eslint-webpack-plugin \
  html-webpack-plugin \
  mini-css-extract-plugin \
  prettier \
  style-loader \
  ts-loader \
  ts-node \
  tsconfig-paths-webpack-plugin \
  typescript \
  webpack \
  webpack-cli \
  webpack-dev-server
```

```
> ./node_modules/.bin/tsc --init
```

Things to change in tsconfig.ts:
-  "lib": [
            "dom",
            "dom.iterable",
            "esnext"
        ],
    "jsx": "react",
    "baseUrl": "./src",
    "resolveJsonModule": true,
    "noImplicitAny": true

- copy src folder
- create webpack.config.ts
