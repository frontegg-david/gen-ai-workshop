import { test, expect } from '@playwright/test';


test.describe('authenticated', () => {
  test.describe('overview', () => {
    test('contains ai', async ({ page }) => {
      await page.goto('/');

      // delay for 1 second
      await page.waitForTimeout(1000);
      expect(await page.locator('text=Total Active Users').isVisible())


      // navigate to the /login
      //
      await page.waitForTimeout(5000);
    });

    test('add new user', async ({ page }) => {
      await page.goto('/');

      // delay for 1 second
      await page.waitForTimeout(1000);
      expect(await page.locator('text=Total Active Users').isVisible())


      // navigate to the /login
      //
      await page.waitForTimeout(5000);
    });
  });

});
