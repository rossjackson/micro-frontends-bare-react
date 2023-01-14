# Micro Frontends with React and Angular
Micro frontends (Micro Front-ends) extends the concepts of microservices to the front-end world. [micro-frontends.org](https://micro-frontends.org/) has a great description of what Micro frontends are.

This is a bare monorepo implementation of micro-frontends using React as the host / app shell and 2 remote applications (React and Angular) written in TypeScript.  I have made it monorepo so that you can see it in one location but you can definitely split this into its own github repository.

The design is very straight forward.  React application on the left side of the screen and the right side is Angular.

You can add more application like Vue, Svelte, or even web components!


## Implementation

I have 3 folders:
```
- angular-right-panel (Angular - remote)
- appshell (React - host)
- react-left-panel (React - remote)
```

All React applications are using webpack and babel so I can easily add [Module Federation](https://webpack.js.org/concepts/module-federation/) that is a vital part for us to be able to build our application in isolation and at the same time expose and or consume code between builds.  

I used [@angular-architects/module-federation-plugin](https://github.com/angular-architects/module-federation-plugin/blob/main/libs/mf/README.md) for my `angular-right-panel` project. `@angular-architects/module-federation-plugin` automatically adjusts your `angular.json` file to include `"extraWebpackConfig": "webpack.config.js"` and add necessary files for you to be able to use `Module Federation` after running the command `ng add @angular-architects/module-federation`.  Make sure that you have `"defaultProject": "name-of-your-project"` in your `angular.json`!

## webpack.config.js

### `react-left-panel`
```
        new container.ModuleFederationPlugin({
            name: 'leftPanel',
            filename: 'remoteEntry.js',
            exposes: {
                './App': './src/App.tsx',
            },
            shared: {
                'react/': {
                    singleton: true,
                },
                'react-dom/': {
                    singleton: true,
                },
            },
        }),
```
What this code block is doing is basically expose the component `App.tsx` file in the `remoteEntry.js`.  The shared property shares the dependency to anyone who is going to consume this certain remote.  There are forward slashes at the end of the dependency name because there is some bug around webpack.  I found this fix [here](https://stackoverflow.com/a/71272108/1417507).

So, if you look at `appshell/src/App.tsx`, you will see this:
```
...
const LeftPanel = lazy(() => import('leftPanel/App'))
...
                    <Suspense fallback={<div>Loading</div>}>
                        <LeftPanel />
                    </Suspense>
...
```
React Lazy and Suspense has been around since React v16.6.  This is a way for your application to split your js chunks by dynamically loading the components.  More on it [here](https://reactjs.org/docs/code-splitting.html).

The `import('leftPanel/App')` came from the exposed name of `react-left-panel`.  The format is basically `import('[filename]/[exposeKey]')`.  You can expose as much components as you want or expose the root component like what I've done here.

### `angular-right-panel`
Similar to `react-left-panel`, you will see a `webpack.config.js`
```
            // library: { type: 'module' },

            // For remotes (please adjust)
            name: 'angularRightPanel',
            filename: 'remoteEntry.js',
            exposes: {
                './mount': './src/mount.ts',
            },
```
Make sure to comment out `library: { type: 'module' }` and then add `scriptType: 'text/javascript'` as part of the output so it treats it as type js.  The shared are all generated by `@angular-architects/module-federation-plugin`.

On our `appshell/src/App.tsx`, we will see this:
```
...
import { mount } from 'angularRightPanel/mount'
...
    useEffect(() => {
        mount()
    }, [])
...
                        {/* @ts-ignore */}
                        <app-root></app-root>
```
I have ignored the ts linter because I need to have a container for the angular application.  `app-root` is the default identifier but you can change this as your project grows.

`angularRightPanel/mount` because of the format `[filename]/[exposeKey]`.  If you go to the `mount.ts` file you will this:
```
const mount = () => {
    platformBrowserDynamic()
        .bootstrapModule(AppModule)
        .catch((err) => console.error(err))
}

export { mount }
```

What this is saying is that it will run the `AppModule` when you call `mount()`.  This will render the Angular application.

On my `appshell`'s `App.tsx`, when the page mounts, I call `mount()` to run the Angular application.

### `appshell`
Our app shell is the host application.  All these applications, whether a remote or a host can share and expose components they way they want but normally, you would want the host to only consume.
```
        new container.ModuleFederationPlugin({
            name: 'AppShell',
            remotes: {
                // This could be a URL pointed to a CDN
                leftPanel: 'leftPanel@http://localhost:3010/remoteEntry.js',
                angularRightPanel:
                    'angularRightPanel@http://localhost:4200/remoteEntry.js',
            },
        }),
```
As you can see, for the host to link to our remote, we have to add it as a `remote` object under `remotes`.  The URL can be pointed to your application's production URL.  So team `leftPanel` can work on their own without worrying about `angularRightPanel`.

Since I am using `TypeScript`, I have to create a definition for the remotes.  You can find it at `remoteTypes.d.ts`

```
///<reference types="react" />

declare module 'leftPanel/App' {
    const LeftPanel: React.ComponentType
    export default LeftPanel
}
declare module 'angularRightPanel/mount' {
    export const mount: () => void
}
```

### For other applications

Similar to what I've done in Angular, you can do the same thing with Vue or Svelte.  Expose a `mount` component.

`Vue` and `Svelte` are similar to `React` in terms of mounting components.  So you can do something like this for `Vue`:
```
import { createApp } from 'vue'
import App from './App.vue'

export const mount = (rootElement) => {
  createApp(App).mount(rootElement)
}
```

On your host, you can then add a ref to a div to pass as `rootElement`

```
const vueRootElementRef = useRef<HtmlDivElement>(null)
useEffect(() => {
  mount(vueRootElementRef.current)
}, [])

return <div ref={vueRootElementRef}/>
```


## How to run?
Go to each folders (`angular-right-panel`, `react-left-panel`, `appshell`) and run `npm i` and then `npm start`.  Make sure to run `appshell` last since it will need the two remotes (`angular-right-panel` and `react-left-panel`) to run first.

## Contact Me
If you have questions or need help, you can ping me through [LinkedIn](https://www.linkedin.com/in/ross-jackson-rogust/)!