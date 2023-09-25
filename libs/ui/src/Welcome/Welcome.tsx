import { FC } from 'react';
import Box from '@mui/joy/Box';
import { Card, Stack, Typography } from '@mui/joy';
import { Character, WelcomeArt } from '@genai-workshop/assets';


export const Welcome: FC = () => {

  return <Card sx={{
    overflow: 'hidden',
    background: 'linear-gradient(135deg, rgba(91, 228, 155, 0.2), rgba(0, 167, 111, 0.2)) rgb(255, 255, 255)',
    boxShadow: 'none',
    height: 320,
  }}>
    <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} height={'100%'}>
      <Stack direction={'column'} alignItems={'start'} justifyContent={'center'} height={'100%'}>
        <Typography level="h3">
          Welcome back, 👋<br/> John Doe
        </Typography>
        <Typography level="title-md" mt={3}>
          Here's what's happening with your projects today
        </Typography>
        <Typography level="body-sm" mt={1}>
          You have 2 new notifications, 1 new user and 1 new download
        </Typography>
      </Stack>
      <Box sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        position: 'relative',
        height: '100%',
        width: '320px',
      }}>
        <img src={WelcomeArt} alt="welcome-art" height={225} style={{ position: 'absolute', right: 10 }}/>
        <img src={Character} alt="welcome-character" height={175} style={{ position: 'absolute', right: 30, top: 60 }}/>
      </Box>
    </Stack>
  </Card>
}
