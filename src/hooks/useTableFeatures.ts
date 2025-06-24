/* eslint-disable @typescript-eslint/no-explicit-any */
import { TableDataProps, TableHeadCellProps, TableOrder } from '@components/Table';
import { useTranslation } from 'react-i18next';

export const useTableFeatures = () => {
  const { t } = useTranslation();

  const getHeaderCells = (data?: TableDataProps[]) => {
    const dataKeys = data?.[0] ? Object.keys(data[0]) : [];

    return (
      dataKeys.map(
        key =>
          ({
            id: key,
            label: t(`table.${key}`) || key,
          }) as TableHeadCellProps,
      ) || []
    );
  };

  function descendingComparator<T extends TableDataProps>(
    a: T,
    b: T,
    orderBy: keyof TableDataProps,
  ) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }

    if (b[orderBy] > a[orderBy]) {
      return 1;
    }

    return 0;
  }

  function getComparator<Key extends keyof any>(
    order: TableOrder,
    orderBy: Key,
  ): (a: TableDataProps, b: TableDataProps) => number {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, String(orderBy))
      : (a, b) => -descendingComparator(a, b, String(orderBy));
  }

  return { getHeaderCells, getComparator };
};
