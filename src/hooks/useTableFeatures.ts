/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { ITableHeadCell, ITableRow } from '@components/Table/types';
import { useTranslation } from 'react-i18next';
import { extractKeys } from '@utils/extractKeys';
import { getNestedValue } from '@utils/getNestedValue';
import { isNumericValue } from '@utils/isNumericValue';

type FieldAddConfig = {
  field: string;
  value: any;
  width?: string | number;
  numeric?: boolean;
  dataIndex?: number;
};

type FieldUpdateConfig<T> = {
  field: keyof T | string;
  transform: (value: any, rowData?: T, rowIndex?: number) => any;
  width?: string | number;
  numeric?: boolean;
};

interface EnhancedRows<T> {
  rows: Array<ITableRow<T>>;
  add: (fieldConfigs: FieldAddConfig[]) => EnhancedRows<T>;
  update: (fieldConfigs: FieldUpdateConfig<T>[]) => EnhancedRows<T>;
}

const formatTableValue = (value: any): any => {
  if (Array.isArray(value)) {
    return value.map(item => {
      if (typeof item === 'object' && item !== null) {
        return JSON.stringify(item) || '-';
      }

      return item;
    });
  }

  if (value === null) {
    return null;
  }

  if (value === undefined) {
    return '-';
  }

  if (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    !React.isValidElement(value)
  ) {
    return JSON.stringify(value);
  }

  return value;
};

export const useTableFeatures = <T>() => {
  const { t } = useTranslation();

  const getHeaderCells = (data?: T[]): Array<ITableHeadCell<T>> => {
    if (!data || data.length === 0) {
      return [];
    }

    const nestedKeys = extractKeys(data[0]);

    return nestedKeys.map(key => {
      const isNumeric = data.some(item => isNumericValue(getNestedValue(item, key)));

      return {
        id: key as any,
        label: t(key.split('.').pop() || key),
        numeric: isNumeric,
        width: `${100 / nestedKeys.length}%`,
        disablePadding: false,
      };
    });
  };

  const getRowsCells = <T>(data?: T[], headCells?: Array<ITableHeadCell<T>>): EnhancedRows<T> => {
    if (!data || data.length === 0 || !headCells || headCells.length === 0) {
      const emptyResult: EnhancedRows<T> = {
        rows: [],
        add: () => emptyResult,
        update: () => emptyResult,
      };

      return emptyResult;
    }

    const initialRows = data?.map((item, index) => ({
      id: String(index),
      cells: headCells?.map(hCell => {
        const fieldId = String(hCell?.id);
        const fieldValue = getNestedValue(item, fieldId);

        return {
          id: fieldId,
          field: hCell?.id,
          value: formatTableValue(fieldValue),
          numeric: hCell?.numeric,
          width: hCell?.width,
          index,
          path: fieldId,
          rawValue: fieldValue,
        };
      }),
    }));

    const createEnhancedInstance = (rows: ITableRow<T>[]): EnhancedRows<T> => {
      const instance: EnhancedRows<T> = {
        rows,
        add: (fieldConfigs: FieldAddConfig[]) => {
          const updatedRows = rows.map((row, rowIndex) => {
            const rowData = data?.[rowIndex];
            const newCells = fieldConfigs.map((fieldConfig, configIndex) => {
              const baseValue =
                typeof fieldConfig.value === 'function'
                  ? fieldConfig.value(rowData, rowIndex)
                  : fieldConfig.value;

              return {
                id: String(fieldConfig.field),
                field: fieldConfig.field,
                value: formatTableValue(baseValue),
                numeric: fieldConfig.numeric || isNumericValue(baseValue),
                width: fieldConfig.width,
                index:
                  fieldConfig.dataIndex !== undefined
                    ? fieldConfig.dataIndex
                    : (row.cells?.length || 0) + configIndex,
                rawValue: baseValue,
                path: fieldConfig.field,
              };
            });

            return {
              ...row,
              cells: [...(row.cells || []), ...newCells],
            };
          });

          return createEnhancedInstance(updatedRows);
        },
        update: (fieldConfigs: FieldUpdateConfig<T>[]) => {
          const updatedRows = rows.map((row, rowIndex) => {
            const rowData = data[rowIndex];
            const updatedCells = [...(row.cells || [])];

            Array.from({ length: updatedCells.length }).forEach((_, i) => {
              const cell = updatedCells[i];

              const matchingConfig = fieldConfigs.find(config => {
                const configField = String(config.field);
                const cellField = String(cell.field);

                return (
                  configField === cellField ||
                  cellField.startsWith(`${configField}.`) ||
                  configField.startsWith(`${cellField}.`)
                );
              });

              if (matchingConfig) {
                const transformedValue = matchingConfig.transform(
                  cell.rawValue !== undefined ? cell.rawValue : cell.value,
                  rowData,
                  rowIndex,
                );

                updatedCells[i] = {
                  ...cell,
                  width: matchingConfig.width || cell.width,
                  numeric: matchingConfig.numeric || cell.numeric,
                  value: formatTableValue(transformedValue),
                  rawValue: transformedValue,
                };
              }
            });

            return {
              ...row,
              cells: updatedCells,
            };
          });

          return createEnhancedInstance(updatedRows);
        },
      };

      return instance;
    };

    return createEnhancedInstance(initialRows);
  };

  const getSortedRows = (
    rowsData: ITableRow<T>[] | EnhancedRows<T> | { rows: ITableRow<T>[] },
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
      const aValue = a.cells.find(cell => cell.field === tableSort.orderBy)?.rawValue;
      const bValue = b.cells.find(cell => cell.field === tableSort.orderBy)?.rawValue;

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
};
