import { useFormContext, useWatch } from 'react-hook-form';
import { FormValues } from '.';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AvaliableWeek } from '@data/interfaces/area';
import { useMemo } from 'react';

export const SummaryDayItem = ({ dayValue }: { dayValue: number }) => {
  const { t } = useTranslation();
  const { control } = useFormContext<FormValues>();

  const week = useWatch({
    control,
    name: 'avaliability.week',
    defaultValue: [],
  }) as AvaliableWeek[];

  const stableDayData = useMemo(() => {
    const dayData = week.find(day => day?.dayValue === dayValue);

    if (
      dayData &&
      typeof dayData.day === 'string' &&
      typeof dayData.dayValue === 'number' &&
      Array.isArray(dayData.schedules) &&
      dayData.schedules.length > 0
    ) {
      return dayData;
    }

    return null;
  }, [week, dayValue]);

  if (!stableDayData) {
    return null;
  }

  const { day, start, end, schedules } = stableDayData;

  return (
    <Box
      sx={{
        textAlign: 'left',
        mb: 2,
      }}
    >
      <Typography variant="h6">
        {`${day} ${start ? `${t('from')} ${start}` : ''} ${end ? `${t('to')} ${end}` : ''}`}
      </Typography>

      <Typography
        variant="body2"
        sx={{
          WebkitLineClamp: 2,
          overflow: 'hidden',
          display: '-webkit-box',
          textOverflow: 'ellipsis',
          WebkitBoxOrient: 'vertical',
        }}
      >
        {schedules
          ?.reduce((acc, schedule) => (acc || '') + `${schedule.start} - ${schedule.end}, `, '')
          .slice(0, -2)}
      </Typography>
    </Box>
  );
};
