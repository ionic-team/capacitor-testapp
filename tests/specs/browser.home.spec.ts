
describe('home page', () => {
  it('should open menu', async () => {
    browser.url('home');
    browser.setWindowSize(375, 812);

    const menu = await $('#menu-button');
    await menu.waitForDisplayed({ timeout: 5000 });
    await (await expect(menu)).toExist();
  });
});
