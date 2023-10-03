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

  console.log('generate embedding vector')
}

run()
