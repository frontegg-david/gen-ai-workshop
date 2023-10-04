import { FC, useCallback, useRef, useState } from 'react';
import Box from '@mui/joy/Box';
import { Button, ButtonGroup, IconButton, Menu, MenuItem } from '@mui/joy';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDownRounded';
import { useNavigate } from 'react-router-dom';


export const UsersPageActions: FC = () => {

  const navigate = useNavigate();

  const addNewUser = useCallback(() => navigate('/users/new'), [ navigate ])
  const addBulkUsers = useCallback(() => navigate('/users/new-bulk'), [ navigate ])

  return <Box>

    <ButtonGroup
      color="primary"
      variant="solid"
      aria-label="split button"
    >
      <Button data-testid="add_user_button" color='neutral' onClick={addNewUser}>
        Add User
      </Button>
      <Button data-testid="add_bulk_users_button" color='neutral' onClick={addBulkUsers}>
        Add bulk of users
      </Button>
    </ButtonGroup>

  </Box>
}
