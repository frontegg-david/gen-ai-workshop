import { FC } from 'react';
import Box from '@mui/joy/Box';
import Card from '@mui/joy/Card';
import { Stack, Typography } from '@mui/joy';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import CircleIcon from '@mui/icons-material/Circle';

export const NotificationsCard: FC<{ notifications: string[] }> = ({ notifications }) => {


  return <Card sx={{ flexDirection: 'row', maxHeight: 320, p: 4 }}>
    <Box flexGrow={1} pt={4} position="relative">
      <Typography level="title-lg" position="absolute" top={0} sx={{ backgroundColor: 'white' }}>
        Recent Notifications
      </Typography>
      <List sx={{
        overflow: 'auto',
        height: '250px',
        marginRight: '-32px',
      }}>

        {notifications.map((notification, index) => <ListItem key={index}>
            <ListItemDecorator sx={{ minWidth: 20 }}>
              <CircleIcon sx={{ fontSize: '10px', color: 'grey' }}/>
            </ListItemDecorator>
            <Stack direction="row" alignItems="center" justifyContent="start">
              <Typography level="body-sm">
                {notification}
              </Typography>
            </Stack>
          </ListItem>
        )}
        {/*  */}
        {/*  <ListItem>*/}
        {/*    <ListItemDecorator>*/}
        {/*      <NewUserIcon/>*/}
        {/*    </ListItemDecorator>*/}
        {/*    <Stack direction="row" alignItems="center" justifyContent="start">*/}

        {/*      <Typography level="body-sm">*/}
        {/*        2 new users have signed up today*/}
        {/*      </Typography>*/}
        {/*    </Stack>*/}

        {/*  </ListItem>*/}
        {/*  <ListItem sx={{ '--Icon-color': 'darkorange' }}>*/}
        {/*    <ListItemDecorator>*/}
        {/*      <InfoRoundedIcon/>*/}
        {/*    </ListItemDecorator>*/}
        {/*    <Stack direction="row" alignItems="center" justifyContent="start">*/}
        {/*      <Typography level="body-sm">*/}
        {/*        User blocked due to suspicious activity*/}
        {/*      </Typography>*/}
        {/*    </Stack>*/}

        {/*  </ListItem>*/}
        {/*  <ListItem sx={{ '--Icon-color': 'darkred' }}>*/}
        {/*    <ListItemDecorator>*/}
        {/*      <SecurityIcon/>*/}
        {/*    </ListItemDecorator>*/}
        {/*    <Stack direction="row" alignItems="center" justifyContent="start">*/}

        {/*      <Typography level="body-sm">*/}
        {/*        IP Restriction has been enabled*/}
        {/*      </Typography>*/}
        {/*    </Stack>*/}

        {/*  </ListItem>*/}
      </List>

    </Box>
  </Card>
}
