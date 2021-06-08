import WebView, { CONTEXT_REF } from '../helpers/WebView';

const isMatch = require('lodash/isMatch');
const isEqual = require('lodash/isEqual');

interface ElementActionOptions {
  visibilityTimeout?: number;
}

interface TapButtonOptions extends ElementActionOptions {
}

interface OpenMenuOptions extends ElementActionOptions {
  delayForAnimation?: boolean;
}

enum Device {
  Mobile = 'mobile'
}
class IonicE2E {
  static async native() {
    WebView.switchToContext(CONTEXT_REF.NATIVE);
  }
  static async web() {
    WebView.switchToContext(CONTEXT_REF.WEBVIEW);
  }
  static async setDevice(device: Device) {
    switch (device) {
      case Device.Mobile: {
        await browser.setWindowSize(375, 812);
      }
    }
  }

  static async waitElement(selector: string, { visibilityTimeout = 5000 }: ElementActionOptions = {}) {
    const el = await $(selector);
    await el.waitForDisplayed({ timeout: visibilityTimeout });
    return el;
  }

  static async tapButton(buttonTitle, { visibilityTimeout }: TapButtonOptions = { visibilityTimeout: 5000 }) {
    const button = await $(`ion-button=${buttonTitle}`);
    await button.waitForDisplayed({ timeout: visibilityTimeout });
    await (await expect(button)).toBeDisplayed();

    await button.click();
  }

  static async openMenu({ delayForAnimation = true, visibilityTimeout = 5000 }: OpenMenuOptions = {}) {
    const menuButton = await $('ion-menu-button');
    await menuButton.waitForDisplayed({ timeout: visibilityTimeout });
    await menuButton.click();

    // Let the menu animate open/closed
    if (delayForAnimation) {
      await browser.pause(300);
    }
  }
}

