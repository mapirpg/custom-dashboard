import React from 'react';
import { Avatar, Checkbox, TableCell } from '@mui/material';
import { ITableRow } from './types';

function TableRow<T>({
  cells,
  onClick,
  isSelected,
  checkable = false,
}: ITableRow<T> & { isSelected?: boolean; checkable?: boolean }) {
  const sortedCells = React.useMemo(() => {
    const commonCells = cells?.filter(c => !c?.type || c.type === 'common');

    const avatarCells = cells
      ?.filter(cell => cell?.type === 'avatar')
      .map((cell, index) => ({
        ...cell,
        index,
        value: <Avatar src={cell?.value as string} />,
      }));

    return [...commonCells, ...avatarCells].sort((a, b) => {
      if (a.index === undefined && b.index === undefined) return 0;

      if (a.index === undefined) return 1;

      if (b.index === undefined) return -1;

      return a.index - b.index;
    });
  }, [cells]);

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
