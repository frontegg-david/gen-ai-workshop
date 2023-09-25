import { FC, useEffect, useRef, useState } from 'react';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import SearchIcon from '@mui/icons-material/SearchRounded';
import { Modal } from '@genai-workshop/ui';
import { useHotkeys } from 'react-hotkeys-hook';
import { IconButton, Stack } from '@mui/joy';


export const ToolbarQuickPopup: FC = () => {

  const [ result, setResults ] = useState([])
  const inputRef = useRef<HTMLInputElement>(null)
  const [ modalOpen, setModalOpen ] = useState(false)
  useHotkeys([ 'meta+k' ], (e) => {
    setModalOpen(true)
  }, {
    preventDefault: true,
    enabled: true,
  }, []);


  useEffect(() => {
    if (modalOpen) {
      setTimeout(() => {
        inputRef.current?.select()
        inputRef.current?.focus()
      })
    }
  }, [ modalOpen ])

  return <>
    <Stack direction={'row'} alignItems={'center'} justifyContent={'start'} height={'100%'} paddingX={1}>
      <IconButton color="neutral" onClick={() => setModalOpen(true)} sx={{
        '--Icon-color': '#637381',
        '--joy-palette-neutral-plainActiveColor': '#30383f',
      }}>
        <SearchIcon/>
      </IconButton>
      <Box sx={{
        padding: '0px 4px',
        fontWeight: 500,
        borderRadius: '4px',
        letterSpacing: '1px',
        ml: .5,
        mr: -1,
        p: 0.5,
        backgroundColor: 'rgba(145, 158, 171, 0.16)',
        fontSize: '12px',
        color: 'rgb(99, 115, 129)',
      }}>
        ⌘K
      </Box>

    </Stack>
    <Modal open={modalOpen} setOpen={setModalOpen}>
      <Box display="flex" flexDirection="row" alignItems="center">
        <Input
          slotProps={{ input: { ref: inputRef } }}
          sx={{
            '--variant-borderWidth': 0,
            '--Input-focusedHighlight': 'none',
            boxShadow: 'none',
            width: 'calc(100% - 60px)',
            flex: 1
          }}

          startDecorator={<SearchIcon/>}
        />
        <Box sx={{
          fontWeight: 500,
          borderRadius: '4px',
          letterSpacing: '1px',
          ml: 2,
          p: 0.5,
          backgroundColor: 'rgba(145, 158, 171, 0.16)',
          fontSize: '12px',
          color: 'rgb(99, 115, 129)',
        }}>
          Esc
        </Box>
      </Box>


      <Box height={400}>
        {result.length > 0 ? <>

        </> : <>
          Search
        </>}
      </Box>
    </Modal>
  </>
}
