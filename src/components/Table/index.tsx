/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Box from '@mui/material/Box';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import MuiTableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ROWS_PER_PAGE } from '@data/constants';
import TableHead from './Head';
import TableSkeleton from './Skeleton';
import TableRow from './Row';
import { useTableFeatures } from '@hooks/useTableFeatures';
import { ITable, ITableOrder, ITableRow } from './types';

function Table<T>({
  data,
  head,
  rows,
  isLoading,
  checkable,
  initialValues,
  onChangePage,
  onChangeRowsPerPage,
}: ITable<T>) {
  const { getSortedRows, getHeaderCells, getRowsCells } = useTableFeatures<T>();

  const [selected, setSelected] = React.useState<ITableRow<T>['id'][]>(
    initialValues?.selecteds || [],
  );
  const [page, setPage] = React.useState(initialValues?.page || 0);
  const [rowsPerPage, setRowsPerPage] = React.useState<number>(
    initialValues?.perPage || ROWS_PER_PAGE[0],
  );
  const [tableSort, setTableSort] = React.useState<ITableOrder<T>>({
    order: initialValues?.order || 'asc',
    orderBy: initialValues?.orderBy || (head?.headCells?.[0]?.id as keyof T) || null,
  });

  const { rowsCells, headCells } = React.useMemo(() => {
    const hasRows = Boolean(rows);
    const hasHead = Boolean(head?.headCells);
    const hasData = Boolean(data);

    const derivedHeadCells = hasHead ? head?.headCells : hasData ? getHeaderCells(data) : [];
    const derivedRowsCells = hasRows ? rows : hasData ? getRowsCells(data, derivedHeadCells) : [];

    return {
      rowsCells: derivedRowsCells || [],
      headCells: derivedHeadCells || [],
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, head?.headCells, rows]);

  const { visibleRows, emptyRows } = React.useMemo(
    () => ({
      visibleRows: getSortedRows(rowsCells, {
        page,
        rowsPerPage,
        tableSort,
      }),
      emptyRows: page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rowsCells.length) : 0,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rows, page, rowsPerPage, tableSort, rowsCells],
  );

  const handleRequestSort = (_event: React.MouseEvent<unknown>, property: keyof T) => {
    if (typeof property !== 'string') return;

    const isAsc = tableSort.orderBy === property && tableSort.order === 'asc';

    setTableSort(() => ({
      order: isAsc ? 'desc' : 'asc',
      orderBy: property,
    }));

    head?.onRequestSort?.(_event, property);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = (rows ?? rowsCells).map(n => String(n.id));

      if (newSelected) {
        setSelected(newSelected);
      }

      return;
    }

    head?.onSelectAllClick?.(event);

    setSelected([]);
  };

  const handleClick = (_event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    const newSelected =
      selectedIndex === -1 ? [...selected, id] : selected.filter(selectedId => selectedId !== id);

    setSelected(newSelected);
  };

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);

    onChangePage?.(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setRowsPerPage(value);
    setPage(0);

    onChangeRowsPerPage?.(value);
  };

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
        <TableSkeleton />
      ) : (
        <>
          <TableContainer sx={{ maxHeight: 56, overflow: 'visible', boxShadow: 'none' }}>
            <MuiTable sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
              <TableHead
                onRequestSort={handleRequestSort}
                onSelectAllClick={handleSelectAllClick}
                numSelected={selected.length}
                rowCount={rowsCells.length}
                checkable={checkable ? true : head?.checkable}
                headCells={headCells}
                order={tableSort.order}
                orderBy={tableSort.orderBy}
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
                {visibleRows?.map(row => {
                  const isItemSelected = selected.includes(String(row.id));

                  return (
                    <MuiTableRow
                      hover
                      onClick={event => handleClick(event, String(row.id))}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={String(row.id)}
                      selected={isItemSelected}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableRow
                        cells={row.cells}
                        checkable={checkable}
                        id={row.id}
                        onClick={handleClick}
                        isSelected={isItemSelected}
                      />
                    </MuiTableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <MuiTableRow>
                    <TableCell colSpan={6} />
                  </MuiTableRow>
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
              count={rowsCells.length}
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
