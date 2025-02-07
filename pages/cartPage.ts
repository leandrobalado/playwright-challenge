import { Page, Locator } from "@playwright/test";

class CartPage {
  private page: Page;
  readonly addToCartBtn: Locator;
  readonly goToCartBtn: Locator;
  readonly cartHeading: Locator;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly productQuantity: Locator;
  readonly subtotalPurchase: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addToCartBtn = page
      .getByRole("button", { name: "Add to Cart" })
      .first();
    this.goToCartBtn = page.getByRole("link", { name: "Go to Cart" }).first();
    this.cartHeading = page.getByRole("heading", { name: "Shopping Cart" });
    this.productName = page.locator('[class="a-truncate-cut"]');
    this.productPrice = page.locator(
      '[class="a-price a-text-price sc-product-price sc-white-space-nowrap a-size-medium"] [aria-hidden="true"]'
    );
    this.productQuantity = page.locator('[data-a-selector="value"]');
    this.subtotalPurchase = page.locator('[data-name="Subtotals"]').nth(1);
  }

  async addProductToCart() {
    await this.page.waitForLoadState("domcontentloaded", { timeout: 5000 });
    await this.addToCartBtn.click();
    await this.goToCartBtn.click();
  }

  async getProductName(): Promise<string | null> {
    const name = (await this.productName.innerText()).toLowerCase();
    return name;
  }

  async getProductPrice(): Promise<string | null> {
    const price = await this.productPrice.innerText();
    return price;
  }

  async getProductQuantity(): Promise<string | null> {
    const quantity = await this.productQuantity.innerText();
    return quantity;
  }

  async getSubtotalPurchase(): Promise<string | null> {
    const subtotalString = (await this.subtotalPurchase.innerText()).trim();
    return subtotalString;
  }
}

export default CartPage;
