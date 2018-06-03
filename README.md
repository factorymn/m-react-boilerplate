# M-React-Boilerplate
Starter boilerplate app for React/Redux stack with server side rendering. Focused on reaching optimal developer experience.

## Installation

```bash
yarn   # (or `npm install` if you prefer npm)
```
## Running in dev-mode

```bash
yarn start   # (or `npm start` if you prefer npm)
```

## Technologies and features

<dl>
  <dt>React JS</dt>
  <dd>React JS is a declarative, efficient, and flexible JavaScript library for building user interfaces.</dd>
  
  <dt>Redux</dt>
  <dd>Redux is a predictable state container for JavaScript apps. It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test.</dd>
  
  <dt>Webpack v4</dt>
  <dd>Webpack is a module bundler for modern JavaScript applications. When webpack processes your application, it recursively builds a dependency graph that includes every module your application needs, then packages all of those modules into a small number of bundles - often only one - to be loaded by the browser.</dd>
  
  <dt>Code splitting</dt>
  <dd>Code splitting is one of the most compelling features of webpack. This feature allows you to split your code into various bundles which can then be loaded on demand or in parallel. It can be used to achieve smaller bundles and control resource load prioritization which, if used correctly, can have a major impact on load time.
Look at the gif, when a user clicks on "Go to another page" link the browser loads a new JS file which contains the code for the new page. In this case, our user will load only the code-chunks that are actually needed for showing page. Look at the gif, when a user clicks on "Go to another page" link the browser loads a new JS file which contains the code for the new page. In this case, our user will load only the code-chunks that are actually needed for showing page.</dd>

  <dt>Hot Module Replacement</dt>
  <dd>Hot Module Replacement (HMR) improves the development experience by automatically updating modules in the browser at runtime without needing a whole page refresh. This means that application state can be retained as you change small things. We use React Hot Loader for advanced.</dd>
  
  <dt>Stylus</dt>
  <dd>Stylus - a dynamic stylesheet preprocessor language providing an efficient, dynamic, and expressive way to generate CSS.</dd>

  <dt>react-helmet</dt>
  <dd>react-helmet - a document head manager for React with server sider rendering support.</dd>
</dl>

## Compile product build and run server

```bash
yarn run prod   # (or `npm run prod` if you prefer npm)
```
