
describe('home page', () => {
  beforeEach(async () => {
    browser.url('home');
    browser.setWindowSize(375, 812);
  });

  it('should open menu', async () => {

    const menu = await $('#menu-button');
    await menu.waitForDisplayed({ timeout: 5000 });
    await (await expect(menu)).toExist();

    await menu.click();

    const homeItem = await $('ion-label*=Home');
    await (await expect(homeItem)).toBeDisplayed();
  });

  it('should open action sheet page', async () => {
    browser.url('home');
    browser.setWindowSize(375, 812);

    const menu = await $('#menu-button');
    await menu.waitForDisplayed({ timeout: 5000 });
    await (await expect(menu)).toExist();

    await menu.click();

    const item = await $('ion-label*=Action Sheet');
    await item.click();

    const title = await $('ion-title*=Action Sheet');
    await (await expect(title)).toBeDisplayed();
  });

  it('should open action sheet', async () => {
    browser.url('action-sheet');
    browser.setWindowSize(375, 812);

    const button = await $('ion-button=Show Actions');
    await button.waitForDisplayed({ timeout: 5000 });
    await (await expect(button)).toBeDisplayed();

    await button.click();

    const pwaActionSheet = await $('pwa-action-sheet');
    await pwaActionSheet.waitForDisplayed({ timeout: 5000 });
    await (await expect(pwaActionSheet)).toBeDisplayed();
  });
});
