import { overviewSections } from './supported-blocks';
import { generateOrderedSections } from './generate-sections';
import { generateOverviewSummary } from './generate-summary';


export async function getDynamicOverviewBlocks(userContent: any) {

  // const data = overviewSections()
  // return {
  //   summary: userContent.recentNotifications.join(', '),
  //   sections: data.reduce((acc, section) => [ ...acc, ...section.items ], [])
  // }


  /**
   * 1. generate ordered sections (AI)
   * 2. generate summary (AI)
   * 3. return sections and summary
   *
   * uncomment the following code to see the full flow
   */
  console.log('going to pull overview blocks from db')
  const data = overviewSections()

  console.log('going to generate overview blocks with AI')
  const orderedSections = await generateOrderedSections(data, userContent)

  const mustRelevantSections = orderedSections.slice(0, 2)
  const summary = await generateOverviewSummary(mustRelevantSections, userContent)
  // const summary = userContent.recentNotifications.join(', ');

  // add missing sections to the end of the list
  data.forEach((section) => {
    if (!orderedSections.find(s => s.id === section.id)) {
      orderedSections.push(section)
    }
  })

  return {
    sections: orderedSections.reduce((acc, section) => [ ...acc, ...section.items ], []),
    summary
  }
}
