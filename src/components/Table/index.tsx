/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Box from '@mui/material/Box';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { ROWS_PER_PAGE } from '@data/constants';
import TableHead from './Head';
import TableSkeleton from './Skeleton';
import { useTableFeatures } from '@hooks';

export interface TableDataProps {
  id: string | number;
  [key: string]: number | string;
}

export interface TableHeadCellProps {
  id: keyof TableDataProps;
  label: string;
  numeric: boolean;
  width?: string | number;
  disablePadding: boolean;
}

export type TableOrder = 'asc' | 'desc';

export interface TableHeadProps {
  headCells: TableHeadCellProps[];
  numSelected?: number;
  onRequestSort?: (event: React.MouseEvent<unknown>, property: keyof TableDataProps) => void;
  onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order?: TableOrder;
  orderBy?: string;
  rowCount?: number;
  checkable?: boolean;
}

export interface TableProps<T> {
  rows?: T[];
  head?: TableHeadProps;
  checkable?: boolean;
  isLoading?: boolean;
}

function Table<T extends TableDataProps>({
  rows = [],
  head = {
    headCells: [],
  },
  checkable = false,
  isLoading = true,
}: TableProps<T>) {
  const { getComparator } = useTableFeatures();
  const [order, setOrder] = React.useState<TableOrder>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof TableDataProps>('calories');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(ROWS_PER_PAGE[0]);

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: keyof TableDataProps) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);

    head?.onRequestSort?.(_event, property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows?.map(n => String(n.id));

      setSelected(newSelected);
      return;
    }

    setSelected([]);

    head?.onSelectAllClick?.(event);
  };

  const handleClick = (_event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const visibleRows = React.useMemo(
    () =>
      [...rows]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [order, orderBy, page, rows, rowsPerPage],
  );

  return (
    <Paper
      sx={{
        width: '100%',
        flexGrow: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {isLoading ? (
        <TableSkeleton checkable={checkable} />
      ) : (
        <>
          <TableContainer sx={{ maxHeight: 56, overflow: 'visible', boxShadow: 'none' }}>
            <MuiTable sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <TableHead
                checkable={head?.checkable !== undefined ? head.checkable : checkable}
                headCells={head?.headCells || []}
                order={order}
                numSelected={selected.length}
                orderBy={String(orderBy)}
                rowCount={rows.length}
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
              />
            </MuiTable>
          </TableContainer>

          <TableContainer
            sx={theme => ({
              overflow: 'auto',
              flex: 1,
              maxHeight: 'calc(100% - 56px)',
              width: '100%',
              scrollbarWidth: 'auto',
              scrollbarGutter: 'stable',
              '&::-webkit-scrollbar': {
                width: '8px',
                height: '8px',
                opacity: 0,
                transition: 'opacity 0.3s',
              },
              '&:hover::-webkit-scrollbar': {
                opacity: 1,
              },
              '&::-webkit-scrollbar-button': {
                display: 'none',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: theme.palette.primary.light,
              },
              '&:hover::-webkit-scrollbar-thumb': {
                opacity: 1,
              },
              '&::-webkit-scrollbar-track': {
                backgroundColor: theme.palette.background.paper,
              },
              '&::-webkit-scrollbar-corner': {
                backgroundColor: theme.palette.background.paper,
              },
            })}
          >
            <MuiTable sx={{ minWidth: 750 }} size="medium">
              <TableBody>
                {visibleRows?.map((row, index) => {
                  const isItemSelected = selected.includes(String(row.id));
                  const labelId = `table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, String(row.id))}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.id}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      {checkable && (
                        <TableCell padding="checkbox">
                          <Checkbox
                            color="primary"
                            checked={isItemSelected}
                            inputProps={{
                              'aria-labelledby': labelId,
                            }}
                          />
                        </TableCell>
                      )}
                      {head?.headCells.map(headCell => {
                        const value = row[headCell.id];
                        return (
                          <TableCell
                            key={headCell.id}
                            align={headCell.numeric ? 'right' : 'left'}
                            padding={headCell.disablePadding ? 'none' : 'normal'}
                            sx={{
                              width: headCell.width || `${100 / head?.headCells?.length || 1}%`,
                            }}
                          >
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow>
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </MuiTable>
          </TableContainer>

          <Box
            sx={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <TablePagination
              component="div"
              page={page}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              rowsPerPageOptions={ROWS_PER_PAGE}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </>
      )}
    </Paper>
  );
}

export default Table;
