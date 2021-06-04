
describe('home page', () => {
  beforeEach(async () => {
    await browser.setWindowSize(375, 812);
  });

  const assertPageChange = async (title: string) => {
    const pageTitle = await $('ion-title*=Action Sheet');
    await (await expect(pageTitle)).toBeDisplayed();
  }

  const openPage = async (itemText: string) => {
    // Go back to home
    await browser.url('/home');
    const menuButton = await $('#menu-button');
    await menuButton.waitForDisplayed({ timeout: 5000 });
    await menuButton.click();

    // Let the menu animate open/closed
    await browser.pause(300);

    const menu = await $('#inbox-list');
    await menu.waitForDisplayed({ timeout: 5000 });

    const linkItem = await menu.$(`ion-item*=${itemText}`);
    await linkItem.waitForDisplayed({ timeout: 5000 });
    await linkItem.click();

    const menuElement = await $('ion-menu');
    await menuElement.waitForDisplayed({ timeout: 5000, reverse: true });
  }

  it('should open action sheet page', async () => {
    await openPage('Action Sheet');

    await assertPageChange('Action Sheet');
  });

  it('should open action sheet', async () => {
    await openPage('Action Sheet');

    const button = await $('ion-button=Show Actions');
    await button.waitForDisplayed({ timeout: 5000 });
    await (await expect(button)).toBeDisplayed();

    await button.click();

    const pwaActionSheet = await $('pwa-action-sheet');
    await pwaActionSheet.waitForDisplayed({ timeout: 5000 });
    await (await expect(pwaActionSheet)).toBeDisplayed();
  });

  /*
  it('should open app page', async () => {
    await openPage('App');
  });
  */
});
