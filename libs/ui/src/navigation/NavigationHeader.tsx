import { FC } from 'react';
import Box from '@mui/joy/Box';
import { Logo } from '@genai-workshop/assets';

export const NavigationHeader: FC = () => {
  return <Box marginLeft={2}>
    <img alt="logo" src={Logo} width={36}/>
  </Box>
}
