import WebView, { CONTEXT_REF } from '../helpers/WebView';

interface ElementActionOptions {
  /**
   * How long to wait (in ms) for the element to be visible before
   * the test fails. Default: 5000 ms
   */
  visibilityTimeout?: number;
}

interface TapButtonOptions extends ElementActionOptions {
  /**
   * Whether to scroll the element into view first. Default: true
   */
  scroll?: boolean;
}

interface OpenMenuOptions extends ElementActionOptions {
  delayForAnimation?: boolean;
}

export enum Device {
  Mobile = 'mobile'
}
export class IonicE2E {
  static waitForLoad() {
    if (this.isWeb()) {
      return;
    }
    return WebView.waitForWebsiteLoaded();
  }

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
      return browser.url(url);
    }
    return Promise.resolve();
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
    if (this.isIOS()) {
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

  static async setLocation(lat: number, lng: number) {
    if (this.isWeb()) {
      // Not available on web
      return;
    }

    return driver.setGeoLocation({ latitude: '' + lat, longitude: '' + lat, altitude: "94.23" });
  }

  static findElementIOS(text: string) {
    return $(`-ios class chain:**/XCUIElementTypeAny[\`label == "${text}"\`]`);
  }

  static async waitElement(selector: string, { visibilityTimeout = 5000 }: ElementActionOptions = {}) {
    const el = await $(selector);
    await el.waitForDisplayed({ timeout: visibilityTimeout });
    return el;
  }

  static async tapButton(buttonTitle, { visibilityTimeout = 5000, scroll = true }: TapButtonOptions = {}) {
    const button = await $(`ion-button=${buttonTitle}`);
    await button.waitForDisplayed({ timeout: visibilityTimeout });
    if (scroll) {
      await button.scrollIntoView();
    }
    await (await expect(button)).toBeDisplayed();

    await button.click();
  }

  static async openMenu({ delayForAnimation = true, visibilityTimeout = 5000 }: OpenMenuOptions = {}) {
    const menuButton = await $('ion-menu-button');
    await menuButton.waitForDisplayed({ timeout: visibilityTimeout });
    await menuButton.click();

    // Let the menu animate open/closed
    if (delayForAnimation) {
      await driver.pause(500);
    }
  }

  static async setInputValue(selector: string, value: string, { visibilityTimeout = 5000 }: ElementActionOptions = {}) {
    const el = await $(selector);
    await el.waitForDisplayed({ timeout: visibilityTimeout });
    console.log('Got input element', el);

    const ionTags = ['ion-input', 'ion-textarea']
    if (ionTags.indexOf(await el.getTagName()) >= 0) {
      const input = await el.$('input');
      return driver.elementSendKeys(input.elementId, value);
    } else {
      return el.setValue(value);
    }
  }
}