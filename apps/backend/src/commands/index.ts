import openai from '../ai'
import { createCommandPrompt } from './command-prompt';
import { callFunction, getFunctionsDeclarations } from './functions';
import { Response } from 'express';
import type { Chat } from 'openai/resources';

type ChatCompletionChunk = Chat.ChatCompletionChunk;

const model = 'gpt-3.5-turbo-16k-0613'

export const txtToCmd = async (serverResponse: Response, userCommand: string) => {

  console.log('creating command prompt for', userCommand)
  const messages = createCommandPrompt(userCommand);

  console.log('preparing prompt functions')
  const functions = getFunctionsDeclarations()

  console.log('sending request to openai')
  const response = await openai.chat.completions.create({
    model,
    messages,
    functions,
    temperature: 0.75,
    // function_call: { name: 'isUserExists' },  // auto is default, but we'll be explicit
  });

  const responseMessage = response.choices[0].message;

  console.log('response from openai', responseMessage.role, responseMessage.content)
  // check if the response is a function call
  if (responseMessage.function_call) {
    const { name, arguments: args } = responseMessage.function_call
    const funResult = callFunction(name, args)
    console.log(`Function ${name} result:`, funResult);


    messages.push(responseMessage);  // extend conversation with assistant's reply
    messages.push({
      role: 'function',
      name: name,
      content: funResult,
    });

    console.log('extend conversation with function response')
    const secondResponse = await openai.chat.completions.create({
      model,
      messages: messages,
      temperature: 0.5,
      stream: true,  // stream the response back from GPT
    });

    console.log('Got a new response from AI after function call: ')


    const iterator = secondResponse[Symbol.asyncIterator]()
    await streamBufferToResponse(serverResponse, iterator)

    serverResponse.end()
  } else {
    console.log('Function not called, returning openai response to client')
    return responseMessage.content
  }
}


/**
 * Stream response from GPT to the client, load response chunks from the iterator
 * Combine chunks to a until we have valid JSON actions
 * and then write them to the response
 */
const streamBufferToResponse = async (serverResponse: Response, iterator: AsyncIterator<ChatCompletionChunk>) => {
  console.log('Loop over response iterator')
  let buffer = ''
  let m = await iterator.next()

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

      const actionStr = JSON.stringify({ action, param }).trim() + '\n'

      console.log('- ', actionStr)
      serverResponse.write(actionStr)
    }
    m = await iterator.next()
  }

  console.log('Finish streaming response')
}
