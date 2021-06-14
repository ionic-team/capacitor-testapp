import { Device, IonicE2E } from "../helpers/Ionic";

const isMatch = require('lodash/isMatch');
const isEqual = require('lodash/isEqual');


describe('home page', () => {
  beforeEach(async () => {
    await IonicE2E.setDevice(Device.Mobile);
    await IonicE2E.web();
    await IonicE2E.url('/home');
  });

  const waitResult = async (result) => {// , options: ElementActionOptions = { visibilityTimeout: 5000 }) => {
    await driver.waitUntil(async () => {
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
    // await driver.url('/home');

    await IonicE2E.openMenu();

    const menu = await $('#inbox-list');
    await menu.waitForDisplayed({ timeout: 5000 });

    const linkItem = await menu.$(`ion-item*=${itemText}`);
    await linkItem.waitForDisplayed({ timeout: 5000 });
    // await linkItem.moveTo();
    await linkItem.scrollIntoView();
    await linkItem.click();

    const menuElement = await $('ion-menu');
    await menuElement.waitForDisplayed({ timeout: 5000, reverse: true });
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
      const actionSheet = await IonicE2E.findElementIOS('Photo Options');
      await actionSheet.waitForDisplayed({ timeout: 5000 });
      await (await expect(actionSheet)).toBeDisplayed();
    });

    await IonicE2E.pause(5000);
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

  // driver

  it('should do driver', async () => {
    await openPage('driver');

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
    await driver.pause(500);
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
    await driver.pause(1000);

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
  it('should do local notifications', async () => {
    await openPage('Local Notifications');

    await waitResult({ 'display': 'granted' });

    await IonicE2E.tapButton('Schedule now');
    await IonicE2E.tapButton('Schedule now (custom icon on Android)');
    await IonicE2E.tapButton('Schedule in 10s');
    await IonicE2E.tapButton('Schedule in 10s (even while idle)');
    await IonicE2E.tapButton('Schedule in 10s with Extras');
    await IonicE2E.tapButton('Schedule every minute');
    await IonicE2E.tapButton('Schedule every 90 seconds');
    await IonicE2E.tapButton('Schedule every 90 seconds with Extras');
    await IonicE2E.tapButton('Cancel Pending Notifications');
    await IonicE2E.tapButton('Refresh Pending Notifications');
    await IonicE2E.tapButton('Schedule just one');
    await IonicE2E.tapButton('Schedule just one (with seconds)');
    await IonicE2E.tapButton('Schedule just one (without seconds)');
    await IonicE2E.tapButton('Cancel just one');
  });

  it('should do motion', async () => {
    await openPage('Motion');

    await IonicE2E.tapButton('Listen orientation');
    await IonicE2E.tapButton('Stop orientation');
    await IonicE2E.tapButton('Listen acceleration');
    await IonicE2E.tapButton('Stop acceleration');
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
  });
  it('should do splash screen', async () => {
    await openPage('Splash Screen');

    await IonicE2E.tapButton('Show Splash, auto-hide, default length');
    await IonicE2E.tapButton('Show Splash, auto-hide, 2s');
    await IonicE2E.tapButton('Show Splash, 6s');
  });
  it.only('should do status bar', async () => {
    await openPage('Status Bar');

    const status = await IonicE2E.waitElement('#status');
    await (await expect(status)).toHaveText('StatusBar plugin not supported on web');
  });
  it('should do storage', async () => {
    await openPage('Storage');
  });
  it('should do text zoom', async () => {
    await openPage('Text Zoom');
  });
  it('should do toast', async () => {
    await openPage('Toast');
  });
});
