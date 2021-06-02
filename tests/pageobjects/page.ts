export default class Page {
  /**
   * Opens a sub page of the page
   */
  open(path: string): Promise<string> {
    return browser.url(path);
  }
}
