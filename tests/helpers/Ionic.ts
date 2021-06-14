import WebView, { CONTEXT_REF } from '../helpers/WebView';

export enum Device {
  Mobile = 'mobile'
}
export class IonicE2E {
  static native() {
    if (this.isWeb()) {
      return;
    }

    return WebView.switchToContext(CONTEXT_REF.NATIVE);
  }

  static web() {
    if (this.isWeb()) {
      return;
    }

    return WebView.switchToContext(CONTEXT_REF.WEBVIEW);
  }

  static url(url: string) {
    if (this.isWeb()) {
      browser.url(url);
    }
  }

  static pause(ms: number) {
    return driver.pause(ms);
  }

  static onWeb(fn: () => Promise<void>) {
    if (this.isWeb()) {
      return fn();
    }
  }

  static onIOS(fn: () => Promise<void>) {
    if (this.isAndroid()) {
      return fn();
    }
  }
  static onAndroid(fn: () => Promise<void>) {
    if (this.isAndroid()) {
      return fn();
    }
  }

  static isIOS() {
    return driver.isIOS;
  }
  static isAndroid() {
    return driver.isAndroid;
  }
  static isWeb() {
    return !driver.isMobile;
  }

  static setDevice(device: Device) {
    if (!IonicE2E.isWeb()) {
      return Promise.resolve();
    }

    switch (device) {
      case Device.Mobile: {
        return driver.setWindowSize(375, 812);
      }
    }
  }

  static findElementIOS(text: string) {
    return $(`-ios class chain:**/XCUIElementTypeAny[\`label == "${text}"\`]`);
  }

  static async waitElement(selector: string, { visibilityTimeout = 5000 }: ElementActionOptions = {}) {
    const el = await $(selector);
    await el.waitForDisplayed({ timeout: visibilityTimeout });
    return el;
  }

  static async tapButton(buttonTitle, { visibilityTimeout }: TapButtonOptions = { visibilityTimeout: 5000 }) {
    const button = await $(`ion-button=${buttonTitle}`);
    await button.waitForDisplayed({ timeout: visibilityTimeout });
    await button.scrollIntoView();
    await (await expect(button)).toBeDisplayed();

    await button.click();
  }

  static async openMenu({ delayForAnimation = true, visibilityTimeout = 5000 }: OpenMenuOptions = {}) {
    const menuButton = await $('ion-menu-button');
    await menuButton.waitForDisplayed({ timeout: visibilityTimeout });
    await menuButton.click();

    // Let the menu animate open/closed
    if (delayForAnimation) {
      await driver.pause(300);
    }
  }
}