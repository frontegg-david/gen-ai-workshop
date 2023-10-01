import {  overviewSections } from './supported-blocks';
import fs from 'fs';
export async function getDynamicOverviewBlocks(userContent: any) {

  const data =overviewSections()
  fs.writeFileSync('overviewSections.json', JSON.stringify(data))

  return data.reduce((acc, section) => [...acc, ...section.items], [])
}