describe('home page', () => {
  beforeEach(async () => {
    await IonicE2E.setDevice(Device.Mobile);
  });

  const waitResult = async (result) => {// , options: ElementActionOptions = { visibilityTimeout: 5000 }) => {
    await browser.waitUntil(async () => {
      const p = await $('.result-pane textarea');
      const value = await p.getValue();
      if (typeof result === 'string' && value === result) {
        return true;
      }
      console.log('Checking value against result', value, result, Object.keys(JSON.parse(value)), Object.keys(result));

      // return Object.keys(result) == Object.keys(JSON.parse(value));
      return isEqual(Object.keys(result), Object.keys(JSON.parse(value)));
    }, {
      timeout: 10000,
      timeoutMsg: 'Waited but still false',
      interval: 500
    });
  }

  const openPage = async (itemText: string) => {
    // Go back to home
    await browser.url('/home');

    await IonicE2E.openMenu();

    const menu = await $('#inbox-list');
    await menu.waitForDisplayed({ timeout: 5000 });

    const linkItem = await menu.$(`ion-item*=${itemText}`);
    await linkItem.waitForDisplayed({ timeout: 5000 });
    await linkItem.click();

    const menuElement = await $('ion-menu');
    await menuElement.waitForDisplayed({ timeout: 5000, reverse: true });
  }

  // Action sheet

  it('should open action sheet', async () => {
    await openPage('Action Sheet');

    await IonicE2E.tapButton('Show Actions');

    const pwaActionSheet = await $('pwa-action-sheet');
    await pwaActionSheet.waitForDisplayed({ timeout: 5000 });
    await (await expect(pwaActionSheet)).toBeDisplayed();
  });

  // App

  it('should open app page', async () => {
    await openPage('App');

    await IonicE2E.tapButton('Get Info');
    await IonicE2E.tapButton('Get Status');
    await IonicE2E.tapButton('Can Open Url');
    await IonicE2E.tapButton('Open Url');
    await IonicE2E.tapButton('Test Failing Call');
  });

  // Browser

  it('should do browser', async () => {
    await openPage('Browser');

    await IonicE2E.tapButton('Open URL');
    // iOS only
    // await IonicE2E.tapButton(('Open and then close URL');
    await IonicE2E.tapButton('Close most recently opened');
  });

  // Camera

  it('should do camera', async () => {
    await openPage('Camera');

    await IonicE2E.tapButton('Check Permissions');
    await IonicE2E.tapButton('Request Camera Permissions');
    await IonicE2E.tapButton('Request Photo Permissions');
    await IonicE2E.tapButton('Request All Permissions');
    await IonicE2E.tapButton('Take Picture');

    let shutter = await IonicE2E.waitElement('>>>.shutter', { visibilityTimeout: 20000 });
    await shutter.click();
    let accept = await IonicE2E.waitElement('>>>.accept-use', { visibilityTimeout: 20000 });
    await accept.click();

    await IonicE2E.tapButton('Take Picture and Save', { visibilityTimeout: 20000 });

    shutter = await IonicE2E.waitElement('>>>.shutter', { visibilityTimeout: 20000 });
    await shutter.click();
    accept = await IonicE2E.waitElement('>>>.accept-use', { visibilityTimeout: 20000 });
    await accept.click();

    await IonicE2E.tapButton('Choose Picture');
    await IonicE2E.tapButton('Prompt');
  });

  // Clipboard
  it('should do clipboard', async () => {
    await openPage('Clipboard');

    await IonicE2E.tapButton('Text to Clipboard');
    await IonicE2E.tapButton('Image to Clipboard');
    await IonicE2E.tapButton('Read Clipboard Data');
  });

  // Device
  it('should do device', async () => {
    await openPage('Device');

    await IonicE2E.tapButton('Device Info');
    await IonicE2E.tapButton('Device ID');
    await IonicE2E.tapButton('Device Battery Info');
    await IonicE2E.tapButton('Language Code');
  });

  it('should do filesystem', async () => {
    await openPage('Filesystem');

    await IonicE2E.tapButton('mkdir');
    await browser.pause(500);
    await waitResult('');
    await IonicE2E.tapButton('readdir');
    await waitResult({
      files: []
    });

    await IonicE2E.tapButton('write (f)');
    await waitResult({
      uri: "/DOCUMENTS/secrets/text.txt"
    });

    await IonicE2E.tapButton('read (f)');
    await waitResult({
      data: "This is a test"
    });

    await IonicE2E.tapButton('append (f)');
    await waitResult('');

    await IonicE2E.tapButton('read (f)');
    await waitResult({
      data: "This is a testMORE TESTS"
    });

    await IonicE2E.tapButton('stat (f)');
    await waitResult({
      "type": "file",
      "size": 14
    });

    await IonicE2E.tapButton('get uri');
    await waitResult({
      "uri": "/DATA/text.txt"
    });

    await IonicE2E.tapButton('directory');
    await waitResult({
      "data": "This is a test"
    });

    await IonicE2E.tapButton('rename file');
    await waitResult('');
    await IonicE2E.tapButton('copy file');
    await waitResult('');

    await IonicE2E.tapButton('request perms');
    await waitResult({
      publicStorage: "granted"
    });
    await IonicE2E.tapButton('check perms');
    await waitResult({
      publicStorage: "granted"
    });

    await IonicE2E.tapButton('mk (u)');
    await waitResult('');
    await IonicE2E.tapButton('rm (u)');
    await waitResult('');
    await IonicE2E.tapButton('read (u)');
    await waitResult('');
  });

  it('should do geolocation', async () => {
    await openPage('Geolocation');

    await IonicE2E.tapButton('Check Permissions');
    await waitResult({
      location: 'prompt'
    });
    await IonicE2E.tapButton('Request Permissions');
    await IonicE2E.tapButton('Get Location');

    await waitResult({
      "coords": {},
      "timestamp": ""
    });

    await IonicE2E.tapButton('Watch Location');

    // Wait for the watch to engage, takes a bit longer
    await browser.pause(1000);

    await waitResult('1');
  });

  it('should do haptics', async () => {
    await openPage('Haptics');

    await IonicE2E.tapButton('Heavy');
    await IonicE2E.tapButton('Medium');
    await IonicE2E.tapButton('Light');
    await IonicE2E.tapButton('Warn');
    await IonicE2E.tapButton('Success');
    await IonicE2E.tapButton('Error');
    await IonicE2E.tapButton('Vibrate');
    await IonicE2E.tapButton('Start');
    await IonicE2E.tapButton('Changed');
    await IonicE2E.tapButton('End');
  });

  it('should do keyboard', async () => {
    await openPage('Keyboard');

    await IonicE2E.tapButton('Show');
    await IonicE2E.tapButton('Hide');
    await IonicE2E.tapButton('Toggle Accessory Bar');
    await IonicE2E.tapButton('Toggle Scroll');
    await IonicE2E.tapButton('Set Style Light');
    await IonicE2E.tapButton('Set Style Dark');
    await IonicE2E.tapButton('Set Style Default');
    await IonicE2E.tapButton('Set Resize Mode None');
    await IonicE2E.tapButton('Set Resize Mode Body');
    await IonicE2E.tapButton('Set Resize Mode Native');
    await IonicE2E.tapButton('Set Resize Mode Ionic');
  });
  it.only('should do local notifications', async () => {
    await openPage('Local Notifications');

    await waitResult({ 'display': 'granted' });
  });
  it('should do motion', async () => {
  });
  it('should do network', async () => {
  });
  it('should do push notifications', async () => {
  });
  it('should do screen reader', async () => {
  });
  it('should do share', async () => {
  });
  it('should do splash screen', async () => {
  });
  it('should do status bar', async () => {
  });
  it('should do storage', async () => {
  });
  it('should do text zoom', async () => {
  });
  it('should do toast', async () => {
  });
});
