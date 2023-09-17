import { FC, PropsWithChildren } from 'react';
import Box from '@mui/joy/Box';
import List from '@mui/joy/List';


export const NavigationContainer: FC<PropsWithChildren> = ({ children }) => {
  return <Box width="280px" height="100vh" overflow="auto">
    <List
      size={'sm'}
      sx={{
        width: '100%',
        '--ListItem-minHeight': '44px',
        '--List-padding': '16px',
        '--List-radius': '0px',
        '--List-gap': '4px',
        '--ListItem-paddingY': '4px',
        '--ListItem-paddingX': '12px',
        '--ListItem-radius': '8px',
        '--ListItem-fontWeight': '500',
        '--ListItemDecorator-size': '40px',
        '--joy-palette-neutral-plainActiveBg': 'rgba(145, 158, 171, 0.18)',
        '--joy-palette-neutral-plainActiveColor': 'rgb(99, 115, 129)',
        '--joy-palette-neutral-plainHoverBg': 'rgba(145, 158, 171, 0.08)',
        '--joy-palette-neutral-plainHoverColor': 'rgb(99, 115, 129)',
        '--joy-palette-neutral-plainColor': 'rgb(99, 115, 129)',
        '--Icon-fontSize': '24px',
        '--Icon-color': 'rgb(99, 115, 129)',
        height: '100vh',
        borderRight: '1px dashed rgba(145, 158, 171, 0.2)'
      }}
    >
      {children}
    </List>
  </Box>
}
