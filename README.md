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