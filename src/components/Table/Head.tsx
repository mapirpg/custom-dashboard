import React from 'react';
import { visuallyHidden } from '@mui/utils';
import MuiTableHead from '@mui/material/TableHead';
import { Box, Checkbox, TableCell, TableRow, TableSortLabel } from '@mui/material';

import { TableDataProps, TableHeadProps } from '.';

function TableHead({
  headCells = [],
  order = 'asc',
  orderBy = '',
  rowCount = 0,
  numSelected = 0,
  onRequestSort = () => {},
  onSelectAllClick = () => {},
  checkable,
}: TableHeadProps) {
  const createSortHandler =
    (property: keyof TableDataProps) => (event: React.MouseEvent<unknown>) => {
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
            width={headCell.width || `${100 / headCells.length}%`}
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
              sx={theme => ({
                color: theme.palette.background.paper,
                fontWeight: 'bold',
                fontSize: '0.875rem',
              })}
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

export default TableHead;
