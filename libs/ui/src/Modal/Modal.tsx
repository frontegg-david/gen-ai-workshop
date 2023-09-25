import { FC, PropsWithChildren, useRef } from 'react';
import MuiModal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { Transition } from 'react-transition-group';

interface ModalProps extends PropsWithChildren {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const Modal: FC<ModalProps> = ({ open, setOpen, children }) => {

  const nodeRef = useRef();

  return <Transition  in={open} timeout={200} nodeRef={nodeRef}>
    {(state: string) => (
      <MuiModal

        keepMounted
        open={![ 'exited', 'exiting' ].includes(state)}
        onClose={() => setOpen(false)}
        slotProps={{
          backdrop: {
            sx: {
              opacity: 0,
              backdropFilter: 'none',
              transition: `opacity 200ms, backdrop-filter 200ms`,
              ...{
                entering: { opacity: 1, backdropFilter: 'blur(8px)' },
                entered: { opacity: 1, backdropFilter: 'blur(8px)' },
              }[state],
            },
          },
        }}
        sx={{
          visibility: state === 'exited' ? 'hidden' : 'visible',
        }}
      >
        <ModalDialog
          layout={'center'}
          sx={{
            '--Card-radius': '12px',
            mt: 2,
            mb: 2,
            maxWidth: 'calc(100% - 32px)',
            width: 600,
            opacity: 0,
            transition: `opacity 100ms`,
            ...{
              entering: { opacity: 1 },
              entered: { opacity: 1 },
            }[state],
          }}>

          {children}

        </ModalDialog>
      </MuiModal>
    )}
  </Transition>
}
