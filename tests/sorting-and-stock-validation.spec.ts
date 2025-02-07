import { test, expect } from "@playwright/test";
import HomePage from "../pages/homePage";
import SearchPage from "../pages/searchPage";
import ResultPage from "../pages/resultPage";

let homePage: HomePage;
let searchPage: SearchPage;
let resultPage: ResultPage;

test("Sorting and Stock Validation - @FirstPart", async ({ page }) => {
  homePage = new HomePage(page);
  searchPage = new SearchPage(page);
  resultPage = new ResultPage(page);

  await homePage.navigate();
  await searchPage.searchByKeyword("wireless headphones");
  await resultPage.sortByDescendingPrice();
  await resultPage.selectFourthItem();
  await resultPage.validateStock();
});
