import { test } from "@playwright/test";
import HomePage from "../pages/homePage";
import SearchPage from "../pages/searchPage";
import ResultPage from "../pages/resultPage";

let homePage: HomePage;
let searchPage: SearchPage;
let resultPage: ResultPage;

test.use({
  storageState: 'handle-captcha.json'
})

test("Sorting and Stock Validation - @FirstPart", async ({ page }) => {
  homePage = new HomePage(page);
  searchPage = new SearchPage(page);
  resultPage = new ResultPage(page);

  await homePage.navigate();
  await searchPage.searchByKeyword("wireless headphones");
  await resultPage.sortByDescendingPrice();
  await resultPage.selectItemNumber(4);
  await resultPage.validateStock();

  await page.close();
});
