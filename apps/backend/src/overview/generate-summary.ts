import Handlebars from 'handlebars';
import ai from '../ai';
import { getPromptTemplate } from '../utils';

const model = 'gpt-3.5-turbo'

/**
 * Generate ordered sections, receives the sections and user's context
 * and returns short summary of the most relevant sections to the user's context
 */
export const generateOverviewSummary = async (sections: any[], userContext: any) => {
  const systemPromptTemplate = getPromptTemplate('overview/summary/system');
  const userPromptTemplate = getPromptTemplate('overview/summary/user');

  const systemContent = Handlebars.compile(systemPromptTemplate)({
    sections: JSON.stringify(sections)
  })

  const userContent = Handlebars.compile(userPromptTemplate)({
    userContext: JSON.stringify(userContext),
    sectionIds: sections.map((section) => section.id)
  })


  const messages: any[] = [
    {
      'role': 'system',
      'content': systemContent,
    },
    {
      'role': 'user',
      'content': userContent
    }
  ];

  console.log('Sending request to openai for generating summary')
  const response = await ai.chat.completions.create({
    model,
    messages: messages,
    temperature: 1,
    max_tokens: 1000,
  });

  console.log('response from openai', response)
  try {
    const summary = response.choices[0].message.content
    console.log('generating summary', summary)
    return summary
  } catch (e) {
    console.error(e)
    return userContext.recentNotifications.join('\n')
  }
}
