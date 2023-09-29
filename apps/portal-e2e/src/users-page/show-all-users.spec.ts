import { expect, test } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.skip('should show all users', async ({ page }) => {

  await page.goto('/');
  await page.waitForTimeout(1000);

  await page.getByTestId('nav_users_page').focus()
  await page.getByTestId('nav_users_page').click()

  await page.getByTestId('users_table').focus()
  const usersRows = await page.getByTestId('users_table').locator('tbody tr').count();

  expect(usersRows).toBe(40)
})
