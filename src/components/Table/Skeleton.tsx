import { Box, Skeleton } from '@mui/material';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import MuiTableHead from '@mui/material/TableHead';
import { ROWS_PER_PAGE } from '@data/constants';

function TableSkeleton({
  rows = ROWS_PER_PAGE[1],
  columns = 6,
  checkable = true,
}: {
  rows?: number;
  columns?: number;
  checkable?: boolean;
}) {
  const tableRows = Array.from({ length: rows }, (_, i) => i);
  const tableColumns = Array.from({ length: columns }, (_, i) => i);

  return (
    <>
      <TableContainer sx={{ maxHeight: 56, overflow: 'visible', boxShadow: 'none', width: '100%' }}>
        <MuiTable sx={{ minWidth: 750, tableLayout: 'fixed' }} aria-labelledby="tableTitle">
          <MuiTableHead
            sx={theme => ({
              bgcolor: theme.palette.primary.light,
              position: 'sticky',
              top: 0,
              zIndex: 10,
            })}
          >
            <TableRow>
              <TableCell>
                {checkable && <Skeleton variant="rectangular" width={24} height={24} />}
              </TableCell>

              {tableColumns.map(column => (
                <TableCell
                  key={column}
                  padding={column === 0 ? 'none' : 'normal'}
                  sx={{
                    width: `${100 / tableColumns.length}%`,
                  }}
                >
                  <Skeleton
                    variant="text"
                    width={column === 0 ? 120 : 80}
                    height={24}
                    sx={{ backgroundColor: 'rgba(255, 255, 255, 0.3)' }}
                  />
                </TableCell>
              ))}
            </TableRow>
          </MuiTableHead>
        </MuiTable>
      </TableContainer>

      <TableContainer
        sx={{
          overflow: 'hidden',
          flex: 1,
          maxHeight: 'calc(100% - 56px)',
          width: '100%',
        }}
      >
        <MuiTable sx={{ minWidth: 750 }} size="medium">
          <TableBody>
            {tableRows.map(row => (
              <TableRow key={row} hover>
                <TableCell>
                  {checkable && <Skeleton variant="rectangular" width={24} height={24} />}
                </TableCell>

                {tableColumns.map(column => (
                  <TableCell
                    key={column}
                    padding={column === 0 ? 'none' : 'normal'}
                    align={column === 0 ? 'left' : 'right'}
                    sx={{
                      width: `${100 / tableColumns.length}%`,
                    }}
                  >
                    <Skeleton variant="text" width={column === 0 ? '100%' : 60} height={20} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </MuiTable>
      </TableContainer>

      <Box
        sx={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'flex-end',
          p: 1.5,
        }}
      >
        <Skeleton variant="rectangular" width={240} height={36} />
      </Box>
    </>
  );
}

export default TableSkeleton;
