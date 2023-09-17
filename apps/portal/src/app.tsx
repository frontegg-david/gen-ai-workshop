import Box from '@mui/joy/Box';

import Navigation from './navigation';
import { Outlet } from 'react-router-dom';

export function App() {
  return (
    <Box display="flex">
      <Navigation/>
      <Box flex={1} p={4} pt={2} height="100vh" overflow="auto">
        <Outlet/>
      </Box>
    </Box>
  );
}

export default App;
