import { ITableHeadCell, ITableRow } from '@components/Table/types';
import Demo, { TableDataProps } from '@data/models/demo';
import { useTableFeatures } from '@hooks/useTableFeatures';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

const TableController = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['demo-table-data'],
    queryFn: () => Demo.getTableData(),
  });

  const { getTableCells } = useTableFeatures<TableDataProps>();

  const {
    headCells,
    rows,
  }: {
    headCells: ITableHeadCell<TableDataProps>[];
    rows: ITableRow<TableDataProps>[];
  } = useMemo(
    () =>
      getTableCells({
        data: data || [],
        fields: [
          {
            field: 'id',
            label: 'ID',
          },
          {
            field: 'avatar',
            label: 'Avatar',
            type: 'avatar',
            sortable: false,
          },
          {
            field: 'name',
            label: 'Name',
          },
          {
            field: 'address',
            label: 'Address',
            formatter: (value: TableDataProps['address']) =>
              ` ${value?.street}, ${value?.city}, ${value?.state}`,
          },
          {
            field: 'calories',
            label: 'Calories',
            formatter: (value: number) => value.toFixed(2),
          },
          {
            field: 'carbs',
            label: 'Carbs',
            formatter: (value: number) => value.toFixed(2),
          },
          {
            field: 'fat',
            formatter: (value: number) => value.toFixed(2),
          },
          {
            field: 'protein',
            label: 'Protein',
            formatter: (value: number) => value.toFixed(2),
          },
          {
            field: 'schedule',
            formatter: (value: TableDataProps['schedule']) =>
              value?.map(item => `${item.startTime} - ${item.endTime}`).join(', '),
          },
          { field: 'a.b.c' },
        ],
      }),
    [data, getTableCells],
  );

  return {
    rows,
    isLoading,
    headCells,
  };
};

export default TableController;
