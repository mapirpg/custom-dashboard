import React from 'react';
import { Avatar, Box, Checkbox, TableCell } from '@mui/material';
import { ITableRow } from './types';

function TableRow<T>({
  cells,
  onClick,
  isSelected,
  checkable = false,
}: ITableRow<T> & { isSelected?: boolean; checkable?: boolean }) {
  const tableCells = React.useMemo(() => {
    if (!cells) return [];

    return cells.map(cell => {
      if (cell?.type === 'avatar') {
        return {
          ...cell,
          value: (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Avatar src={cell?.value as string} />
            </Box>
          ),
        };
      }

      return cell;
    });
  }, [cells]);

  return (
    <>
      {checkable && (
        <TableCell padding="checkbox">
          <Checkbox color="primary" checked={isSelected} />
        </TableCell>
      )}

      {tableCells?.map(({ value, id, width }) => (
        <TableCell
          width={width}
          onClick={
            onClick && id
              ? (event: React.MouseEvent<unknown>) => onClick(event, String(id))
              : undefined
          }
          key={String(id)}
          align={'center'}
        >
          {typeof value === 'function' ? value?.(value) : value}
        </TableCell>
      ))}
    </>
  );
}

export default TableRow;
