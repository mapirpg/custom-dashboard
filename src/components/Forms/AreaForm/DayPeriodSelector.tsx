import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TimePosition } from '.';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import dayjs from 'dayjs';
import { AvaliableWeek } from '@data/interfaces/area';
import { PickerValue } from '@mui/x-date-pickers/internals';

export const DayPeriodSelector = ({
  selectedWeekDay,
  onDayPeriodChange,
}: {
  selectedWeekDay: AvaliableWeek;
  onDayPeriodChange: (props: { value: PickerValue; position: TimePosition }) => void;
}) => {
  const { t } = useTranslation();

  return (
    <>
      <Grid size={2}>
        <TimePicker
          ampm={false}
          label={`${selectedWeekDay?.completeLabel} - ${t('start')}`}
          format="HH:mm"
          value={dayjs(selectedWeekDay?.start, 'HH:mm')}
          onChange={v => onDayPeriodChange({ value: v, position: 'start' })}
        />
      </Grid>

      <Grid size={2}>
        <TimePicker
          ampm={false}
          label={`${selectedWeekDay?.completeLabel} - ${t('end')}`}
          format="HH:mm"
          value={dayjs(selectedWeekDay?.end, 'HH:mm')}
          onChange={v => onDayPeriodChange({ value: v, position: 'end' })}
        />
      </Grid>
    </>
  );
};
