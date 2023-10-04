import { FC, useCallback } from 'react';
import { Grid, Container, Stack, Typography, Input, Button } from '@mui/joy';

import Box from '@mui/joy/Box';
import { useNavigate } from 'react-router-dom';

const CreateNewUserPage: FC = () => {
  const navigate = useNavigate()

  const addUsers = useCallback(() => {
    navigate('/users')
  }, [ navigate ])

  return <Container>
    <Typography level="h3">
      Add bulk of users
    </Typography>
    <Stack direction="column" gap={2} mt={4} mb={2} maxWidth="100%" width={400}>
      <Input slotProps={{ input: { 'data-testid': 'full_name' } }} placeholder={'Full name'}/>
      <Input slotProps={{ input: { 'data-testid': 'email' } }} placeholder={'Email Address'}/>
    </Stack>
    <Button color="primary" data-testid="submit_button" onClick={addUsers}>Submit</Button>

  </Container>
}

export default CreateNewUserPage
