import Demo from '@data/models/demo';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { FormValues } from '@components/Forms/DemoForm';
import { useFormValidation } from '@hooks/useFormValidation';
import { InputSelectOption } from '@components/FormInput';

const InputsController = () => {
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
      {
        field: 'select',
      },
      {
        field: 'text',
      },
    ],
  });

  const { data: selectOptions, isLoading: loadingOptions } = useQuery<Array<InputSelectOption>>({
    queryKey: ['selectOptions'],
    queryFn: async () => {
      const res = await Demo.getSelectOptions();
      return res?.map(option => ({
        label: option.name,
        value: option.opt,
      }));
    },
  });

  const formMethods = useForm<FormValues>({
    defaultValues: {
      select: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    resolver,
  });

  const { mutate } = useMutation({
    mutationFn: Demo.sendData<FormValues>,
  });

  const handleFormSubmit = (values: FormValues) => mutate(values);

  return {
    formMethods,
    selectOptions,
    onFormSubmit: formMethods.handleSubmit(handleFormSubmit),
    loadingOptions,
  };
};

export default InputsController;
