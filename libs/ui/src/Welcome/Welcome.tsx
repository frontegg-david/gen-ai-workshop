import { FC } from 'react';
import Box from '@mui/joy/Box';
import { Card } from '@mui/joy';
import { Character, WelcomeArt } from '@genai-workshop/assets';


export const Welcome: FC = () => {

  return <Card sx={{
    overflow: 'hidden',
    background: 'linear-gradient(135deg, rgba(91, 228, 155, 0.2), rgba(0, 167, 111, 0.2)) rgb(255, 255, 255)',
    boxShadow: 'none'
  }}>
    <Box sx={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      height: 300,
      position: 'relative',
    }}>

      <img src={WelcomeArt} alt='welcome-art' height={225} style={{ position: 'absolute', right: 10 }}/>
      <img src={Character} alt='welcome-character' height={175} style={{ position: 'absolute', right: 30, top: 60 }}/>
    </Box>
  </Card>
}
