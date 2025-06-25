import React from 'react';
import { Checkbox, TableCell } from '@mui/material';
import { ITableRow } from './types';

function TableRow<T>({
  cells,
  onClick,
  isSelected,
  checkable = false,
}: ITableRow<T> & { isSelected?: boolean; checkable?: boolean }) {
  const sortedCells = cells?.sort((a, b) => {
    if (a.index !== undefined && b.index !== undefined) {
      return a.index - b.index;
    }

    if (a.index !== undefined) return -1;

    if (b.index !== undefined) return 1;

    return 0;
  });

  return (
    <>
      {checkable && (
        <TableCell padding="checkbox">
          <Checkbox color="primary" checked={isSelected} />
        </TableCell>
      )}

      {sortedCells?.map(({ numeric, value, id, width }) => (
        <TableCell
          onClick={
            onClick ? (event: React.MouseEvent<unknown>) => onClick(event, String(id)) : undefined
          }
          key={String(id)}
          align={numeric ? 'right' : 'left'}
          // padding={disablePadding ? 'none' : 'normal'}
          sx={{
            width: width || `${100 / (cells?.length || 1)}%`,
          }}
        >
          {typeof value === 'function' ? value?.(value) : value}
        </TableCell>
      ))}
    </>
  );
}

export default TableRow;
