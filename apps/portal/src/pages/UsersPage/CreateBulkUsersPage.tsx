import { FC, useCallback } from 'react';
import { Grid, Container, Stack, Typography, Input, Button } from '@mui/joy';

import Box from '@mui/joy/Box';
import { useNavigate } from 'react-router-dom';

const CreateBulkUsersPage: FC = () => {
  const navigate = useNavigate()

  const addUsers = useCallback(() => {
    navigate('/users')
  }, [ navigate ])

  return <Container>
    <Box>
      <Stack direction="row">
        <Box mb={2}>
          <Typography level="h3">
            Create a new user
          </Typography>
        </Box>
        <Box>
        </Box>
      </Stack>
    </Box>
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={8}>
        <Input slotProps={{ input: { 'data-testid': 'full_name' } }} placeholder={'Full name'}/>
        <Input slotProps={{ input: { 'data-testid': 'email' } }} placeholder={'Email Address'}/>
        <Input slotProps={{ input: { 'data-testid': 'emails' } }} placeholder={'Emails'}/>
      </Grid>


      <Button data-testid="submit_button" onClick={addUsers}>Submit</Button>
    </Grid>
  </Container>
}

export default CreateBulkUsersPage
