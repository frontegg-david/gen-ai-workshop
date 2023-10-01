import OpenAI from 'openai';
import { Response } from 'express';
import { readFileSync } from 'fs';
import { join } from 'path';
import * as process from 'process';

const openai = new OpenAI({
  apiKey: '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'
});

const model = 'gpt-3.5-turbo-0613'

function isUserExists({ email }) {

  console.log('isUserExists', email);
  return JSON.stringify(email === 'david@frontegg.com');
}

export async function runConversation(res: Response, userCommand: string) {
  console.log('running command', userCommand)

  const temp = readFileSync(join(process.cwd(), 'apps/backend/src/assets/prompts/template.txt'), 'utf8')
  const act = readFileSync(join(process.cwd(), 'apps/backend/src/assets/prompts/add-new-user.txt'), 'utf8')

  const systemContent = temp.replace('{{flows}}', act.trim())
  // Step 1: send the conversation and available functions to GPT
  const messages: any[] = [
    {
      'role': 'system',
      'content': systemContent,
    },
    {
      'role': 'user',
      'content': 'example user command'
    },
    {
      'role': 'assistant',
      'content': '[\'navigate\',  \'/page\']\n[ \'focus\', \'based on user command\' ]\n[ \'fill\', \'content based on user content\' ]'
    },
    {
      'role': 'user',
      'content': userCommand
    }
  ];
  const functions = [
    {
      'name': 'isUserExists',
      'description': 'Check if user already exists before adding a new user',
      'parameters': {
        'type': 'object',
        'properties': {
          'email': {
            'type': 'string',
            'description': 'user email to check if exists',
          },
        },
        'required': [ 'email' ],
      },
    }
  ];

  const response = await openai.chat.completions.create({
    model,
    messages: messages,
    functions: functions,
    temperature: 0.5,
    function_call: { name: 'isUserExists' },  // auto is default, but we'll be explicit
  });
  const responseMessage = response.choices[0].message;
  // Step 2: check if GPT wanted to call a function

  console.log('got message from ', responseMessage.role, responseMessage.content)
  if (responseMessage.function_call) {

    console.log('calling function', responseMessage.function_call.name)
    // Step 3: call the function
    // Note: the JSON response may not always be valid; be sure to handle errors
    const availableFunctions = {
      isUserExists: isUserExists,
    };  // only one function in this example, but you can have multiple
    const functionName = responseMessage.function_call.name;
    const functionToCall = availableFunctions[functionName];
    const functionArgs = JSON.parse(responseMessage.function_call.arguments);
    const functionResponse = functionToCall(functionArgs);

    // Step 4: send the info on the function call and function response to GPT
    messages.push(responseMessage);  // extend conversation with assistant's reply
    messages.push({
      'role': 'function',
      'name': functionName,
      'content': functionResponse,
    });

    console.log('extend conversation with function response')
    const secondResponse = await openai.chat.completions.create({
      model,
      messages: messages,
      temperature: 0.5,
      stream: true,  // stream the response back from GPT
    });  // get a new response from GPT where it can see the function response

    let it = secondResponse[Symbol.asyncIterator]()

    console.log('response from GPT', it)
    let buffer = ''
    let m = await it.next()
    console.log('mmmm', m.value.choices[0].delta.content)
    while (!m.done) {
      if (m.done) {
        return m.value
      }
      buffer += m.value.choices[0].delta.content

      const regex = /\[\s*'([^']*)'\s*,\s*'([^']*)'\s*\]/g;
      let match;
      while ((match = regex.exec(buffer)) !== null) {
        const action = match[1];
        const param = match[2];

        buffer = buffer.slice(match.index + match[0].length);
        console.log(action, param)

        res.write(JSON.stringify({ action, param }) + '\n')
      }
      m = await it.next()
    }

    res.end()
  } else {

  }
}

