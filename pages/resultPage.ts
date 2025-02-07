import { Page, Locator, expect } from "@playwright/test";

class ResultPage {
  private page: Page;
  readonly sortByDropdown: Locator;
  readonly sortByDescOrder: Locator;
  readonly stockInfo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortByDropdown = page
      .locator("#a-autoid-0-announce")
      .getByText("Sort by:");
    this.sortByDescOrder = page.locator('[id="s-result-sort-select_2"]');
    this.stockInfo = page.locator('[id="availability"]');
  }

  async sortByDescendingPrice() {
    await this.sortByDropdown.click();
    await this.page.waitForLoadState("domcontentloaded", { timeout: 5000 });
    await this.sortByDescOrder.click();
  }

  async selectItemNumber(number: number) {
    await this.page.waitForSelector(
      'div[data-component-type="s-search-result"]'
    );
    const items = await this.page.$$(
      'div[data-component-type="s-search-result"]'
    );
    if (items.length >= number) {
      await items[number-1].scrollIntoViewIfNeeded();
      await items[number-1].waitForElementState("visible");
      const productLink = await items[number-1].waitForSelector('[class="s-image"]');
      await productLink.click();
    } else {
      throw new Error("Less than 4 items in search results.");
    }
  }

  async validateStock() {
    await this.page.waitForLoadState("domcontentloaded", { timeout: 5000 });
    const stockAvailable = await this.stockInfo.textContent();
    const stockAvailableLowerCase = stockAvailable?.toLowerCase();
    if (
      stockAvailableLowerCase &&
      stockAvailableLowerCase.includes("in stock")
    ) {
      expect(stockAvailableLowerCase).toContain("in stock");
      return console.log("Product in stock.");
    } else {
      return console.log("No stock available.");
    }
  }
}

export default ResultPage;
