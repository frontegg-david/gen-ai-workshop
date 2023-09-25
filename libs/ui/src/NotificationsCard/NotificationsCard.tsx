import { FC } from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import { Stack, Typography } from '@mui/joy';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import NewUserIcon from '@mui/icons-material/PersonAddAltRounded';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import SecurityIcon from '@mui/icons-material/GppGoodRounded';
export const NotificationsCard: FC = () => {


  return <Card sx={{ flexDirection: 'row', maxHeight: 320, p: 4 }}>
    <Box flexGrow={1} pt={4} position="relative">
      <Typography level="title-lg" position="absolute" top={0} sx={{ backgroundColor: 'white' }}>
        Notifications
      </Typography>
      <List>
        <ListItem>
          <ListItemDecorator>
            <NewUserIcon/>
          </ListItemDecorator>
          <Stack direction="row" alignItems="center" justifyContent="start">

            <Typography level="body-sm">
              2 new users have signed up today
            </Typography>
          </Stack>

        </ListItem>
        <ListItem sx={{'--Icon-color':'darkorange'}}>
          <ListItemDecorator>
            <InfoRoundedIcon/>
          </ListItemDecorator>
          <Stack direction="row" alignItems="center" justifyContent="start">
            <Typography level="body-sm">
              User blocked due to suspicious activity
            </Typography>
          </Stack>

        </ListItem>
        <ListItem sx={{'--Icon-color':'darkred'}}>
          <ListItemDecorator >
            <SecurityIcon/>
          </ListItemDecorator>
          <Stack direction="row" alignItems="center" justifyContent="start">

            <Typography level="body-sm">
              IP Restriction has been enabled
            </Typography>
          </Stack>

        </ListItem>
      </List>

    </Box>
  </Card>
}
