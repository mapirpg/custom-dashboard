import React from 'react';
import MuiTableHead from '@mui/material/TableHead';
import { Checkbox, TableCell, TableRow, TableSortLabel } from '@mui/material';

import { ITableHeadRow } from './types';

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
  const createSortHandler = (property: keyof T) => (event: React.MouseEvent<unknown>) => {
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
          {checkable && (
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
          )}
        </TableCell>
        {headCells?.map(headCell => (
          <TableCell
            sx={{ width: headCell.width || `${100 / headCells.length}%` }}
            key={String(headCell.id)}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={theme => ({
                color: theme.palette.background.paper,
                fontWeight: 'bold',
                fontSize: '0.875rem',
              })}
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
