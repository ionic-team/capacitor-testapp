# Capacitor TestApp

The Capacitor TestApp is used to develop new features and verify bug fixes in Capacitor and the [official plugins](https://github.com/ionic-team/capacitor-plugins). It is built with [Ionic React](https://ionicframework.com/react).

## Setup

1. Fork and clone this repo.
2. Install the dependencies.

    ```shell
    npm install
    ```

The TestApp is just like any other Ionic React app. See [the docs](https://ionicframework.com/docs/react) to learn what you can do.

- `ionic build` to build web assets
- `ionic serve` to run web version in your browser
- `ionic cap sync`
- `ionic cap run <platform>` (also w/ livereload: just add `-l --external` flags)

You can also opt-out of the Ionic CLI and use npm scripts and the Capacitor CLI directly:

- `npm run build`
- `npm start`
- `npx cap sync`
- `npx cap run <platform>` (no automatic livereload)

### Developing Capacitor

> New to Capacitor development? Start [here](https://github.com/ionic-team/capacitor/blob/HEAD/CONTRIBUTING.md#developing-capacitor).

To use the TestApp to develop Capacitor and official plugins, make sure you have set up the sibling repositories. Clone Capacitor and the plugins repo into the same parent directory.

```
cd ../
git clone git@github.com:ionic-team/capacitor.git
git clone git@github.com:ionic-team/capacitor-plugins.git
```

Follow the setup instructions for each repo:
- [`capacitor`](https://github.com/ionic-team/capacitor/blob/HEAD/CONTRIBUTING.md)
- [`capacitor-plugins`](https://github.com/ionic-team/capacitor-plugins/blob/main/CONTRIBUTING.md) (make sure to run `npm run toggle-local`)

Then, back in this repo, run the following to link the packages in both repos to this app:

```shell
npm install
npm run toggle-local
```
