import { E2EReport } from './types';

export const prepareReport = (report: E2EReport): E2EReport => {
  report.network = report.network.map(line => JSON.parse(line))
    .filter(line => line.type !== 'resource-snapshot')
    .map(line => {
      const {
        request: { url, method },
        response: { status: responseStatus },
      } = line
      return JSON.stringify({ url, method, responseStatus })
    });


  report.flow = report.flow.map(line => JSON.parse(line))
    .filter(line => line.type === 'before'
      && line.callId.startsWith('pw:api')
      && line.apiName !== 'browserType.launch'
      && line.apiName !== 'browser.newContext'
      && line.apiName !== 'tracing.start'
      && line.apiName !== 'locator.count'
      && line.apiName !== 'browserContext.newPage')
    .map(line => {
      const { apiName, params } = line

      if (params && params.selector) {
        const regex = /internal:testid=\[data-testid=\"(.*?)\"s\]/g;
        params.selector = params.selector.replace(regex, '[data-testid="$1"]')
        params.selector = params.selector.replace(/\>\>/g, '>');
      }
      return JSON.stringify([ apiName, params ])
    });
  return report;
}
