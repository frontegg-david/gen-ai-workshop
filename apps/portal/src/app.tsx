import Box from '@mui/joy/Box';
import Navigation from './navigation';
import { Outlet } from 'react-router-dom';
import { Toolbar } from '@genai-workshop/ui';

export function App() {
  return (
    <Box display="flex">
      <Navigation/>
      <Box flex={1} p={4} pt={8} height="100vh" overflow="auto" position="relative">
        <Toolbar/>
        <Outlet/>
      </Box>
    </Box>
  );
}

export default App;
