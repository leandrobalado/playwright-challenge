import { Page } from "playwright/test";

class HomePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async navigate() {
    await this.page.goto("/");
  }
}

export default HomePage;
