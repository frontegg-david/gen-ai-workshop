import { readFileSync } from 'fs';
import { join } from 'path';

export const getPromptTemplate = (templateName: string) => {
  return readFileSync(join(process.cwd(), `apps/backend/src/assets/prompts/${templateName}.txt`), 'utf8')
}
