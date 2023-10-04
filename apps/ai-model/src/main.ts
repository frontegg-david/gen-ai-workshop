import { appendToOutputFile, deleteOutputFileIfExists, getE2EReports } from './file-utils';
import { prepareReport } from './prepare-data';
import { generateCodeDescription, generateFlowPrompts, generateSuggestions } from './generate-training-data';


async function run() {

  console.log('collect e2e data')

  let reports = await getE2EReports()

  console.log(`found ${reports.length} reports`)

  console.log('clean up reports')
  const cleanedReports = reports.map(prepareReport)

  console.log('generate auto complete suggestions')
  const withSuggestions = await Promise.all(cleanedReports.map(generateSuggestions))

  console.log('generate prompts')
  const withPrompts = await Promise.all(withSuggestions.map(generateFlowPrompts))

  console.log('generate code description')
  const prompts = await Promise.all(withPrompts.map(generateCodeDescription))


  deleteOutputFileIfExists()
  prompts.forEach((prompt, index) => {
    console.log('writing prompt template for ', prompt.fileName)

    let promptTemplate = index > 0 ? `---\n\n` : '';
    promptTemplate += `${prompt.prompt}\n\n`;
    promptTemplate += `## Flow\n${prompt.codeDescription}\n\n`
    promptTemplate += `## Code\n${prompt.code}\n\n`

    appendToOutputFile(promptTemplate)
  })

  // TODO: save generated prompts as prompt template to be used text-to-command service
  // TODO: log the generated prompts to the console for demonstration purposes

  console.log('done')
}

run()


