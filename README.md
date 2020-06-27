# Capacitor TestApp

This app is used to develop and verify Capacitor. It must be used with a local copy of [the Capacitor repo](https://github.com/ionic-team/capacitor).

## Setup

Clone Capacitor and the TestApp into the same parent directory.

```
git clone git@github.com:ionic-team/capacitor.git
git clone git@github.com:ionic-team/capacitor-testapp.git
```

Follow the setup instructions for the Capacitor repo in [`CONTRIBUTING.md`](https://github.com/ionic-team/capacitor/blob/HEAD/CONTRIBUTING.md).

Then,

```
cd capacitor-testapp/
npm install
npm run build
npx cap sync
```
