import { FC, useEffect, useMemo, useState } from 'react';
import ListSubheader from '@mui/joy/ListSubheader';
import AiIcon from '@mui/icons-material/AutoFixHighRounded';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import Box from '@mui/joy/Box';
import { useHotkeys } from 'react-hotkeys-hook';
import { CircularProgress } from '@mui/joy';


const useQuickActions = () => {
  const [ loading, setLoading ] = useState(true);
  const [ quickActions, setQuickActions ] = useState<any[]>([]);


  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
      setQuickActions([ {
        label: 'Account settings',
        click: () => {
          console.log('dashboard')
        },
      }, {
        label: 'Add New User',
        click: () => {
          console.log('app')
        },
      }, {
        label: 'Display notifications',
        click: () => {
          console.log('app')
        },
      } ])
    }, 2000)
  }, [])

  return { loading, quickActions }
}

export const NavigationQuickActions: FC = () => {


  const { loading, quickActions } = useQuickActions();

  const hotKeys = useMemo(() => quickActions.map((action, index) => `meta+${index + 1}`), [ quickActions ]);

  useHotkeys(hotKeys, (e) => {
    const key = Number(e.key) - 1;
    quickActions[Number(e.key) - 1].click()

    document.getElementById(`hot-key-${key}`)?.classList.add('Mui-selected');
    setTimeout(() => {
      document.getElementById(`hot-key-${key}`)?.classList.remove('Mui-selected');
    }, 300)

  }, {
    preventDefault: true,
    enabled: true,
  }, [ hotKeys ]);


  const listButtons = useMemo(() => {
    return quickActions.map((action, index) => <ListItemButton id={`hot-key-${index}`} key={index} sx={{
      display: 'flex',
      justifyContent: 'space-between',
      transition: 'background-color 200ms',
    }}>
      {action.label}
      <ListItemDecorator sx={{
        padding: '0px 4px',
        fontWeight: 500,
        borderRadius: '4px',
        letterSpacing: '1px',
        ml: 1,
        mr: -1,
        backgroundColor: 'rgba(145, 158, 171, 0.16)',
        fontSize: '12px',
        color: 'rgb(99, 115, 129)',
      }}>
        ⌘{index + 1}
      </ListItemDecorator>
    </ListItemButton>);
  }, [ quickActions ])

  return <Box sx={{
    background: 'rgba(145, 158, 171, 0.08)',
    p: 1,
    pt: 0,
    mt: 1,
    mb:1,

    height: loading ? '80px' : '149px',
    borderRadius: '8px',
    '--ListItem-minHeight': '24px',
    '--Icon-fontSize': '14px',
    '--ListItemDecorator-size': '24px',
    '--ListItem-paddingY': '4px',
    '--ListItem-paddingLeft': '6px',
    transition: 'all 300ms',
  }}>
    <ListSubheader sx={{ display: 'flex', justifyContent: 'space-between', m: 1, ml: 0, mr: 0 }}>
      Quick Actions
      <AiIcon sx={{ fontSize: 14, color: 'neutral.500' }}/>
    </ListSubheader>

    {loading ? <Box textAlign={'center'} mt={1}>
      <CircularProgress color={'neutral'} sx={{ opacity: 0.2 }} size={'sm'}/>
    </Box> : listButtons}

  </Box>
}
