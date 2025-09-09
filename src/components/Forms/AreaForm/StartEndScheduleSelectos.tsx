import { Grid, IconButton, Typography } from '@mui/material';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { FormValues, TimePosition } from '.';
import { PickerValue } from '@mui/x-date-pickers/internals';
import { useTranslation } from 'react-i18next';
import dayjs from 'dayjs';
import { AvaliableWeek } from '@data/interfaces/area';
import { Delete } from '@mui/icons-material';
import { Path, useFormContext, useWatch } from 'react-hook-form';

export const StartEndScheduleSelectors = ({
  onTimePickerChange,
  selectedWeekDay,
  onRemovePeriodInSchedule,
  scheduleIndex,
}: {
  selectedWeekDay: AvaliableWeek;
  onTimePickerChange: (value: PickerValue, position: TimePosition, scheduleIndex: number) => void;
  onRemovePeriodInSchedule: (scheduleIndex: number) => void;
  scheduleIndex: number;
}) => {
  const { t } = useTranslation();
  const { control } = useFormContext<FormValues>();

  const weekEnd = useWatch({
    control,
    name: `avaliability.week[${scheduleIndex}].end` as Path<FormValues>,
    defaultValue: '',
  }) as string;

  return (
    <Grid container columnSpacing={1} alignItems="center" sx={{ mb: 1 }}>
      <Typography variant="caption">{scheduleIndex + 1}</Typography>
      {['start', 'end'].map(key => (
        <Grid size={5} key={key}>
          <TimePicker
            label={t(key)}
            ampm={false}
            format="HH:mm"
            value={
              selectedWeekDay.schedules?.[scheduleIndex]?.[key as TimePosition]
                ? dayjs(selectedWeekDay.schedules[scheduleIndex][key as TimePosition], 'HH:mm')
                : null
            }
            onChange={v => onTimePickerChange(v, key as TimePosition, scheduleIndex)}
            maxTime={dayjs(weekEnd, 'HH:mm')}
          />
        </Grid>
      ))}

      <IconButton onClick={() => onRemovePeriodInSchedule(scheduleIndex)}>
        <Delete />
      </IconButton>
    </Grid>
  );
};
