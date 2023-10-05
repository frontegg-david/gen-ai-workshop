import { E2EReport, FlowPrompt, WithSuggestions } from './types';
import OpenAI from 'openai';
import Handlebars from 'handlebars';
import { generateReportExample } from './prompt-example';

const openai = new OpenAI({
  apiKey: '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',
});

const model = 'gpt-3.5-turbo-16k';
const temperature = 1

export const generateSuggestions = async (report: E2EReport): Promise<WithSuggestions<E2EReport>> => {

  const input = 'file name: {{fileName}}\npage name: {{pageName}}\n\ncode: \n```\n{{code}}\n```'
  const content = Handlebars.compile(input)({
    fileName: report.fileName,
    pageName: report.pageName,
    code: report.code
  })

  const response = await openai.chat.completions.create({
    model,
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
    temperature,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });

  try {
    const suggestions = JSON.parse(response.choices[0].message.content)
    return { ...report, suggestions }
  } catch (e) {
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
    model,
    messages: [
      {
        'role': 'system',
        'content': `Act as e2e to javascript generator that
receive input of e2e test case and generate object represent the flow to be executed when user ask for a specific command.
`
      },
      {
        'role': 'user',
        'content': generateReportExample.user
      },
      {
        'role': 'assistant',
        'content': generateReportExample.assistant
      },
      {
        'role': 'user',
        content
      }
    ],
    temperature,
    max_tokens: 1000,
  });

  const prompt = response.choices[0].message.content
  return { prompt, ...report }
}


export const generateCodeDescription = async (report: FlowPrompt): Promise<FlowPrompt> => {
  const input = 'file name: {{fileName}}\npage name: {{pageName}}\n\ncode: \n```\n{{code}}\n```'

  const content = Handlebars.compile(input)({
    fileName: report.fileName,
    pageName: report.pageName,
    code: report.code
  })


  const response = await openai.chat.completions.create({
    model,
    messages: [
      {
        'role': 'system',
        'content': `Act as pseudo code writer that convert code to action flow based on if conditions.
The pseudo must be with machine tone that can be effective recognized by ai`
      },
      {
        'role': 'user',
        content
      }
    ],
    temperature,
    max_tokens: 1000,
  });

  const codeDescription = response.choices[0].message.content
  return { ...report, codeDescription }
}



