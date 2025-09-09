import { AvaliableWeek } from '@data/interfaces/area';
import { Download } from '@mui/icons-material';
import { Button, Grid, Typography } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { Controller, useForm, useFormContext, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { FormValues } from '.';
import dayjs from 'dayjs';
import { useMemo } from 'react';

export const ScheduleGenerator = ({
  selectedWeekDay,
  onGeneratePress,
  isGenerating,
}: {
  selectedWeekDay: AvaliableWeek | undefined;
  isGenerating?: boolean;
  onGeneratePress?: (props: { start: string; end: string; interval: string }) => void;
}) => {
  const { t } = useTranslation();
  const { control, watch } = useFormContext<FormValues>();
  const week = useWatch({
    control,
    name: 'avaliability.week',
    defaultValue: [],
  }) as AvaliableWeek[];

  const weekIndex = week.findIndex(w => w.dayValue === selectedWeekDay?.dayValue);

  const { start, end } = useMemo(() => {
    const start = watch(`avaliability.week.${weekIndex}.start`) as string;
    const end = watch(`avaliability.week.${weekIndex}.end`) as string;
    return { start, end };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, weekIndex, week]);

  const formMethods = useForm<{ interval: string }>({
    defaultValues: { interval: '' },
  });

  const interval = useWatch({
    control: formMethods.control,
    name: 'interval',
    defaultValue: '',
  });

  return (
    <Grid
      container
      size={3}
      columnSpacing={0}
      sx={{
        pl: 1,
        py: 0.5,
        boxShadow: 1,
        borderRadius: 1,
        position: 'relative',
        alignItems: 'center',
        bgcolor: 'background.paper',
      }}
    >
      <Typography
        variant="caption"
        sx={{
          position: 'absolute',
          top: -10,
        }}
      >
        {t('auto_generate_schedules_for')} {selectedWeekDay?.day}
      </Typography>

      <Grid size={8}>
        <Controller
          control={formMethods.control}
          name="interval"
          render={({ field }) => (
            <TimePicker
              disabled={!start || !end}
              ampm={false}
              label={t('interval')}
              format="HH:mm"
              value={field.value ? dayjs(field.value as string, 'HH:mm') : null}
              onChange={v => field.onChange(v ? v.format('HH:mm') : '')}
            />
          )}
        />
      </Grid>

      <Grid size={4}>
        <Button
          disabled={!start || !end || !interval}
          loading={isGenerating}
          sx={{
            height: 40,
            mt: 0.5,
          }}
          variant="contained"
          onClick={() => onGeneratePress?.({ start, end, interval })}
        >
          <Download />
        </Button>
      </Grid>
    </Grid>
  );
};
