import { FC, ReactNode, useMemo } from 'react';
import { RouteObject, useNavigate } from 'react-router-dom';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';

export type NavigationRouteObject = RouteObject & {
  id: string;
  path: string;
  icon: ReactNode;
  label: ReactNode;
  selected: boolean;
}


export const NavigationMainItem: FC<NavigationRouteObject> = (({ id, path, icon, label, selected }) => {
  const navigate = useNavigate()

  return useMemo(() => (<ListItemButton key={id} selected={selected} onClick={() => navigate(path)}>
      <ListItemDecorator>
        {icon}
      </ListItemDecorator>
      {label}
    </ListItemButton>
  ), [ navigate, id, path, icon, label, selected ])
})
