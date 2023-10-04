import { FC, useMemo } from 'react';
import {  Container, Stack, Typography, Avatar, Chip } from '@mui/joy';
import { Table } from '@genai-workshop/ui'

import Box from '@mui/joy/Box';
import { useUsersData } from './hooks';
import { useNavigate } from 'react-router-dom';
import { UsersPageActions } from './UsersPageActions';

export const UsersPage: FC = () => {

  const users = useUsersData()
  const navigate = useNavigate()


  const columns = useMemo(() => {
    return [
      { name: 'name', label: 'Name', width: '300px' },
      { name: 'phoneNumber', label: 'Phone Number', },
      { name: 'company', label: 'Company', },
      { name: 'role', label: 'Role', },
      { name: 'status', label: 'Status', width: '120px' }
    ]
  }, [])
  return <Container>
    <Stack mb={3} mt={2} direction="row">
      <Box flexGrow={1}>
        <Typography level="h3">
          Users
        </Typography>
      </Box>

      <UsersPageActions/>
    </Stack>
    <Box sx={{
      borderRadius: '12px',
      overflow: 'hidden',
      boxShadow: 'rgba(145, 158, 171, 0.2) 0px 0px 2px 0px, rgba(145, 158, 171, 0.12) 0px 12px 24px -4px',
    }}>
      <Table columns={columns} data={users} data-testid="users_table">
        {row => <tr key={row.id}>
          <td style={{ width: columns[0].width }}>
            <Stack direction={'row'} alignItems="center" gap={2}>
              <Avatar src={row.avatarUrl}/>

              <Stack direction={'column'} alignItems="start">
                <Typography level={'title-sm'}>
                  {row.name}
                </Typography>
                <Typography level={'body-xs'}>
                  {row.email}
                </Typography>
              </Stack>
            </Stack>
          </td>
          <td>{row.phoneNumber}</td>
          <td>{row.company}</td>
          <td>{row.role}</td>
          <td style={{ width: columns[4].width }}>
            <Chip
              color={row.status === 'banned' ? 'danger' : row.status === 'pending' ? 'warning' : 'success'}
              variant="soft" sx={{ borderRadius: 4, fontWeight: 600, fontSize: '12px' }}>
              {row.status[0].toUpperCase() + row.status.substring(1)}
            </Chip>
          </td>
        </tr>}
      </Table>
    </Box>
  </Container>
}
