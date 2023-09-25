import { expect, test } from '@playwright/test';


test.describe('users', () => {

  test('add new user', async ({ page }) => {

    await page.goto('/');
    await page.waitForTimeout(1000);

    expect(await page.locator('text=Total Active Users').isVisible())
  })

})
