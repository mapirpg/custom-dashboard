import { Box, BoxProps } from '@mui/material';

const Container = (props: BoxProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        flexGrow: 1,
        position: 'fixed',
        top: 0,
        left: 0,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
      }}
      {...props}
    />
  );
};

export default Container;
