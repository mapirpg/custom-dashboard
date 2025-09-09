import { useState } from 'react';
import { Area, AvaliableWeek, WeekSchedule } from '@data/interfaces/area';
import { Box, Divider, Grid, Typography } from '@mui/material';
import { FormProvider, UseFormReturn, useWatch } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { PickerValue } from '@mui/x-date-pickers/internals';
import { DayOfWeek, DaysOfWeekButtons } from './DaysOfWeekButtons';
import { DayPeriodSelector } from './DayPeriodSelector';
import { SummaryDayItem } from './SummaryDayItem';
import { StartEndScheduleSelectors } from './StartEndScheduleSelectos';
import { ScheduleGenerator } from './ScheduleGenerator';
import { ManualScheduleControl } from './ManualScheduleControl';

export interface FormValues extends Area {}

interface AreaFormProps {
  formMethods: UseFormReturn<FormValues>;
}

export type TimePosition = 'start' | 'end';

function AreaForm({ formMethods }: AreaFormProps) {
  const { t } = useTranslation();
  const { control } = formMethods;

  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedWeekDay, setSelectedWeekDay] = useState<AvaliableWeek>();

  const week = useWatch({
    control,
    name: 'avaliability.week',
    defaultValue: [],
  }) as AvaliableWeek[];

  const handleDayOfWeekPress = (day: DayOfWeek) => {
    const index = week.findIndex(d => d?.dayValue === day?.value);

    setSelectedWeekDay(
      index > -1
        ? week[index]
        : {
            start: '',
            end: '',
            day: day.label,
            completeLabel: day.completeLabel,
            dayValue: day.value,
            schedules: [],
          },
    );
  };

  const handlePeriodChange = (props: { value: PickerValue; position: TimePosition }) => {
    if (!selectedWeekDay) return;

    const newTime = props.value ? props.value.format('HH:mm') : '';

    const updatedDay = { ...selectedWeekDay, [props.position]: newTime };

    formMethods.setValue('avaliability.week', [
      ...week.filter(d => d.dayValue !== selectedWeekDay.dayValue),
      updatedDay,
    ]);

    setSelectedWeekDay(updatedDay);
  };

  const handleAddPeriodInSchedule = ({ start, end }: { start: string; end: string }) => {
    if (!selectedWeekDay) return;

    const updatedDay = {
      ...selectedWeekDay,
      schedules: [...(selectedWeekDay.schedules || []), { start, end, isAvalilable: true }],
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

  const handleScheduleTimeChange = (v: PickerValue, position: TimePosition, index: number) => {
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
          {selectedWeekDay && (
            <DayPeriodSelector
              selectedWeekDay={selectedWeekDay}
              onDayPeriodChange={handlePeriodChange}
            />
          )}
        </Grid>

        <Divider sx={{ width: '100%', mb: 1, mt: 2 }} />
        {selectedWeekDay ? (
          <>
            <Grid container size={12} columnSpacing={2} alignItems={'center'}>
              <ManualScheduleControl
                selectedWeekDay={selectedWeekDay}
                handleAdd={handleAddPeriodInSchedule}
                handleClear={handleClearAllSchedules}
              />
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
                  .filter(i => i.schedules.length)
                  .map(day =>
                    day?.dayValue ? <SummaryDayItem key={day.dayValue} dayData={day} /> : null,
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
