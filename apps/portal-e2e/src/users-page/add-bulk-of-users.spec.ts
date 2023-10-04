import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('add bulk of users', async ({ page }) => {

  await page.goto('/');
  await page.waitForTimeout(1000);

  await page.getByTestId('nav_users_page').focus()
  await page.getByTestId('nav_users_page').click()

  await page.getByTestId('add_bulk_users_button').focus()
  await page.getByTestId('add_bulk_users_button').click()

  const emails = [ faker.internet.email(), faker.internet.email(), faker.internet.email() ].join(',')

  await page.getByTestId('emails').focus()
  await page.getByTestId('emails').fill(emails)


  await page.getByTestId('submit_button').focus()
  await page.getByTestId('submit_button').click()

  await page.getByTestId('users_table').focus()
})
