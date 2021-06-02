import WebView, { CONTEXT_REF } from '../helpers/WebView';

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
    await (await expect(menu)).toHaveText('Tab 1');

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

});
