import { useMemo } from 'react';
import Demo, { TableDataProps } from '@data/models/demo';
import { useTableFeatures } from '@hooks/useTableFeatures';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { ITableHeadCell, ITableRow } from '@components/Table/types';
import { FormValues } from '@components/Forms/DemoForm';
import { useFormValidation } from '@hooks/useFormValidation';

const DemoController = () => {
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

  const { resolver } = useFormValidation<FormValues>({
    fields: [
      {
        field: 'email',
        type: 'email',
      },
      {
        field: 'password',
        errorMessage: 'invalidPassword',
      },
      {
        field: 'confirmPassword',
        compareField: 'password',
        errorMessage: 'passwordsNotMatch',
      },
    ],
  });

  const formMethods = useForm<FormValues>({
    defaultValues: {
      // text: '',
      email: '',
      password: '',
      confirmPassword: '',
      // number: 0,
      // date: new Date(),
      // autoComplete: '',
    },
    resolver,
  });

  const { mutate } = useMutation({
    mutationFn: Demo.sendData<FormValues>,
  });

  const handleFormSubmit = (values: FormValues) => mutate(values);

  return {
    rows,
    isLoading,
    headCells,
    formMethods,
    onFormSubmit: formMethods.handleSubmit(handleFormSubmit),
  };
};

export default DemoController;
