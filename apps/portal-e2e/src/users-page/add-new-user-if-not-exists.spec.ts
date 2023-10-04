import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { isUserExists } from './helpers'

test('Add a new user if not exists', async ({ page }) => {

  const fullName = faker.person.fullName()
  const email = faker.internet.email({ firstName: fullName })
  const userExists = await isUserExists(email)
  if (userExists) {
    throw new Error(`user already ${email} exists`)
  } else {
    await page.goto('/');
    await page.waitForTimeout(1000);

    await page.getByTestId('nav_users_page').focus()
    await page.getByTestId('nav_users_page').click()

    await page.getByTestId('add_user_button').focus()
    await page.getByTestId('add_user_button').click()

    await page.getByTestId('full_name').focus()
    await page.getByTestId('full_name').fill(fullName)

    await page.getByTestId('email').focus()
    await page.getByTestId('email').fill(email)

    await page.getByTestId('submit_button').focus()
    await page.getByTestId('submit_button').click()

    await page.getByTestId('users_table').focus()
  }
})
