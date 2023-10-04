import { getE2EReports } from './file-utils';
import { prepareReport } from './prepare-data';
import { generateFlowPrompts, generateSuggestions } from './generate-training-data';


async function run() {

  console.log('collect e2e data')

  let reports = await getE2EReports()

  console.log(`found ${reports.length} reports`)

  console.log('clean up reports')
  const cleanedReports = reports.map(prepareReport)

  console.log('generate auto complete suggestions')
  const withSuggestions = await Promise.all(cleanedReports.map(generateSuggestions))

  console.log('generate prompts')
  const prompts = await Promise.all(withSuggestions.map(generateFlowPrompts))

  // TODO: generate embedding vector for each prompt (demonstration only)
  // TODO: save embedding vector to pinecone (demonstration only)
  // TODO: save generated prompts as prompt template to be used text-to-command service
  // TODO: log the generated prompts to the console for demonstration purposes



  // TODO: remove unused and test codes from the project
  console.log('done')
}

run()
