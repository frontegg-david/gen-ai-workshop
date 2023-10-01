import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import theme from './theme';
import { CssBaseline, CssVarsProvider } from '@mui/joy';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import { QueryClient, QueryClientProvider } from 'react-query';
import { dummyData, DummyDataProvider } from './dummy';

const queryClient = new QueryClient()


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <StrictMode>
    <DummyDataProvider value={dummyData.admin}>
      <QueryClientProvider client={queryClient}>
        <CssVarsProvider theme={theme}>
          <CssBaseline/>
          <RouterProvider router={router} future={{ v7_startTransition: true }}/>
        </CssVarsProvider>
      </QueryClientProvider>
    </DummyDataProvider>
  </StrictMode>
);
