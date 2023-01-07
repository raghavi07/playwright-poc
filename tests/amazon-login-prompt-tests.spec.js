import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('https://www.amazon.in/');
  await expect(page).toHaveTitle(/Amazon.in/);
});

test('Amazon login validation', async ({ page }) => {
  await page.getByRole('link', { name: 'Hello, sign in Account & Lists' }).click();
  await expect(page).toHaveTitle(/Amazon Sign In/);
});

test('Clicking on cart prompts login', async ({ page }) => {
  await page.getByRole('link', { name: '0 items in cart' }).click();
  await page.getByRole('link', { name: 'Sign in to your account' }).click();
  await expect(page).toHaveTitle(/Amazon Sign In/);
});

test('Checkout an item prompts login', async ({ page }) => {
  await page.getByTitle('Search in').selectOption('search-alias=stripbooks');
  await page.getByRole('textbox', { name: 'Search' }).fill('python complete reference');
  await page.getByRole('textbox', { name: 'Search' }).press('ArrowDown');
  await page.getByRole('textbox', { name: 'Search' }).press('ArrowDown');
  await page.getByRole('textbox', { name: 'Search' }).press('Enter');
  await page.getByRole('link', { name: 'Sponsored Ad - Python: The Complete Reference' }).click();
  const page1Promise = page.waitForEvent('popup');
  const page1 = await page1Promise;
  await page1.getByTitle('Add to Shopping Cart').click();
  await page1.getByRole('link', { name: '1 item in cart' }).click();
  await page1.getByRole('button', { name: 'Proceed to checkout' }).click();
  await expect(page1).toHaveTitle(/Amazon Sign In/);
});