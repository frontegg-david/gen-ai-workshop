import { FC, useCallback, useRef, useState } from 'react';
import Box from '@mui/joy/Box';
import { Button, ButtonGroup, IconButton, Menu, MenuItem } from '@mui/joy';
import PlusIcon from '@mui/icons-material/AddRounded';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDownRounded';
import { useNavigate } from 'react-router-dom';


export const UsersPageActions: FC = () => {

  const navigate = useNavigate();
  const [ open, setOpen ] = useState(false);
  const actionRef = useRef<() => void | null>(null);
  const anchorRef = useRef<HTMLDivElement>(null);

  const addNewUser = useCallback(() => navigate('/users/new'), [ navigate ])
  const addBulkUsers = useCallback(() => navigate('/users/new-bulk'), [ navigate ])

  return <Box>

    <ButtonGroup
      color="primary"
      ref={anchorRef}
      variant="solid"
      aria-label="split button"
    >
      <Button data-testid="add_user_button" onClick={addNewUser}>
        Add User
      </Button>
      <IconButton
        data-testid='add_user_dropdown_button'
        aria-controls={open ? 'split-button-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-label="select merge strategy"
        aria-haspopup="menu"
        onMouseDown={() => {
          // @ts-ignore
          actionRef.current = () => setOpen(!open);
        }}
        onKeyDown={() => {
          // @ts-ignore
          actionRef.current = () => setOpen(!open);
        }}
        onClick={() => {
          actionRef.current?.();
        }}
      >
        <ArrowDropDownIcon/>
      </IconButton>

    </ButtonGroup>

    <Menu open={open} onClose={() => setOpen(false)} anchorEl={anchorRef.current}>
      <MenuItem data-testid='add_bulk_users_button' onClick={addBulkUsers}>
        Add bulk of users
      </MenuItem>
    </Menu>
  </Box>
}
