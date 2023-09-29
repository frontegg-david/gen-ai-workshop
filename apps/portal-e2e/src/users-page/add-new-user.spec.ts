import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';

test.skip('Add a new user', async ({ page }) => {

  await page.goto('/');
  await page.waitForTimeout(1000);

  await page.getByTestId('nav_users_page').focus()
  await page.getByTestId('nav_users_page').click()

  const fullName = faker.person.fullName()
  const email = faker.internet.email({ firstName: fullName })

  await page.getByTestId('add_user_button').focus()
  await page.getByTestId('add_user_button').click()

  await page.getByTestId('full_name').focus()
  await page.getByTestId('full_name').fill(fullName)

  await page.getByTestId('email').focus()
  await page.getByTestId('email').fill(email)

  await page.getByTestId('submit_button').focus()
  await page.getByTestId('submit_button').click()

  await page.getByTestId('users_table').focus()
})
