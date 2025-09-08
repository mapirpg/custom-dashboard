import { Grid } from '@mui/material';
import { Controller, Path, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormValues } from '.';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';

export const DayPeriodSelector = ({ weekIndex }: { weekIndex: number }) => {
  const { t } = useTranslation();
  const { control } = useFormContext<FormValues>();

  return (
    <>
      <Grid size={2}>
        <Controller
          key={weekIndex}
          control={control}
          name={`avaliability.week[${weekIndex}].start` as Path<FormValues>}
          render={({ field }) => (
            <TimePicker
              ampm={false}
              label={t('week_day_start_period')}
              format="HH:mm"
              value={field.value ? dayjs(field.value as string, 'HH:mm') : null}
              onChange={v => field.onChange(v ? v.format('HH:mm') : '')}
            />
          )}
        />
      </Grid>

      <Grid size={2}>
        <Controller
          control={control}
          key={weekIndex}
          name={`avaliability.week[${weekIndex}].end` as Path<FormValues>}
          render={({ field }) => (
            <TimePicker
              ampm={false}
              label={t('week_day_end_period')}
              format="HH:mm"
              value={field.value ? dayjs(field.value as string, 'HH:mm') : null}
              onChange={v => field.onChange(v ? v.format('HH:mm') : '')}
            />
          )}
        />
      </Grid>
    </>
  );
};
