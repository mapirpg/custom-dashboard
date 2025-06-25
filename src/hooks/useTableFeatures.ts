/* eslint-disable @typescript-eslint/no-explicit-any */
import { ITableHeadCell, ITableRow } from '@components/Table/types';
import { useTranslation } from 'react-i18next';

export function useTableFeatures<T>() {
  const { t } = useTranslation();

  const getHeaderCells = (data?: T[]): Array<ITableHeadCell<T>> => {
    if (!data || data.length === 0) {
      return [];
    }

    type DataItemType = T extends object ? T : Record<string, any>;

    const keys = Object.keys(data[0] as DataItemType) as Array<keyof T>;

    return keys.map((key, index) => ({
      id: key,
      label: t(`${String(key)}`),
      numeric: typeof data[index][key] === 'number',
      width: `${100 / keys.length}%`,
      disablePadding: false,
    }));
  };

  const getRowsCells = (data?: T[], headCells?: Array<ITableHeadCell<T>>): Array<ITableRow<T>> => {
    if (!data || data.length === 0 || !headCells || headCells.length === 0) {
      return [];
    }

    return data?.map((item, index) => ({
      id: String(index),
      cells: headCells?.map(hCell => ({
        id: String(hCell.id),
        field: hCell.id,
        value: item[hCell.id as keyof T],
        numeric: hCell.numeric,
        width: hCell.width,
        index,
      })),
    }));
  };

  const getSortedRows = (
    rows: ITableRow<T>[],
    {
      page = 0,
      rowsPerPage = 10,
      tableSort = { order: 'asc', orderBy: null as keyof T | null },
    }: {
      page?: number;
      rowsPerPage?: number;
      tableSort?: { order: 'asc' | 'desc'; orderBy: keyof T | null };
    },
  ) => {
    return [...rows].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).sort((a, b) => {
      const aValue = a.cells.find(cell => cell.field === tableSort.orderBy)?.value;
      const bValue = b.cells.find(cell => cell.field === tableSort.orderBy)?.value;

      if (aValue === undefined || bValue === undefined || aValue === null || bValue === null) {
        return 0;
      }

      if (tableSort.order === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });
  };

  return { getHeaderCells, getRowsCells, getSortedRows };
}
