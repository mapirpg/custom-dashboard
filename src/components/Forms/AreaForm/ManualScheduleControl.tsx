import { AvaliableWeek } from '@data/interfaces/area';
import { Add, ClearAll } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { useFormContext } from 'react-hook-form';
import { FormValues } from '.';
import { useMemo } from 'react';

export const ManualScheduleControl = ({
  handleAdd,
  handleClear,
  selectedWeekDay,
}: {
  handleAdd: (props: { start: string; end: string }) => void;
  handleClear: () => void;
  selectedWeekDay?: AvaliableWeek;
}) => {
  const { watch } = useFormContext<FormValues>();
  const week = watch('avaliability.week') as AvaliableWeek[];
  const weekIndex = week.findIndex(w => w.dayValue === selectedWeekDay?.dayValue);

  const { start, end } = useMemo(() => {
    const start = watch(`avaliability.week.${weekIndex}.start`) as string;
    const end = watch(`avaliability.week.${weekIndex}.end`) as string;
    return { start, end };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch, weekIndex, week]);

  return (
    <>
      <Grid>
        <Button
          disabled={!start || !end}
          variant="contained"
          onClick={() => handleAdd({ start, end })}
        >
          <Add />
        </Button>
      </Grid>

      <Grid>
        <Button
          variant="contained"
          onClick={handleClear}
          disabled={(selectedWeekDay?.schedules || []).length === 0}
        >
          <ClearAll />
        </Button>
      </Grid>
    </>
  );
};
