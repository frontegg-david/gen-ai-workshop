import { FC } from 'react';
import { Grid, Container, Stack, Typography } from '@mui/joy';

import { Welcome } from '@genai-workshop/ui';
import Box from '@mui/joy/Box';

const CreateNewUserPage: FC = () => {


  return <Container>
    <Box>
      <Stack direction="row">
        <Box mb={2}>
          <Typography  level='h3'>
            Create a new user
          </Typography>
        </Box>
        <Box>
        </Box>
      </Stack>
    </Box>
    <Grid container spacing={2} sx={{ flexGrow: 1 }}>
      <Grid xs={8}>
        <Welcome/>
      </Grid>

    </Grid>
  </Container>
}

export default CreateNewUserPage
