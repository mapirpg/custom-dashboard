/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Box from '@mui/material/Box';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import MuiTableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import { visuallyHidden } from '@mui/utils';
import { ROWS_PER_PAGE } from '@utils/constants';

interface Data {
  id: string | number;
  [key: string]: number | string;
}

function descendingComparator<T extends Data>(a: T, b: T, orderBy: keyof Data) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
}

type TableOrder = 'asc' | 'desc';

interface TableHeadProps {
  headCells: HeadCell[];
  numSelected?: number;
  onRequestSort?: (event: React.MouseEvent<unknown>, property: keyof Data) => void;
  onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order?: TableOrder;
  orderBy?: string;
  rowCount?: number;
}

interface TableProps<T> {
  rows: T[];
  head: TableHeadProps;
}

function getComparator<Key extends keyof any>(
  order: TableOrder,
  orderBy: Key,
): (a: Data, b: Data) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, String(orderBy))
    : (a, b) => -descendingComparator(a, b, String(orderBy));
}

function TableHead({
  headCells = [],
  order = 'asc',
  orderBy = '',
  rowCount = 0,
  numSelected = 0,
  onRequestSort = () => {},
  onSelectAllClick = () => {},
}: TableHeadProps) {
  const createSortHandler = (property: keyof Data) => (event: React.MouseEvent<unknown>) => {
    onRequestSort?.(event, property);
  };

  return (
    <MuiTableHead
      sx={theme => ({
        bgcolor: theme.palette.primary.light,
        position: 'sticky',
        top: 0,
        zIndex: 10,
      })}
    >
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            sx={theme => ({
              color: () => theme.palette.background.paper,
            })}
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells?.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  );
}

function Table<T extends Data>({ rows, head }: TableProps<T>) {
  const [order, setOrder] = React.useState<TableOrder>('asc');
  const [orderBy, setOrderBy] = React.useState<keyof Data>('calories');
  const [selected, setSelected] = React.useState<string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(ROWS_PER_PAGE[0]);

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: keyof Data) => {
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
      <TableContainer sx={{ maxHeight: 56, overflow: 'visible', boxShadow: 'none' }}>
        <MuiTable sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
          <TableHead
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
              const labelId = `enhanced-table-checkbox-${index}`;

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
                  <TableCell padding="checkbox">
                    <Checkbox
                      color="primary"
                      checked={isItemSelected}
                      inputProps={{
                        'aria-labelledby': labelId,
                      }}
                    />
                  </TableCell>
                  <TableCell component="th" id={labelId} scope="row" padding="none">
                    {row.name}
                  </TableCell>
                  <TableCell align="right">{row.calories}</TableCell>
                  <TableCell align="right">{row.fat}</TableCell>
                  <TableCell align="right">{row.carbs}</TableCell>
                  <TableCell align="right">{row.protein}</TableCell>
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
    </Paper>
  );
}

export default Table;
