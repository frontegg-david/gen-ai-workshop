import Handlebars from 'handlebars';
import ai from '../ai';
import { getPromptTemplate } from '../utils';
import { ChatCompletionMessageParam } from 'openai/src/resources/chat/completions';

const model = 'gpt-3.5-turbo'

/**
 * Generate ordered sections, receives the sections and user's context
 * and returns the ordered sections by most relevant to the user's context
 */
export const generateOrderedSections = async (sections: any[], userContext: any) => {
  const systemPromptTemplate = getPromptTemplate('overview/sections/system');
  const userPromptTemplate = getPromptTemplate('overview/sections/user');

  console.log('preparing openai prompt')

  const systemContent = Handlebars.compile(systemPromptTemplate)({
    sections: JSON.stringify(sections.map((section) => {
      return {
        id: section.id,
        description: section.description,
        items: section.items.map((item) => {
          return {
            id: item.id,
            title: item.title,
          }
        })
      }
    }))
  }).trim()

  const userContent = Handlebars.compile(userPromptTemplate)({
    userContext: JSON.stringify(userContext),
  }).trim()


  /**
   * The assistant message prefix is used to guide the assistant
   * for correct response format
   */
  const assistantMessagePrefix = '["welcome_section",';

  const messages: Array<ChatCompletionMessageParam> = [
    {
      role: 'system',
      content: systemContent,
    },
    {
      role: 'user',
      content: userContent + `\n${assistantMessagePrefix}`
    }
  ];

  console.log('Sending request to openai for generating ordered sections')
  const response = await ai.chat.completions.create({
    model,
    messages: messages,
    temperature: .7,
    max_tokens: 2000,
  });

  try {
    /**
     * Append the assistant message prefix to the response
     * to make sure the response is in the correct json array
     */
    const assistantMessage = assistantMessagePrefix + response.choices[0].message.content;
    console.log('generating ordered sections', assistantMessage)

    const orderedIds = JSON.parse(assistantMessage)
    return orderedIds
      .filter(sectionId => sectionId !== 'welcome_section' && sectionId !== 'recent_notifications')
      .map((sectionId) => sections.find((section) => section.id === sectionId))
  } catch (e) {
    console.error(e)
    return sections
  }
}
