import { ChatCompletionCreateParams } from 'openai/resources/chat';

/**
 * Check if user exists
 * Called by AI assistant to check if user exists before adding a new user
 */
function isUserExists({ email }) {
  console.log('isUserExists', email);
  return JSON.stringify(email === 'david@frontegg.com');
}

/**
 * Get available functions declarations
 * Called by AI assistant if prompt contains function call
 */
export const getFunctionsDeclarations = (): Array<ChatCompletionCreateParams.Function> => {

  return [ {
    name: 'isUserExists',
    description: 'Check if user already exists before adding a new user',
    parameters: {
      type: 'object',
      properties: {
        email: {
          type: 'string',
          description: 'user email to check if exists',
        },
      },
      required: [ 'email' ],
    },
  } ]
}


export const getFunction = (name: string): (args: object) => string => {
  const functions = {
    isUserExists: isUserExists,
  }
  return functions[name]
}


/**
 * Call requested function with arguments based on the response from GPT
 */
export const callFunction = (functionName: string, args: string): string => {
  console.log('calling function', functionName)
  const functionToCall = getFunction(functionName);
  const functionArgs = JSON.parse(args);

  return functionToCall(functionArgs);
}
