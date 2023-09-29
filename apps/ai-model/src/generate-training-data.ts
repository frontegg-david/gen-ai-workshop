import { E2EReport, FlowPrompt, WithSuggestions } from './types';
import OpenAI from 'openai';
import Handlebars from 'handlebars';

const openai = new OpenAI({
  apiKey: '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'
});

export const generateSuggestions = async (report: E2EReport): Promise<WithSuggestions<E2EReport>> => {

  const input = 'file name: {{fileName}}\npage name: {{pageName}}\n\ncode: \n```\n{{code}}\n```'
  const content = Handlebars.compile(input)({
    fileName: report.fileName,
    pageName: report.pageName,
    code: report.code
  })

  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        'role': 'system',
        'content': `ack as auto completion prediction generator that receive e2e report, e2e test case, pageName and fileName, to generate suggestion to be stored as embeddings for use commands input.

output must be valid json array contains 5 short sentences that have the same meaning of the flow.
predict what is the user may ask.

output example:
["sentence 1", "sentence 2", ... , "sentence 5"]
`
      },
      {
        'role': 'user',
        content,
      }
    ],
    temperature: .8,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  try {
    const suggestions = JSON.parse(response.choices[0].message.content)
    return { ...report, suggestions }
  }catch (e){
    console.log(response.choices[0].message.content)
  }
}


export const generateFlowPrompts = async (report: WithSuggestions<E2EReport>): Promise<FlowPrompt> => {
  const input = 'file name: {{fileName}}\npage name: {{pageName}}\n\ncode: \n```\n{{code}}\n```\n\ne2e report: \n{{flow}}'

  const content = Handlebars.compile(input)({
    fileName: report.fileName,
    pageName: report.pageName,
    code: report.code,
    flow: report.flow.join('\n')
  })


  const response = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo-16k',
    messages: [
      {
        'role': 'system',
        'content': 'Act as e2e to javascript generator that\nreceive input of e2e test case and generate object represent the flow to be executed when user ask for a specific command.\n\n'
      },
      {
        'role': 'user',
        'content': 'file name: test-case-name.spec.ts\npage name: test active page\n\ncode: \n```\nimport { test } from \'@playwright/test\';\nimport { faker } from \'@faker-js/faker\';\n\n\ntest(\'add new user\', async ({ page }) => {\n  await page.goto(\'/users\');\n  await page.waitForTimeout(1000);\n\n  await page.getByTestId(\'add_user_button\').focus()\n  await page.getByTestId(\'add_user_button\').click()\n\n  const fullName = faker.person.fullName()\n\n  await page.getByTestId(\'full_name\').focus()\n  await page.getByTestId(\'full_name\').fill(fullName)\n\n  const email = faker.internet.email({ firstName: fullName })\n  await page.getByTestId(\'email\').focus()\n  await page.getByTestId(\'email\').fill(email)\n\n  await page.getByTestId(\'submit_button\').focus()\n  await page.getByTestId(\'submit_button\').click()\n\n  await page.getByText(email).focus()\n})\n```\n\ne2e report'
      },
      {
        'role': 'assistant',
        'content': '{\n  page: \'users_pages\',\n  title: \'Add a new user\',\n  description: \'add a new user to the portal by given a full name and email address\',\n  flow: [\n    [ \'navigate\', \'/users\' ],\n    [ \'focus\', \'add_user_button\' ],\n    [ \'click\', \'add_user_button\' ],\n    [ \'find\', \'full_name\' ],\n    [ \'focus\', \'full_name\'],\n    [ \'fill\', getFullName()],\n    [ \'focus\', \'email\' ],\n    [ \'fill\', getEmailAddress()],\n    [ \'focus\', \'submit_button\' ],\n    [ \'click\', \'submit_button\' ],\n    [ \'focus\', `text={{email}}` ],\n  ]\n}'
      },
      {
        'role': 'user',
        content
      }
    ],
    temperature: 0.73,
    max_tokens: 1000,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

    const prompt = response.choices[0].message.content
    return { prompt, ...report }
}
