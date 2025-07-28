/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ITableCell, ITableHeadCell, ITableRow } from '@components/Table/types';
import { useTranslation } from 'react-i18next';
import { getNestedValue } from '@utils/getNestedValue';
import { isNumericValue } from '@utils/isNumericValue';

type FieldProps<T> = Omit<ITableCell<T>, 'id'>;
export interface ITabCells<T> {
  headCells: ITableHeadCell<T>[];
  rows: ITableRow<T>[];
}
export const useTableFeatures = <T>() => {
  const { t } = useTranslation();

  const getTableCells = <T>(props?: {
    data?: T[];
    fields?: Array<FieldProps<T>>;
  }): ITabCells<T> => {
    if (!props?.fields || !props?.data) {
      return { rows: [], headCells: [] };
    }

    const headCells: Array<ITableHeadCell<T>> = props.fields.map(item => {
      const { field, label, sortable } = item;

      return {
        id: field as keyof T,
        label: label || t(`${field as string}`),
        sortable: sortable !== undefined ? sortable : true,
        width: item?.width || `${100 / (props?.fields?.length || 1)}%`,
      };
    });

    const rows: ITableRow<T>[] = props?.data?.map((dataItem, index) => {
      const cells =
        props?.fields?.map(item => {
          const { field, type, formatter } = item;
          const rawValue = String(field)?.includes('.')
            ? getNestedValue(dataItem, field as string)
            : dataItem[field as keyof T];

          let value = rawValue;

          if (formatter) {
            value = formatter(rawValue);
          } else if (
            rawValue &&
            typeof rawValue === 'object' &&
            !Array.isArray(rawValue) &&
            !React.isValidElement(rawValue)
          ) {
            value = Object.keys(rawValue).length > 0 ? JSON.stringify(rawValue) : '';
          } else if (Array.isArray(rawValue)) {
            value = rawValue.length > 0 ? rawValue.join(', ') : '';
          } else if (rawValue === null || rawValue === undefined) {
            value = '';
          }

          return {
            index,
            rawValue,
            id: `${String(field)}-${index}`,
            value: value as T[keyof T] | React.ReactNode | any,
            numeric: isNumericValue(value),
            type: type || 'common',
            width: item?.width || `${100 / (props?.fields?.length || 1)}%`,
            ...item,
          };
        }) || [];

      return {
        id: `row-${index}`,
        cells,
      };
    });

    return {
      rows,
      headCells,
    };
  };

  const getSortedRows = (
    rowsData: ITableRow<T>[] | { rows: ITableRow<T>[] },
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
    const rows = Array.isArray(rowsData) ? rowsData : 'rows' in rowsData ? rowsData.rows : [];

    return [...rows].slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).sort((a, b) => {
      const aValue = a?.cells?.find(cell => cell.field === tableSort.orderBy)?.rawValue;
      const bValue = b?.cells?.find(cell => cell.field === tableSort.orderBy)?.rawValue;

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

  return { getTableCells, getSortedRows };
};
