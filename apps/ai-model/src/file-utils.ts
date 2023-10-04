import { readdirSync, unlinkSync, writeFileSync, existsSync } from 'fs';
import { dirname, basename, join } from 'path';
import * as process from 'process';
import StreamZip from 'node-stream-zip';
import { E2EReport } from './types';


const getE2EFiles = (): [ string[], string ] => {
  const e2eDir = join(process.cwd(), './dist/.playwright/apps/portal-e2e/test-output')
  return [ readdirSync(e2eDir), e2eDir ]
}
export const getE2EReports = async () => {

  const reports: E2EReport[] = []
  const [ files, e2eDir ] = getE2EFiles();
  for (const file of files) {
    // extract trace.zip file
    const traceZip = join(e2eDir, file, 'trace.zip')

    if (!existsSync(traceZip)) continue;
    console.log(traceZip)

    // read zip file content
    const zip = new StreamZip.async({ file: traceZip });
    // Get list of entries (files and directories) in the zip file
    const entries = await zip.entries();

    const report: E2EReport = {
      code: '',
      network: [],
      stacks: [],
      flow: [],
      fileName: '',
      pageName: '',
    }

    // Loop through each entry in the zip file
    for (const entry of Object.values(entries)) {
      // Check if the entry is a file
      if (entry.isDirectory) continue;

      if (entry.name.startsWith('resources/') && !entry.name.startsWith('resources/src@')) continue;
      console.log(`Reading ${entry.name}...`);

      // Read the file content as a string
      switch (entry.name) {
        case '0-trace.stacks':
          report.stacks = (await zip.entryData(entry)).toString('utf-8').split('\n').filter(line => line.length > 0);
          break;
        case '0-trace.network':
          report.network = (await zip.entryData(entry)).toString('utf-8').split('\n').filter(line => line.length > 0);
          break;
        case 'test.trace':
          report.flow = (await zip.entryData(entry)).toString('utf-8').split('\n').filter(line => line.length > 0);
          break;
        default:
          if (entry.name.startsWith('resources/src@')) {
            report.code = (await zip.entryData(entry)).toString('utf-8');
          } else {
            continue;
          }
      }

      // extract file name
      if (report.stacks[0]) {
        const json = JSON.parse(report.stacks[0])
        report.fileName = basename(json.files[0])
        report.pageName = basename(dirname(json.files[0]))
      }
    }
    reports.push(report)

  }

  return reports
}


const outputFilePath = join(process.cwd(), './apps/backend/src/assets/prompts/command/flows.txt')

export const deleteOutputFileIfExists = () => {
  if (existsSync(outputFilePath)) {
    unlinkSync(outputFilePath)
  }
}

export const appendToOutputFile = (content: string) => {

  writeFileSync(outputFilePath, content, { flag: 'a' })
}
