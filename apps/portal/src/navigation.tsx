import { FC, useMemo } from 'react';
import NavigationQuickActions from './ai/NavigationQuickActions';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import AccountsIcon from '@mui/icons-material/AccountBalanceRounded';
import UsersIcon from '@mui/icons-material/SwitchAccountRounded';
import GroupIcon from '@mui/icons-material/Groups3Rounded';
import { NavigationContainer, NavigationMainItem } from '@genai-workshop/ui';
import Box from '@mui/joy/Box';
import logo from './assets/logo.png';
import { useMatches } from 'react-router-dom';
import { navigationMainRoutes } from './router/navigation-routes';


export const NavigationHeader: FC = () => {
  return <Box marginLeft={2}><img alt="logo" src={logo} width={36}/></Box>
}


export const NavigationMainItems: FC = () => {
  const matched = useMatches();
  const selectedId = matched.length > 1 ? matched[1].id : undefined;
  return useMemo(() => navigationMainRoutes.map((route) =>
    <NavigationMainItem {...route} selected={selectedId === route.id}/>
  ), [ selectedId ]);
}


export const Navigation: FC = () => {

  return <NavigationContainer>
    <NavigationHeader/>
    <NavigationQuickActions/>
    <NavigationMainItems/>

    <ListSubheader>Management</ListSubheader>

    <ListItemButton>
      <ListItemDecorator>
        <AccountsIcon/>
      </ListItemDecorator>
      Account
    </ListItemButton>
    <ListItemButton>
      <ListItemDecorator>

        <UsersIcon/>
      </ListItemDecorator>
      Users
    </ListItemButton>
    <ListItemButton>
      <ListItemDecorator>
        <GroupIcon/>
      </ListItemDecorator>
      Groups
    </ListItemButton>

    <ListItemButton>
      <ListItemDecorator>
        <GroupIcon/>
      </ListItemDecorator>
      Authentication
    </ListItemButton>
    <ListItemButton>
      <ListItemDecorator>
        <GroupIcon/>
      </ListItemDecorator>
      API Tokens
    </ListItemButton>
  </NavigationContainer>
}

export default Navigation
