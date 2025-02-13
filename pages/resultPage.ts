import { Page, Locator, expect } from "@playwright/test";
import exp from "constants";

class ResultPage {
  private page: Page;
  readonly sortByDropdown: Locator;
  readonly sortByDescOrder: Locator;
  readonly itemRow!: string;
  readonly accessItem!: string;
  readonly stockInfo: Locator;

  constructor(page: Page) {
    this.page = page;
    this.sortByDropdown = page
      .locator("#a-autoid-0-announce")
      .getByText("Sort by:");
    this.sortByDescOrder = page.locator('[id="s-result-sort-select_2"]');
    this.itemRow = 'div[data-component-type="s-search-result"]';
    this.accessItem = '[class="s-image"]';
    this.stockInfo = page.locator('[id="availability"]').first();
  }

  async sortByDescendingPrice() {
    await this.sortByDropdown.click();
    await this.page.waitForLoadState("domcontentloaded");
    await this.sortByDescOrder.click();
  }

  async selectItemNumber(number: number) {
    await this.page.waitForSelector(this.itemRow);
    const items = await this.page.$$(this.itemRow);
    if (items.length >= number) {
      await items[number - 1].scrollIntoViewIfNeeded();
      await items[number - 1].waitForElementState("visible");
      const productLink = await items[number - 1].waitForSelector(
        this.accessItem
      );
      await productLink.click();
    } else {
      throw new Error(`Less than ${number} item/s in search result.`);
    }
  }

  async validateStock() {
    await this.page.waitForLoadState("domcontentloaded");
    const stockAvailable = await this.stockInfo.textContent();
    const stockAvailableLowerCase = stockAvailable?.toLowerCase();
    if (
      stockAvailableLowerCase &&
      stockAvailableLowerCase.includes("in stock")
    ) {
      return console.log("Product in stock.");
    } else {
      throw new Error("No stock available.");
    }
  }
}

export default ResultPage;
