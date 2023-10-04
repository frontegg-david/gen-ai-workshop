export const generateReportExample = {

  user: `file name: test-case-name.spec.ts
page name: test active page

code:
  \`\`\`
import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';

test('test title', async ({ page }) => {
  await page.goto('/page');
  await page.waitForTimeout(1000);

  await page.getByTestId('element_to_focus').focus()
  await page.getByTestId('element_to_click').click()

  // get user input
  const fullName = faker.person.fullName()

  await page.getByTestId('input_to_focus').focus()
  await page.getByTestId('input_to_fill').fill(fullName)

  // click on submit button
  await page.getByTestId('submit_button').focus()
  await page.getByTestId('submit_button').click()

})
\`\`\`

e2e report`,

  assistant: `# {the test title}

`
}
