import WebView, { CONTEXT_REF } from './tests/helpers/WebView';

describe('Home page', () => {
  beforeEach(() => {
    WebView.waitForWebsiteLoaded();
  });

  it('Should open side menu', async () => {
    // To be able to use the site in the webview webdriver.io we first need to
    // change the context from native to webview
    WebView.switchToContext(CONTEXT_REF.WEBVIEW);
    // Now the site can be accessed like you would automate a normal website
    // keep in mind the responsiveness

    const menu = await $('#menu-button');
    await menu.waitForDisplayed({ timeout: 5000 });
    await (await expect(menu)).toExist();

    await menu.click();

    const homeItem = await $('ion-label*=Home');
    await (await expect(homeItem)).toBeDisplayed();

    /**
     * IMPORTANT!!
     *  Because the app is not closed and opened between the 2 tests
     *  (and thus is NOT starting in the default context which is native)
     *  the context is here set to native. This is bad practice,
     *  because you should never rely on the state of a different test,
     *  but here it is excepted ;-)
     */
    WebView.switchToContext(CONTEXT_REF.NATIVE);
  });

  it('should open action sheet page', async () => {
    WebView.switchToContext(CONTEXT_REF.WEBVIEW);
    const menu = await $('#menu-button');
    await menu.waitForDisplayed({ timeout: 5000 });
    await (await expect(menu)).toExist();

    await menu.click();

    const item = await $('ion-label*=Action Sheet');
    await item.click();

    const title = await $('ion-title*=Action Sheet');
    await (await expect(title)).toBeDisplayed();
    WebView.switchToContext(CONTEXT_REF.NATIVE);
  });

  it('should open action sheet', async () => {
    WebView.switchToContext(CONTEXT_REF.WEBVIEW);
    const button = await $('ion-button=Show Actions');
    await button.waitForDisplayed({ timeout: 5000 });
    await (await expect(button)).toBeDisplayed();

    await button.click();

    await driver.pause(4000);

    WebView.switchToContext(CONTEXT_REF.NATIVE);

    //const actionSheet = await $(`~** /XCUIElementTypeSheet[\`label == "Photo Options"\`]`);
    const actionSheet = await $(`-ios class chain:**/XCUIElementTypeSheet[\`label == "Photo Options"\`]`);

    await actionSheet.waitForDisplayed({ timeout: 5000 });
    await (await expect(actionSheet)).toBeDisplayed();

  });
});
