export type E2EReport = {
  fileName: string;
  pageName: string;
  code: string;
  stacks: string[];
  network: string[];
  flow: string[];
}


export type WithSuggestions<T> = T & {
  suggestions: string[];
}


export type FlowPrompt = E2EReport & {
  prompt: string;
  codeDescription?: string;
}

