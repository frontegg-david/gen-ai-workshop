import { ChangeEvent, FC, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import SearchIcon from '@mui/icons-material/SearchRounded';
import { Modal } from '@genai-workshop/ui';
import { useHotkeys } from 'react-hotkeys-hook';
import { Button, IconButton, Stack } from '@mui/joy';
import { useNavigate } from 'react-router-dom';


export const ToolbarQuickPopup: FC = () => {

  const navigate = useNavigate()
  const [ result, setResults ] = useState<string[]>([])
  const inputRef = useRef<HTMLInputElement>(null)
  const [ modalOpen, setModalOpen ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)
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


  const [ searchValue, setSearchValue ] = useState('')
  const onSearchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
  }, [])

  const sendAction = useCallback((e: KeyboardEvent<HTMLInputElement>) => {

    async function fetchAsync() {

      const url = 'http://localhost:4000/ai'
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cmd: searchValue })
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      // This data is a ReadableStream
      const data = response.body;
      if (!data) {
        return;
      }

      const reader = data.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: doneReading } = await reader.read();
        done = doneReading;
        const chunkValue = decoder.decode(value);

        if(done){
          break;
        }

        try {
          const { action, param } = JSON.parse(chunkValue)
          if (action === 'error') {
            setResults([ `Error: ${param}` ])
          } else {
            setResults(res => [ ...res, JSON.stringify({ action, param }) ])
          }
        } catch (e) {
          setResults([ 'Error: Failed to process command' ])
        }
      }
    }

    if (e.keyCode === 13) {
      setResults([])
      setIsLoading(true)
      fetchAsync().then(() => {
        setIsLoading(false)
      })
    }
  }, [ searchValue, setResults ])


  const execute = useCallback(() => {
    function waitFor(selector: string):any {
      console.log("waiting for selector", selector)
      return new Promise((resolve) => {
        if (document.querySelector(selector)) {
          resolve(document.querySelector(selector));
        } else {
          const observer = new MutationObserver(() => {
            if (document.querySelector(selector)) {
              resolve(document.querySelector(selector));
              observer.disconnect();
            }
          });
          observer.observe(document.body, {
            childList: true,
            subtree: true
          });
        }
      })
    }

    const process = async () => {

      for (const r of result) {
        const { action, param } = JSON.parse(r);

        await new Promise(resolve => setTimeout(resolve, 500));
        switch (action) {
          case 'navigate':
            navigate(param);
            break;
          case 'find':
          case 'focus':
            (await waitFor('[data-testid="' + param + '"]'))?.focus();
            break;
          case 'click':
            (await waitFor('[data-testid="' + param + '"]'))?.click();
            break;
          case 'fill':
            const input = document.activeElement as HTMLInputElement;
            input.value = param;
            const event = new Event('input', { bubbles: true, cancelable: true });
            input.dispatchEvent(event);

            break;
        }
      }
    }

    setModalOpen(false)
    console.log("execute", result)
    process()
  }, [ navigate, result ])

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
          onKeyUp={sendAction}
          onChange={onSearchChange}
          value={searchValue}
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
        {isLoading ? "Loading...": "DONE"}
        <br/>
        {result.length > 0 ? <>
          {result}
          {!result[0].startsWith('Error:') && !isLoading && <>
            <Button onClick={execute}>Execute</Button>
          </>}
        </> : <>
          Search
        </>}
      </Box>


    </Modal>
  </>
}
