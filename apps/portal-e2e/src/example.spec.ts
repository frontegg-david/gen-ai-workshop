import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('/');

  // delay for 1 second
  await page.waitForTimeout(1000);
  expect(await page.locator('text=Total Active Users').isVisible())

  await page.waitForTimeout(5000);
});
