import { Badge, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const DaysOfWeekButtons = ({
  week,
  onDayPress,
  selectedWeekDay,
}: {
  onDayPress: (day: { label: string; value: number }) => void;
  week: { day: string; dayValue: number; start: string; end: string; schedules: any[] }[];
  selectedWeekDay?: { day: string; dayValue: number; start: string; end: string; schedules: any[] };
}) => {
  const { t } = useTranslation();

  return [
    { label: t('sun'), value: 1 },
    { label: t('mon'), value: 2 },
    { label: t('tue'), value: 3 },
    { label: t('wed'), value: 4 },
    { label: t('thu'), value: 5 },
    { label: t('fri'), value: 6 },
    { label: t('sat'), value: 7 },
  ].map(day => {
    const isSelected = selectedWeekDay?.dayValue === day.value;
    const isDisabled = false;
    const badgeValue = week.find(d => d?.dayValue === day.value)?.schedules?.length;

    return (
      <Badge
        key={day.value}
        badgeContent={badgeValue}
        color="success"
        sx={{
          mr: 1,
        }}
      >
        <Button
          sx={{
            height: 40,
          }}
          disabled={isDisabled}
          onClick={() => onDayPress(day)}
          variant={isSelected ? 'contained' : 'outlined'}
        >
          {day.label}
        </Button>
      </Badge>
    );
  });
};
