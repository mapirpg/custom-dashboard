import { Badge, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export type DayOfWeek = {
  label: string;
  value: number;
  completeLabel: string;
};

export const DaysOfWeekButtons = ({
  week,
  onDayPress,
  selectedWeekDay,
}: {
  onDayPress: (day: DayOfWeek) => void;
  week: { day: string; dayValue: number; start: string; end: string; schedules: any[] }[];
  selectedWeekDay?: { day: string; dayValue: number; start: string; end: string; schedules: any[] };
}) => {
  const { t } = useTranslation();

  return [
    { label: t('sun'), completeLabel: t('sunday'), value: 1 },
    { label: t('mon'), completeLabel: t('monday'), value: 2 },
    { label: t('tue'), completeLabel: t('tuesday'), value: 3 },
    { label: t('wed'), completeLabel: t('wednesday'), value: 4 },
    { label: t('thu'), completeLabel: t('thursday'), value: 5 },
    { label: t('fri'), completeLabel: t('friday'), value: 6 },
    { label: t('sat'), completeLabel: t('saturday'), value: 7 },
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
