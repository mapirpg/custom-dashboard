import React from 'react';
import MuiTableHead from '@mui/material/TableHead';
import { Checkbox, TableCell, TableRow, TableSortLabel } from '@mui/material';

import { ITableHeadCell, ITableHeadRow } from './types';

function TableHead<T>({
  checkable = false,
  headCells = [],
  onRequestSort,
  onSelectAllClick,
  order,
  orderBy,
  numSelected = 0,
  rowCount = 0,
}: ITableHeadRow<T>) {
  const createSortHandler = (item: ITableHeadCell<T>) => (event: React.MouseEvent<unknown>) =>
    item?.sortable && onRequestSort?.(event, item?.id);

  return (
    <MuiTableHead
      sx={theme => ({
        bgcolor: theme.palette.primary.light,
      })}
    >
      <TableRow>
        <TableCell padding="checkbox">
          {checkable && (
            <Checkbox
              sx={theme => ({
                color: () => theme.palette.background.paper,
              })}
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
            />
          )}
        </TableCell>
        {headCells?.map(headCell => (
          <TableCell
            align={'center'}
            width={headCell?.width}
            key={String(headCell.id)}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell)}
              sx={theme => ({
                color: theme.palette.background.paper,
                fontWeight: 'bold',
              })}
              hideSortIcon={!headCell?.sortable}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  );
}

export default TableHead;
