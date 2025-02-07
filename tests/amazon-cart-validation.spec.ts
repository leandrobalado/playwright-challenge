import { test, expect } from "@playwright/test";
import HomePage from "../pages/homePage";
import SearchPage from "../pages/searchPage";
import ResultPage from "../pages/resultPage";
import CartPage from "../pages/cartPage";

let homePage: HomePage;
let searchPage: SearchPage;
let resultPage: ResultPage;
let cartPage: CartPage;

test.use({
    storageState: 'handle-captcha.json'
})

test("Amazon Cart Validation - @SecondPart", async ({ page }) => {
  homePage = new HomePage(page);
  searchPage = new SearchPage(page);
  resultPage = new ResultPage(page);
  cartPage = new CartPage(page);

  let searchKeyword = "keyboard";

  await homePage.navigate();
  await searchPage.searchByKeyword(searchKeyword);
  await resultPage.selectItemNumber(1);
  await resultPage.validateStock();

  await cartPage.addProductToCart();

  const productName = await cartPage.getProductName();
  const productPrice = await cartPage.getProductPrice();
  const productQuantity = await cartPage.getProductQuantity();
  const subtotalInfo = await cartPage.getSubtotalPurchase();

  expect(productName).toContain(searchKeyword);
  expect(subtotalInfo).toContain(productPrice);
  expect(subtotalInfo).toContain(productQuantity);

  await page.close();
});
