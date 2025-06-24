import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, useMediaQuery } from '@mui/material';
import { useAppSelector } from '@hooks/useRedux';
import { MAIN_LAYOUT_DRAWER_WIDTH, MAIN_LAYOUT_HEIGHT } from '@utils/constants';

const PageContainer = ({
  header,
  content,
}: {
  content?: React.ReactNode;
  header?: React.ReactNode;
}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const drawerOpen = useAppSelector(state => state.drawer.open);
  const contentHeight = header
    ? isSmallScreen
      ? `${MAIN_LAYOUT_HEIGHT - 10}vh`
      : `${MAIN_LAYOUT_HEIGHT - 20}vh`
    : isSmallScreen
      ? MAIN_LAYOUT_HEIGHT
      : `${MAIN_LAYOUT_HEIGHT - 10}vh`;

  return (
    <>
      {header && (
        <Box
          sx={theme => ({
            height: isSmallScreen ? '8vh' : '10vh',
            maxHeight: isSmallScreen ? '8vh' : '10vh',
            boxShadow: theme.shadows[3],
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 2,
            mb: 1,
          })}
        >
          {header}
        </Box>
      )}

      <Box
        sx={theme => ({
          p: 2,
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
          height: contentHeight,
          minHeight: contentHeight,
          width: isSmallScreen
            ? '95vw'
            : drawerOpen
              ? '75vw'
              : `calc(75vw + ${MAIN_LAYOUT_DRAWER_WIDTH}px)`,
          flexGrow: 1,
          boxShadow: theme.shadows[9],
          borderRadius: 2,
        })}
      >
        {content}
      </Box>
    </>
  );
};

export default PageContainer;
