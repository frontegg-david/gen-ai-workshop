import { ChangeEvent, FC, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import Box from '@mui/joy/Box';
import Input from '@mui/joy/Input';
import SearchIcon from '@mui/icons-material/SearchRounded';
import { Modal } from '@genai-workshop/ui';
import { useHotkeys } from 'react-hotkeys-hook';
import { Button, CircularProgress, IconButton, Stack, Typography } from '@mui/joy';
import { useNavigate } from 'react-router-dom';
import { simulatedClick } from './simulate';


type ResultRow = { action: string, param: string }

const renderResults = (execute: () => void, results: ResultRow[]) => {

  let hasError = results.find(r => r.action === 'error')
  let hasMessage = results.find(r => r.action === 'message');

  if (hasError) {
    return <Box textAlign="left" p={4} width="100%">
      <Typography level="body-md" whiteSpace="pre-wrap" color={'danger'}>{hasError.param}</Typography>
    </Box>
  }

  if (hasMessage) {
    return <Box textAlign="left" p={4} width="100%">
      <Typography level="body-md" whiteSpace="pre-wrap" color={'warning'}>{hasMessage.param}</Typography>
    </Box>
  }

  const elements = results.map((result, index) => <Box key={index} sx={{
    padding: '6px 16px',
    border: '1px solid rgb(0,0,0,.1)',
    borderRadius: '8px',
    marginBottom: '6px',
  }}>
    <Stack direction="row">
      <Typography level="title-sm" flexGrow={1} color="neutral">{result.action}</Typography>
      <Typography level="body-sm">{result.param}</Typography>
    </Stack>
  </Box>);

  return <>
    {elements}
    <Box sx={{
      position: 'absolute',
      left: 0,
      bottom: 0,
      background: 'linear-gradient(0deg, white, rgb(255,255,255,.7), transparent )',
      textAlign: 'right'
    }} p={4} pr={5} width="100%">
      <Button color="primary" onClick={execute}>
        Execute
      </Button>
    </Box>
  </>
}


export const ToolbarQuickPopup: FC = () => {

  const navigate = useNavigate()
  const [ result, setResults ] = useState<ResultRow[]>([])
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

        if (done) {
          break;
        }

        try {
          const { action, param } = JSON.parse(chunkValue)

          setResults(res => [ ...res, { action, param } ])
        } catch (e) {
          console.log('error', e)
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
    function waitFor(selector: string): any {
      console.log('waiting for selector', selector)
      return new Promise((resolve) => {

        let observer: MutationObserver | null = null;
        const timeout = setTimeout(() => {
          observer?.disconnect();
          resolve(null);
        }, 1000)

        if (document.querySelector(selector)) {
          resolve(document.querySelector(selector));
          clearTimeout(timeout)
        } else {
          observer = new MutationObserver(() => {
            if (document.querySelector(selector)) {
              resolve(document.querySelector(selector));
              observer?.disconnect();
              clearTimeout(timeout)
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

      for (const { action, param } of result) {

        switch (action) {
          case 'navigate':
            navigate(param);
            break;
          case 'find':
          case 'focus':
            let elem = await waitFor('[data-testid="' + param + '"]')
            if (!elem) {
              break;
            }
            elem.focus()
            await new Promise(resolve => setTimeout(resolve, 1000));
            break;
          case 'click':
            const button = (await waitFor('[data-testid="' + param + '"]'));

            if (!button) {
              break;
            }
            simulatedClick(button);
            await new Promise(resolve => setTimeout(resolve, 1000));
            break;
          case 'fill':
            const input = document.activeElement as HTMLInputElement;
            input.value = param;
            const event = new Event('input', { bubbles: true, cancelable: true });
            input.dispatchEvent(event);
            await new Promise(resolve => setTimeout(resolve, 1000));
            break;
        }
      }
    }

    setModalOpen(false)
    console.log('execute', result)
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


      <Box height={360} overflow="auto">
        <br/>
        {result.length > 0 && <>
          {renderResults(execute, result)}
        </>}

        {isLoading && <Box textAlign="center" p={4} width="100%">
          <CircularProgress sx={{
            '--CircularProgress-trackColor': '#dbf4e6',
            '--CircularProgress-progressColor': '#01a76f',
          }}/>
        </Box>}
      </Box>


    </Modal>
  </>
}
