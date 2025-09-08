import AreaForm, { FormValues } from '@components/Forms/AreaForm';
import PageContainer from '@components/PageContainer';
import { Typography } from '@mui/material';
import { useForm } from 'react-hook-form';

const RegisterAreaView = () => {
  const methods = useForm<FormValues>({
    defaultValues: {
      name: '',
      description: '',
      img: '',
      avaliability: {
        period: { start: '', end: '' },
        reseved: [],
        week: [],
      },
    },
  });

  return (
    <PageContainer
      header={<Typography variant="h4">Register Area</Typography>}
      content={<AreaForm formMethods={methods} />}
    />
  );
};

export default RegisterAreaView;
