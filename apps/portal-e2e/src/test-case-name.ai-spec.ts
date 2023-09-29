import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';


test('add new user', async ({ page }) => {
  await page.goto('/users');
  await page.waitForTimeout(1000);

  await page.getByTestId('add_user_button').focus()
  await page.getByTestId('add_user_button').click()

  const fullName = faker.person.fullName()

  await page.getByTestId('full_name').focus()
  await page.getByTestId('full_name').fill(fullName)

  const email = faker.internet.email({ firstName: fullName })
  await page.getByTestId('email').focus()
  await page.getByTestId('email').fill(email)

  await page.getByTestId('submit_button').focus()
  await page.getByTestId('submit_button').click()


  await page.getByText(email).focus()
})


// {
//   page: 'users_pages',
//   title: 'Add a new user',
//   description: 'Get email and fullName from user and add a new user',
//   flow: [
//     [ 'navigate', '/users' ],
//     [ 'focus', 'add_user_button' ],
//     [ 'click', 'add_user_button' ],
//     [ 'find', 'full_name' ],
//     [ 'focus', 'full_name', getUserInput({
//       'fullName': { type: 'string', placeholder: 'Full Name', description: 'Enter user\'s full name' }
//     }) ],
//     [ 'focus', 'email' ],
//     [ 'fill', 'email', getUserInput({
//       'fullName': { type: 'email', placeholder: 'Email address', description:'Enter user\'s email address' }
//     }) ],
//     [ 'focus', 'submit_button' ],
//     [ 'click', 'submit_button' ],
//     [ 'focus', `text={{email}}` ],
//   ]
// }
