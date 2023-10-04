import * as ReactDOM from 'react-dom/client';

import theme from './theme';
import { CssBaseline, CssVarsProvider } from '@mui/joy';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { userExamples, DummyDataProvider } from './dummy';

const queryClient = new QueryClient()


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <DummyDataProvider value={userExamples.financials}>
    <QueryClientProvider client={queryClient}>
      <CssVarsProvider theme={theme}>
        <CssBaseline/>
        <RouterProvider router={router} future={{ v7_startTransition: true }}/>
      </CssVarsProvider>
    </QueryClientProvider>
  </DummyDataProvider>
);
