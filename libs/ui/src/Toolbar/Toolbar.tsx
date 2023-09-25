import { FC } from 'react';
import Box from '@mui/joy/Box';
import { ToolbarQuickPopup } from '../ai';

export const Toolbar: FC = () => {

  return <>
    <Box component={'header'} sx={{
      position: 'fixed',
      top: 0,
      width: 'calc(100% - 280px)',
      zIndex: 1101,
      height: '64px',
      backdropFilter: 'blur(6px)',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      transition: 'height 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
    }}>
      <ToolbarQuickPopup/>
    </Box>
  </>
}
