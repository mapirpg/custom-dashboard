/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { PerPageVelueProps } from '@data/constants';

export interface ITableCell<T> {
  id: string;
  field: keyof T | string;
  value: T[keyof T] | React.ReactNode | any;
  numeric?: boolean;
  width?: string | number;
  index?: number;
  formatter?: (value: T[keyof T]) => string | React.ReactNode;
  type?: 'common' | 'number' | 'date' | 'boolean' | 'avatar';
  rawValue?: any;
  path?: string;
}

export interface ITableRow<T> {
  id: string;
  cells: Array<ITableCell<T>>;
  onClick?: (event: React.MouseEvent<unknown>, id: ITableCell<T>['id']) => void;
}

export interface ITableHeadCell<T> {
  id: keyof T;
  label: string;
  numeric: boolean;
  width?: string | number;
  disablePadding: boolean;
}

export interface ITableHeadRow<T> {
  checkable?: boolean;
  headCells: Array<ITableHeadCell<T>>;
  onRequestSort?: (event: React.MouseEvent<unknown>, property: keyof T) => void;
  onSelectAllClick?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order?: 'asc' | 'desc';
  orderBy?: keyof T | null;
  numSelected?: number;
  rowCount?: number;
}

export interface ITableOrder<T> {
  order: 'asc' | 'desc';
  orderBy: keyof T | null;
}

export interface ITable<T> {
  data?: T[];
  rows?: Array<ITableRow<T>>;
  head?: ITableHeadRow<T>;
  isLoading?: boolean;
  checkable?: boolean;
  onChangePage?: (page: number) => void;
  onChangeRowsPerPage?: (rowsPerPage: number) => void;
  initialValues?: {
    page?: number;
    perPage?: PerPageVelueProps;
    selecteds?: ITableRow<T>['id'][];
    order?: ITableOrder<T>['order'];
    orderBy?: ITableOrder<T>['orderBy'];
  };
}
