import { useState } from 'react';
import { Area, AvaliableWeek, WeekSchedule } from '@data/interfaces/area';
import { Add, ClearAll } from '@mui/icons-material';
import { Box, Button, Divider, Grid, Typography } from '@mui/material';
import { FormProvider, Path, UseFormReturn, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { PickerValue } from '@mui/x-date-pickers/internals';
import { DaysOfWeekButtons } from './DaysOfWeekButtons';
import { DayPeriodSelector } from './DayPeriodSelector';
import { SummaryDayItem } from './SummaryDayItem';
import { StartEndScheduleSelectors } from './StartEndScheduleSelectos';
import { ScheduleGenerator } from './ScheduleGenerator';

export interface FormValues extends Area {}

interface AreaFormProps {
  formMethods: UseFormReturn<FormValues>;
}

export type SchedulePosition = 'start' | 'end';

function AreaForm({ formMethods }: AreaFormProps) {
  const { t } = useTranslation();
  const { control } = formMethods;

  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedWeekDay, setSelectedWeekDay] = useState<AvaliableWeek>();
  const weekIndex = (selectedWeekDay?.dayValue || 1) - 1;

  const weekStart = useWatch({
    control,
    name: `avaliability.week[${weekIndex}].start` as Path<FormValues>,
    defaultValue: '',
  }) as string;

  const weekEnd = useWatch({
    control,
    name: `avaliability.week[${weekIndex}].end` as Path<FormValues>,
    defaultValue: '',
  }) as string;

  const week = useWatch({
    control,
    name: 'avaliability.week',
    defaultValue: [],
  }) as AvaliableWeek[];

  const handleDayOfWeekPress = (day: { label: string; value: number }) => {
    const index = week.findIndex(d => d?.dayValue === day?.value);

    setSelectedWeekDay(
      index > -1
        ? week[index]
        : {
            start: '',
            end: '',
            day: day.label,
            dayValue: day.value,
            schedules: [],
          },
    );
  };

  const handleAddPeriodInSchedule = () => {
    if (!selectedWeekDay) return;

    const updatedDay = {
      ...selectedWeekDay,
      schedules: [
        ...(selectedWeekDay.schedules || []),
        { start: weekStart, end: weekEnd, isAvalilable: true },
      ],
    };

    formMethods.setValue('avaliability.week', [
      ...week.filter(d => d.dayValue !== selectedWeekDay.dayValue),
      updatedDay,
    ]);

    setSelectedWeekDay(updatedDay);
  };

  const handleRemovePeriodInSchedule = (index: number) => {
    if (!selectedWeekDay) return;

    const updatedDay = {
      ...selectedWeekDay,
      schedules: (selectedWeekDay.schedules || []).filter((_, i) => i !== index),
    };

    formMethods.setValue(
      'avaliability.week',
      week.map(d => (d.dayValue === selectedWeekDay.dayValue ? updatedDay : d)),
      {
        shouldDirty: true,
        shouldTouch: true,
        shouldValidate: true,
      },
    );

    setSelectedWeekDay(updatedDay);
  };

  const handleClearAllSchedules = () => {
    if (!selectedWeekDay) return;

    const updatedDay = {
      ...selectedWeekDay,
      schedules: [],
    };

    formMethods.setValue('avaliability.week', [
      ...week.filter(d => d.dayValue !== selectedWeekDay.dayValue),
      updatedDay,
    ]);

    setSelectedWeekDay(updatedDay);
  };

  const handleScheduleTimeChange = (v: PickerValue, position: SchedulePosition, index: number) => {
    if (!selectedWeekDay) return;

    const newTime = v ? v.format('HH:mm') : '';
    const updatedSchedules = selectedWeekDay.schedules.map((s, i) =>
      i === index ? { ...s, [position]: newTime } : s,
    );
    const updatedDay = { ...selectedWeekDay, schedules: updatedSchedules };
    formMethods.setValue('avaliability.week', [
      ...week.filter(d => d.dayValue !== selectedWeekDay.dayValue),
      updatedDay,
    ]);
    setSelectedWeekDay(updatedDay);
  };

  const handleSchedulesGenerate = ({
    start,
    end,
    interval,
  }: {
    start: string;
    end: string;
    interval: string;
  }) => {
    if (!start || !end || !interval || !selectedWeekDay) {
      return;
    }

    setIsGenerating(true);

    const timeToMinutes = (time: string) => {
      const [hours, minutes] = time.split(':').map(Number);
      return hours * 60 + minutes;
    };

    const minutesToTime = (minutes: number) => {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`;
    };

    const startMinutes = timeToMinutes(start);
    const endMinutes = timeToMinutes(end);
    const intervalMinutes = timeToMinutes(interval);

    const schedules: WeekSchedule[] = [];
    let currentTime = startMinutes;

    while (currentTime + intervalMinutes <= endMinutes) {
      const scheduleStart = minutesToTime(currentTime);
      const scheduleEnd = minutesToTime(currentTime + intervalMinutes);

      schedules.push({
        start: scheduleStart,
        end: scheduleEnd,
        isAvalilable: true,
      });

      currentTime += intervalMinutes;
    }

    setTimeout(() => {
      const updatedDay = {
        ...selectedWeekDay,
        schedules: schedules,
      };

      formMethods.setValue('avaliability.week', [
        ...week.filter(d => d.dayValue !== selectedWeekDay.dayValue),
        updatedDay,
      ]);
      setIsGenerating(false);
      setSelectedWeekDay(updatedDay);
    }, 1000);
  };

  return (
    <FormProvider {...formMethods}>
      <Grid container size={12} sx={{ padding: 2 }}>
        <Grid container size={12} alignItems="center" columnSpacing={1}>
          <DaysOfWeekButtons
            week={week}
            onDayPress={handleDayOfWeekPress}
            selectedWeekDay={selectedWeekDay}
          />

          <Grid size={0.5} />
          {selectedWeekDay && <DayPeriodSelector weekIndex={weekIndex} />}
        </Grid>

        <Divider sx={{ width: '100%', mb: 1, mt: 2 }} />
        {selectedWeekDay ? (
          <>
            <Grid container size={12} columnSpacing={2} alignItems={'center'}>
              <Grid>
                <Button
                  disabled={!weekStart || !weekEnd}
                  variant="contained"
                  onClick={handleAddPeriodInSchedule}
                >
                  <Add />
                </Button>
              </Grid>

              <Grid>
                <Button
                  variant="contained"
                  onClick={handleClearAllSchedules}
                  disabled={(selectedWeekDay?.schedules || []).length === 0}
                >
                  <ClearAll />
                </Button>
              </Grid>

              <Grid size={1} />
              <ScheduleGenerator
                isGenerating={isGenerating}
                selectedWeekDay={selectedWeekDay}
                onGeneratePress={handleSchedulesGenerate}
              />
            </Grid>

            <Grid container size={12} sx={{ mt: 2 }} columnSpacing={2} alignItems="center">
              <Grid
                size={6}
                sx={{
                  height: '50vh',
                  borderRadius: 1,
                  border: '1px solid black',
                  overflowY: 'auto',
                  px: 1,
                  position: 'relative',
                  mb: 2,
                }}
              >
                {selectedWeekDay?.schedules?.map((_, index) => (
                  <StartEndScheduleSelectors
                    key={index}
                    scheduleIndex={index}
                    selectedWeekDay={selectedWeekDay}
                    onTimePickerChange={handleScheduleTimeChange}
                    onRemovePeriodInSchedule={handleRemovePeriodInSchedule}
                  />
                ))}
              </Grid>

              <Grid
                size={6}
                sx={{
                  height: '60vh',
                  borderRadius: 1,
                  overflowY: 'auto',
                  px: 1,
                  position: 'relative',
                  mb: 2,
                  mt: '-10vh',
                }}
              >
                <Typography>{t('summary')}</Typography>
                {week
                  .filter(
                    day => day && typeof day.dayValue === 'number' && day.schedules?.length > 0,
                  )
                  .map(day =>
                    day?.dayValue ? (
                      <SummaryDayItem key={day.dayValue} dayValue={day.dayValue} />
                    ) : null,
                  )}
              </Grid>
            </Grid>
          </>
        ) : (
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              flex: 1,
              bgcolor: 'background.paper',
            }}
          >
            <Typography variant="h3">{t('select_a_day_to_configure')}</Typography>
          </Box>
        )}
      </Grid>
    </FormProvider>
  );
}

export default AreaForm;
