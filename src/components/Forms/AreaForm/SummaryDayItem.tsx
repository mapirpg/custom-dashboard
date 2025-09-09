import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AvaliableWeek } from '@data/interfaces/area';

export const SummaryDayItem = ({ dayData }: { dayData: AvaliableWeek }) => {
  const { t } = useTranslation();

  const { day, completeLabel, start, end, schedules } = dayData || {};

  return (
    <Box
      sx={{
        textAlign: 'left',
        mb: 2,
      }}
    >
      <Typography variant="h6" fontWeight={600}>
        {`${completeLabel}: `}
        <Typography component="span">
          {`${start ? `${t('from')} ${start}` : ''} ${end ? `${t('to')} ${end}` : ''}`}
        </Typography>
      </Typography>

      <Typography
        variant="body2"
        sx={{
          fontWeight: 600,
          WebkitLineClamp: 2,
          overflow: 'hidden',
          display: '-webkit-box',
          textOverflow: 'ellipsis',
          WebkitBoxOrient: 'vertical',
        }}
      >
        {`${t('schedules')}: `}
        <Typography component="span">
          {`${schedules
            ?.reduce((acc, schedule) => (acc || '') + `${schedule.start} - ${schedule.end}, `, '')
            .slice(0, -2)}`}
        </Typography>
      </Typography>
    </Box>
  );
};
