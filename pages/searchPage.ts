import { Page, Locator } from "@playwright/test";

class SearchPage {
  private page: Page;
  readonly searchInput: Locator;
  readonly submitSearch: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('Search Amazon');
    this.submitSearch = page.locator('[id="nav-search-submit-text"]');
  }

  async searchByKeyword (keyword:string){
    await this.searchInput.fill(keyword);
    await this.submitSearch.click();
  }
}

export default SearchPage;