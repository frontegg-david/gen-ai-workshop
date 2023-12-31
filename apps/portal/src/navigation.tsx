import { FC, useMemo } from 'react';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import AccountsIcon from '@mui/icons-material/AccountBalanceRounded';
import UsersIcon from '@mui/icons-material/SwitchAccountRounded';
import GroupIcon from '@mui/icons-material/Groups3Rounded';
import { NavigationContainer, NavigationMainItem, NavigationQuickActions } from '@genai-workshop/ui';
import Box from '@mui/joy/Box';
import logo from './assets/logo.png';
import { useMatches } from 'react-router-dom';
import { navigationMainRoutes, navigationManagementRoutes } from './router/navigation-routes';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import TokenRoundedIcon from '@mui/icons-material/TokenRounded';

export const NavigationHeader: FC = () => {
  return <Box marginLeft={2}><img alt="logo" src={logo} width={36}/></Box>
}


export const NavigationMainItems: FC = () => {
  const matched = useMatches();
  const selectedId = matched.length > 1 ? matched[1].id : undefined;
  return useMemo(() => navigationMainRoutes.map((route) =>
    <NavigationMainItem key={route.id} data-testid={`nav_${route.id}`} {...route} selected={selectedId === route.id}/>
  ), [ selectedId ]);
}
export const NavigationManagementItems: FC = () => {
  const matched = useMatches();
  const selectedId = matched.length > 1 ? matched[1].id : undefined;
  return useMemo(() => navigationManagementRoutes.map((route) =>
    <NavigationMainItem key={route.id} data-testid={`nav_${route.id}`} {...route} selected={selectedId === route.id}/>
  ), [ selectedId ]);
}


export const Navigation: FC = () => {

  return <NavigationContainer>
    <NavigationHeader/>
    <NavigationQuickActions/>
    <NavigationMainItems/>

    <ListSubheader>Management</ListSubheader>

    <NavigationManagementItems/>

    <ListItemButton disabled>
      <ListItemDecorator>
        <AccountsIcon/>
      </ListItemDecorator>
      Account
    </ListItemButton>
    <ListItemButton disabled>
      <ListItemDecorator>
        <GroupIcon/>
      </ListItemDecorator>
      Groups
    </ListItemButton>

    <ListItemButton disabled>
      <ListItemDecorator>
        <VpnKeyRoundedIcon/>
      </ListItemDecorator>
      Authentication
    </ListItemButton>
    <ListItemButton disabled>
      <ListItemDecorator>
        <TokenRoundedIcon/>
      </ListItemDecorator>
      API Tokens
    </ListItemButton>
  </NavigationContainer>
}

export default Navigation
