import * as IonicE2E from '@ionic/e2e';
import { Browser } from 'webdriverio';
import * as ExpectWebdriverIO from 'expect-webdriverio';

const isMatch = require('lodash/isMatch');
const isEqual = require('lodash/isEqual');

declare const driver: Browser<'async'>;
declare const expect: ExpectWebdriverIO.Expect;

describe('home page', () => {
  before(async () => {
    await IonicE2E.waitForLoad();
  });

  beforeEach(async () => {
    await IonicE2E.setDevice(IonicE2E.Device.Mobile);
    await IonicE2E.web();
    // await IonicE2E.url('/home');
  });

  const waitResult = async (result: any, { exact = false } = {}) => {
    // , options: ElementActionOptions = { visibilityTimeout: 5000 }) => {
    await driver.waitUntil(
      async () => {
        const p = await driver.$('.result-pane textarea');
        const value = await p.getValue();
        if (typeof result === 'string' && value === result) {
          return true;
        }

        // If this object must match exactly, do an exact comparison
        if (exact) {
          return isEqual(result, JSON.parse(value));
        }

        // Otherwise make sure the objects have the same keys
        return isEqual(
          Object.keys(result).sort(),
          Object.keys(JSON.parse(value)).sort(),
        );
      },
      {
        timeout: 10000,
        timeoutMsg: 'Waited but still false',
        interval: 500,
      },
    );
  };

  const openPage = async (itemText: string) => {
    // Go back to home
    // await driver.url('/home');
    await IonicE2E.web();

    await IonicE2E.openMenu();

    // Wait because sometimes if you click too quickly after opening the menu
    // it doesn't close properly
    await IonicE2E.pause(500);

    const menu = await driver.$('#inbox-list');
    await menu.waitForDisplayed({ timeout: 5000 });

    const linkItem = await menu.$(`ion-item*=${itemText}`);
    await linkItem.scrollIntoView();
    await linkItem.waitForDisplayed({ timeout: 5000 });
    // await linkItem.moveTo();
    await linkItem.click();

    const menuElement = await driver.$('ion-menu');
    await menuElement.waitForDisplayed({ timeout: 5000, reverse: true });
  };

  function findElementIOS(text: string) {
    return driver.$(
      `-ios class chain:**/XCUIElementTypeAny[\`label == "${text}"\`]`,
    );
  }

  // Action sheet

  it('should open action sheet', async () => {
    await openPage('Action Sheet');

    await IonicE2E.tapButton('Show Actions');

    await IonicE2E.onWeb(async () => {
      const pwaActionSheet = await IonicE2E.waitElement('pwa-action-sheet');
      await (await expect(pwaActionSheet)).toBeDisplayed();
    });

    await IonicE2E.onIOS(async () => {
      await IonicE2E.native();
      const actionSheet = await findElementIOS('Photo Options');
      await actionSheet.waitForDisplayed({ timeout: 5000 });
      await (await expect(actionSheet)).toBeDisplayed();
      const upload = await findElementIOS('Upload');
      await upload.waitForDisplayed({ timeout: 5000 });
      await upload.click();
      // Wait for the action sheet to close again
      await IonicE2E.pause(800);
    });

    await IonicE2E.onAndroid(async () => {
      await IonicE2E.native();
      const actionSheet = await driver.$(
        `android=new UiSelector().text("Photo Options")`,
      );
      await actionSheet.waitForDisplayed({ timeout: 2000 });
      await (await expect(actionSheet)).toBeDisplayed();

      const upload = await driver.$(`android=new UiSelector().text("Upload")`);
      await upload.waitForDisplayed({ timeout: 5000 });
      await upload.click();
      // Wait for the action sheet to close again
      await IonicE2E.pause(800);
    });
  });

  // App

  it('should open app page', async () => {
    await openPage('App');

    await IonicE2E.tapButton('Get Info');
    await IonicE2E.tapButton('Get Status');
    await IonicE2E.tapButton('Can Open Url');

    // Disabling these temporarily since they open a new tab
    // await IonicE2E.tapButton('Open Url');
    // await IonicE2E.tapButton('Test Failing Call');
  });

  // driver

  it.skip('should do browser', async () => {
    await openPage('Browser');

    await IonicE2E.tapButton('Open URL');
    // iOS only
    // await IonicE2E.tapButton(('Open and then close URL');
    await IonicE2E.tapButton('Close most recently opened');
  });

  // // Camera

  it.skip('should do camera', async () => {
    await openPage('Camera');

    await IonicE2E.tapButton('Check Permissions');
    await IonicE2E.tapButton('Request Camera Permissions');
    await IonicE2E.tapButton('Request Photo Permissions');
    await IonicE2E.tapButton('Request All Permissions');
    await IonicE2E.tapButton('Take Picture');
    await IonicE2E.pause(150000);

    let shutter = await IonicE2E.waitElement('>>>.shutter', {
      visibilityTimeout: 20000,
    });
    await shutter.click();
    let accept = await IonicE2E.waitElement('>>>.accept-use', {
      visibilityTimeout: 20000,
    });
    await accept.click();

    await IonicE2E.tapButton('Take Picture and Save', {
      visibilityTimeout: 20000,
    });

    shutter = await IonicE2E.waitElement('>>>.shutter', {
      visibilityTimeout: 20000,
    });
    await shutter.click();
    accept = await IonicE2E.waitElement('>>>.accept-use', {
      visibilityTimeout: 20000,
    });
    await accept.click();

    await IonicE2E.tapButton('Choose Picture');
    await IonicE2E.tapButton('Prompt');
  });

  // // Clipboard
  it('should do clipboard', async () => {
    await openPage('Clipboard');

    await IonicE2E.tapButton('Text to Clipboard');
    await IonicE2E.tapButton('Image to Clipboard');
    await IonicE2E.tapButton('Read Clipboard Data');
  });

  // // Device
  it('should do device', async () => {
    await openPage('Device');

    await IonicE2E.tapButton('Device Info');
    await IonicE2E.tapButton('Device Id');
    await IonicE2E.tapButton('Device Battery Info');
    await IonicE2E.tapButton('Language Code');
  });

  it('should do filesystem', async () => {
    await openPage('Filesystem');

    await IonicE2E.tapButton('mkdir');
    await driver.pause(500);
    await waitResult('');
    await IonicE2E.tapButton('readdir');
    await waitResult({
      files: [],
    });

    await IonicE2E.tapButton('write (f)');
    await waitResult({
      uri: '/DOCUMENTS/secrets/text.txt',
    });

    await IonicE2E.tapButton('read (f)');
    await waitResult({
      data: 'This is a test',
    });

    await IonicE2E.onIOS(async () => {
      await IonicE2E.tapButton('append (f)');
      await waitResult('');
    });

    await IonicE2E.onAndroid(async () => {
      await IonicE2E.tapButton('append (f)');
      await waitResult({
        uri: '/DOCUMENTS/secrets/text.txt',
      });
    });

    await IonicE2E.tapButton('read (f)');
    await waitResult({
      data: 'This is a testMORE TESTS',
    });

    await IonicE2E.tapButton('stat (f)');
    await waitResult({
      type: 'file',
      size: 24,
      ctime: 0,
      mtime: 0,
      uri: '',
    });

    await IonicE2E.tapButton('get uri');
    await waitResult({
      uri: '/DATA/secrets/text.txt',
    });
    await IonicE2E.tapButton('directory');
    await waitResult({
      data: 'This is a test',
    });

    await IonicE2E.tapButton('rename file');
    await waitResult('');
    await IonicE2E.tapButton('copy file');
    await waitResult('');

    await IonicE2E.tapButton('request perms');
    await waitResult({
      publicStorage: 'granted',
    });
    await IonicE2E.tapButton('check perms');
    await waitResult({
      publicStorage: 'granted',
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
      location: 'prompt',
    });
    await IonicE2E.tapButton('Request Permissions');

    await IonicE2E.onIOS(async () => {
      await IonicE2E.native();
      const allow = await findElementIOS('Allow Once');
      await allow.click();
      await IonicE2E.web();
      await waitResult({
        location: 'granted',
      });
    });

    await driver.setGeoLocation({
      latitude: 43.0664229,
      longitude: -89.3978106,
      altitude: 1.2,
    });
    // await IonicE2E.setLocation(43.0664229, -89.3978106);

    await IonicE2E.tapButton('Get Location');

    await waitResult({
      coords: {},
      timestamp: '',
    });

    await IonicE2E.pause(20000);
    await IonicE2E.tapButton('Watch Location');

    // Wait for the watch to engage, takes a bit longer
    await driver.pause(2000);

    // Fix to wait for anything
    // await waitResult('1');
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
    await IonicE2E.tapButton('set Style Light');
    await IonicE2E.tapButton('set Style Dark');
    await IonicE2E.tapButton('set Style Default');
    await IonicE2E.tapButton('set Resize Mode None');
    await IonicE2E.tapButton('set Resize Mode Body');
    await IonicE2E.tapButton('set Resize Mode Native');
    await IonicE2E.tapButton('set Resize Mode Ionic');
  });

  it('should do local notifications', async () => {
    await openPage('Local Notifications');

    await IonicE2E.pause(400);
    try {
      await driver.acceptAlert();
    } catch (e) {
      console.error('No alert to accept');
    }

    await waitResult(
      { display: 'granted' },
      {
        exact: true,
      },
    );

    await IonicE2E.tapButton('Schedule now');
    await IonicE2E.tapButton('Schedule now (custom icon on Android)');
    await IonicE2E.tapButton('Schedule in 10s');
    await IonicE2E.tapButton('Schedule in 10s (even while idle)');
    await IonicE2E.tapButton('Schedule in 10s with Extras');
    await IonicE2E.tapButton('Schedule every minute');
    await IonicE2E.tapButton('Schedule every 90 seconds');
    await IonicE2E.tapButton('Schedule every 90 seconds with Extras');
    await IonicE2E.tapButton('Refresh Pending Notifications');
    await IonicE2E.tapButton('Schedule just one');
    await IonicE2E.tapButton('Schedule just one (with seconds)');
    await IonicE2E.tapButton('Schedule just one (without seconds)');
    await IonicE2E.tapButton('Cancel just one');
    // Cancel all pending notifications so that none happen during the rest of our tests
    await IonicE2E.tapButton('Cancel Pending Notifications');
    await IonicE2E.pause(10000);
  });

  it('should do motion', async () => {
    await openPage('Motion');

    await IonicE2E.onIOS(async () => {
      /*
      Not working for some reason, only works with actual click from user (simulator)
      await IonicE2E.tapButton('Request Motion Permission');
      await IonicE2E.pause(2000);
      await IonicE2E.tryAcceptAlert();
      */
    });

    await IonicE2E.onWeb(async () => {
      await IonicE2E.tapButton('Listen Orientation');
      await IonicE2E.tapButton('Stop Orientation');
      await IonicE2E.tapButton('Listen Acceleration');
      await IonicE2E.tapButton('Stop Acceleration');
    });
  });

  it('should do network', async () => {
    await openPage('Network');

    const status = await IonicE2E.waitElement('#connection-status');

    await (await expect(status)).toHaveText('Connected');

    const type = await IonicE2E.waitElement('#connection-type');

    await (await expect(type)).toHaveText('Connection type is wifi');
  });

  it('should do push notifications', async () => {
    await openPage('Push Notifications');
  });

  it('should do screen reader', async () => {
    await openPage('Screen Reader');

    await IonicE2E.tapButton('Enabled?');
    await IonicE2E.tapButton('Speak');
  });

  it('should do share', async () => {
    await openPage('Share');

    await IonicE2E.tapButton('Show Sharing');
    await IonicE2E.tapButton('Show Sharing (text only)');
    await IonicE2E.tapButton('Show Sharing (url only)');

    await IonicE2E.onIOS(async () => {
      await IonicE2E.native();
      // Wait to make sure its displayed
      await IonicE2E.pause(1000);
      const close = await findElementIOS('Close');
      close.click();
    });
  });

  it('should do splash screen', async () => {
    await openPage('Splash Screen');

    await IonicE2E.tapButton('Show Splash, auto-hide, default length');
    await IonicE2E.tapButton('Show Splash, auto-hide, 2s');
    await IonicE2E.tapButton('Show Splash, 6s');
  });

  it('should do status bar', async () => {
    await openPage('Status Bar');

    await IonicE2E.onWeb(async () => {
      const status = await IonicE2E.waitElement('#status');
      await (
        await expect(status)
      ).toHaveText('StatusBar plugin not supported on web');
    });

    await IonicE2E.onIOS(async () => {
      await IonicE2E.tapButton('Change StatusBar Style Default');
      await IonicE2E.tapButton('Change StatusBar Style Light');
      await IonicE2E.tapButton('Change StatusBar Style Dark');
      // await IonicE2E.tapButton('Show');
      // await IonicE2E.tapButton('Hide');
      await IonicE2E.tapButton('overlay Statusbar');
      await IonicE2E.tapButton('unoverlay Statusbar');
      await IonicE2E.tapButton('Set Background Color');
      await IonicE2E.tapButton('get Info');
    });
  });

  it('should do storage', async () => {
    await openPage('Storage');

    await IonicE2E.setInputValue('#storage-value', 'myvalue');

    await IonicE2E.tapButton('Set key1');
    await IonicE2E.tapButton('Get key1');

    await waitResult({
      value: 'myvalue',
    });

    await IonicE2E.tapButton('Get All Keys');

    await waitResult({
      keys: ['key1'],
    });

    await IonicE2E.tapButton('Remove key1');

    await IonicE2E.tapButton('Get key1');

    await waitResult({
      value: null,
    });

    await IonicE2E.tapButton('Set key1');
    await IonicE2E.tapButton('Clear Storage');

    await IonicE2E.tapButton('Get All Keys');

    await waitResult({
      keys: [],
    });

    await IonicE2E.tapButton('Migration Test');

    await waitResult({
      migrated: [],
      existing: [],
    });
  });

  it('should do text zoom', async () => {
    await openPage('Text Zoom');

    await IonicE2E.onWeb(async () => {
      const status = await IonicE2E.waitElement('#status');
      await (
        await expect(status)
      ).toHaveText('TextZoom plugin not supported on web');
    });

    await IonicE2E.onIOS(async () => {
      await IonicE2E.tapButton('Get Current Zoom');
      await IonicE2E.tapButton('Get Preferred Zoom');
    });
  });

  it('should do toast', async () => {
    await openPage('Toast');

    await IonicE2E.onWeb(async () => {
      await IonicE2E.tapButton('Show (top)');
      let toast = await IonicE2E.waitElement('pwa-toast');
      await expect(toast).toHaveText('Hello!');
      await IonicE2E.tapButton('Show (center)');
      await expect(toast).toHaveText('Hello!');
      await IonicE2E.tapButton('Show (bottom)');
      await expect(toast).toHaveText('Hello!');
    });
  });
});