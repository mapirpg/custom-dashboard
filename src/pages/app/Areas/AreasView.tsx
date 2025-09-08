import PageContainer from '@components/PageContainer';
import { Box, Button, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import dayjs, { Dayjs } from 'dayjs';
import { useRouter } from '@hooks';
import { Outlet } from 'react-router-dom';
import { Area } from '@data/interfaces/area';

const isDayAvailable = (date: Dayjs, selectedArea: Area | null): boolean => {
  if (!selectedArea) return false;

  const { avaliability } = selectedArea;

  const periodStart = dayjs(avaliability.period.start);
  const periodEnd = dayjs(avaliability.period.end);

  if (date.isBefore(periodStart) || date.isAfter(periodEnd)) {
    return false;
  }

  const isFullyReserved = avaliability.reseved.some(
    reserved => dayjs(reserved.date).isSame(date, 'day') && reserved.isDateFullReserved,
  );

  if (isFullyReserved) {
    return false;
  }

  const dayOfWeek = date.format('ddd').toLowerCase();
  const weekAvailability = avaliability.week.find(w => w.day === dayOfWeek);

  return weekAvailability ? weekAvailability.schedules.some(s => s.isAvalilable) : false;
};

const isDayPartiallyReserved = (date: Dayjs, selectedArea: Area | null): boolean => {
  if (!selectedArea) return false;

  return selectedArea.avaliability.reseved.some(
    reserved => dayjs(reserved.date).isSame(date, 'day') && !reserved.isDateFullReserved,
  );
};

const getReservedSchedules = (
  date: Dayjs,
  selectedArea: Area,
): { start: string; end: string }[] => {
  const reservedForDate = selectedArea.avaliability.reseved.find(reserved =>
    dayjs(reserved.date).isSame(date, 'day'),
  );

  return reservedForDate ? reservedForDate.schedules : [];
};

const isScheduleReserved = (
  schedule: { start: string; end: string },
  reservedSchedules: { start: string; end: string }[],
) => {
  return reservedSchedules.some(
    reserved => reserved.start === schedule.start && reserved.end === schedule.end,
  );
};

const AreaItem = ({
  area,
  onClick,
  onHover,
  selectedArea,
}: {
  area: Area;
  selectedArea: Area | null;
  onClick: (area: Area | null) => void;
  onHover: (area: Area | null) => void;
}) => {
  const isSelected = selectedArea?.name === area.name;

  return (
    <Box
      sx={{
        width: '300px',
        cursor: 'pointer',
        margin: '16px',
        borderRadius: '8px',
        transition: 'transform 0.2s, box-shadow 0.2s',
        boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.3)' : 'none',
        transform: isSelected ? 'scale(1.05)' : 'scale(1)',
        backgroundColor: isSelected ? '#f0f0f0' : '#fff',
        ':hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        },
      }}
      onClick={() => onClick(isSelected ? null : area)}
      onMouseEnter={() => onHover(area)}
      onMouseLeave={() => !selectedArea && onHover(null)}
    >
      <Box
        sx={{
          border: '1px solid #ccc',
          overflow: 'hidden',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}
      >
        <img
          src={area.img}
          alt={area.name}
          style={{ width: '100%', height: '100px', objectFit: 'cover' }}
        />
        <Box sx={{ pl: 2 }}>
          <Typography textAlign="left" variant="h6" gutterBottom>
            {area.name}
          </Typography>
          <Typography textAlign="left" variant="body2" color="textSecondary" gutterBottom>
            {area.description}
          </Typography>
        </Box>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}></Box>
        </Box>
      </Box>
    </Box>
  );
};

const CustomDay = ({
  selectedArea,
  onDaySelected,
  ...props
}: PickersDayProps & { selectedArea: Area | null; onDaySelected: (date: Dayjs) => void }) => {
  const { day, outsideCurrentMonth, ...other } = props;

  if (!selectedArea || outsideCurrentMonth) {
    return <PickersDay {...other} day={day} outsideCurrentMonth={outsideCurrentMonth} />;
  }

  const isAvailable = isDayAvailable(day, selectedArea);
  const isPartiallyReserved = isDayPartiallyReserved(day, selectedArea);

  let dayStyles = {};

  if (isAvailable && !isPartiallyReserved) {
    dayStyles = {
      backgroundColor: '#4caf50',
      color: 'white',
      '&:hover': {
        backgroundColor: '#45a049',
      },
    };
  } else if (isAvailable && isPartiallyReserved) {
    dayStyles = {
      backgroundColor: '#ff9800',
      color: 'white',
      '&:hover': {
        backgroundColor: '#f57c00',
      },
    };
  } else {
    const { avaliability } = selectedArea;
    const periodStart = dayjs(avaliability.period.start);
    const periodEnd = dayjs(avaliability.period.end);
    const isInPeriod = !day.isBefore(periodStart) && !day.isAfter(periodEnd);

    const dayOfWeek = day.format('ddd').toLowerCase();
    const hasWeekRule = avaliability.week.some(w => w.day === dayOfWeek);

    const isReserved = avaliability.reseved.some(reserved =>
      dayjs(reserved.date).isSame(day, 'day'),
    );

    if (isInPeriod && (hasWeekRule || isReserved)) {
      dayStyles = {
        backgroundColor: '#f44336',
        color: 'white',
        '&:hover': {
          backgroundColor: '#d32f2f',
        },
      };
    }
  }

  return (
    <PickersDay
      onClick={() => onDaySelected(day)}
      {...other}
      day={day}
      outsideCurrentMonth={outsideCurrentMonth}
      sx={dayStyles}
    />
  );
};

const ScheduleList = ({
  selectedDate,
  selectedArea,
}: {
  selectedDate: Dayjs | null;
  selectedArea: Area | null;
}) => {
  const { t } = useTranslation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {selectedArea && selectedDate ? (
        <>
          <Typography variant="h6" gutterBottom>
            {t('selectedDate')}: {selectedDate.format('DD/MM/YYYY')}
          </Typography>
          <Typography variant="h6" gutterBottom>
            {t('availableSchedules')}:
          </Typography>
          <Box sx={{ width: '300px', marginLeft: '16px' }}>
            {selectedDate && selectedArea ? (
              <>
                <Typography variant="h6" gutterBottom>
                  {t('selectedDate')}: {selectedDate.format('DD/MM/YYYY')}
                </Typography>
                <Typography variant="h6" gutterBottom>
                  {t('schedules')}:
                </Typography>
                <Box>
                  {(() => {
                    const dayOfWeek = selectedDate.format('ddd').toLowerCase();
                    const weekSchedules =
                      selectedArea.avaliability.week.find(w => w.day === dayOfWeek)?.schedules ||
                      [];

                    const reservedSchedules = getReservedSchedules(selectedDate, selectedArea);

                    if (weekSchedules.length === 0) {
                      return <Typography>{t('noSchedulesConfigured')}</Typography>;
                    }

                    return weekSchedules.map((schedule, index) => {
                      const isReserved = isScheduleReserved(schedule, reservedSchedules);
                      const isAvailable = schedule.isAvalilable && !isReserved;

                      return (
                        <Box
                          key={index}
                          sx={{
                            mb: 1,
                            p: 1,
                            borderRadius: 1,
                            cursor: isAvailable ? 'pointer' : 'not-allowed',
                            backgroundColor: isReserved
                              ? '#ffebee'
                              : isAvailable
                                ? '#e8f5e8'
                                : '#f5f5f5',
                            border: isReserved
                              ? '1px solid #f44336'
                              : isAvailable
                                ? '1px solid #4caf50'
                                : '1px solid #ccc',
                            opacity: isAvailable ? 1 : 0.6,
                            '&:hover': isAvailable
                              ? {
                                  backgroundColor: '#c8e6c9',
                                  transform: 'scale(1.02)',
                                }
                              : {},
                            transition: 'all 0.2s ease',
                          }}
                        >
                          <Typography
                            sx={{
                              color: isReserved ? '#d32f2f' : isAvailable ? '#2e7d32' : '#666',
                              fontWeight: isAvailable ? 'bold' : 'normal',
                            }}
                          >
                            {schedule.start} - {schedule.end}
                            {isReserved && ' (Reservado)'}
                            {!schedule.isAvalilable && !isReserved && ' (Indisponível)'}
                          </Typography>
                        </Box>
                      );
                    });
                  })()}
                </Box>
              </>
            ) : (
              <Typography variant="h6">{t('selectDateAndArea')}</Typography>
            )}
          </Box>
        </>
      ) : (
        <Typography variant="h6">{t('selectDateAndArea')}</Typography>
      )}
    </Box>
  );
};

const AreasView = () => {
  const isChildRoute = location.pathname !== '/areas';

  const { t } = useTranslation();
  const [selectedArea, setSelectedArea] = useState<Area | null>(null);
  const [hoveredArea, setHoveredArea] = useState<Area | null>(null);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [calendarValue, setCalendarValue] = useState<Dayjs>(dayjs());
  const { navigateTo } = useRouter();

  const handleSelectArea = (area: Area | null) => {
    setSelectedArea(area);
    setSelectedDate(dayjs());
    setCalendarValue(dayjs());
  };

  const handleHoverArea = (area: Area | null) => {
    setHoveredArea(area);

    if (!selectedArea) {
      setSelectedDate(dayjs());
      setCalendarValue(dayjs());
    }
  };

  const commonAreas: Area[] = [
    {
      img: 'https://tuacasa.uol.com.br/wp-content/uploads/2016/08/piscinas-capa-0.jpeg',
      name: 'Piscina',
      description: 'Piscina adulto e infantil',
      avaliability: {
        period: { start: '2025-01-01', end: '2025-01-12' },
        reseved: [
          {
            date: '2025-02-09',
            schedules: [{ start: '08:00', end: '12:00' }],
            isDateFullReserved: false,
          },
        ],
        week: [
          {
            day: 'tue',
            dayValue: 2,
            schedules: [
              { start: '08:00', end: '12:00', isAvalilable: true },
              { start: '14:00', end: '18:00', isAvalilable: true },
            ],
          },
        ],
      },
    },
    {
      img: 'https://www.catering.com.br/site/article/10713/8621/salao-de-festas-dicas-importantes-para-locacao-0_ai1.jpg',
      name: 'Salão de Festas',
      description: 'Salão de festas com churrasqueira',
      avaliability: {
        period: { start: '2025-01-01', end: '2025-12-31' },
        reseved: [
          {
            date: '2025-09-12',
            schedules: [{ start: '18:00', end: '23:00' }],
            isDateFullReserved: true,
          },
        ],
        week: [
          {
            day: 'fri',
            dayValue: 6,
            schedules: [{ start: '18:00', end: '23:00', isAvalilable: true }],
          },
          {
            day: 'sat',
            dayValue: 7,
            schedules: [{ start: '10:00', end: '23:00', isAvalilable: true }],
          },
          {
            day: 'sun',
            dayValue: 1,
            schedules: [{ start: '10:00', end: '22:00', isAvalilable: true }],
          },
        ],
      },
    },
    {
      img: 'https://pictures.smartfit.com.br/8239/big/smart-fit-blumenau-musculacao.jpg?1598465112',
      name: 'Academia',
      description: 'Academia equipada',
      avaliability: {
        period: { start: '2025-01-01', end: '2025-12-31' },
        reseved: [],
        week: [
          {
            day: 'mon',
            dayValue: 1,
            schedules: [
              { start: '06:00', end: '12:00', isAvalilable: true },
              { start: '14:00', end: '22:00', isAvalilable: true },
            ],
          },
          {
            day: 'tue',
            dayValue: 2,
            schedules: [
              { start: '06:00', end: '12:00', isAvalilable: true },
              { start: '14:00', end: '22:00', isAvalilable: true },
            ],
          },
          {
            day: 'wed',
            dayValue: 3,
            schedules: [
              { start: '06:00', end: '12:00', isAvalilable: true },
              { start: '14:00', end: '22:00', isAvalilable: true },
            ],
          },
          {
            day: 'thu',
            dayValue: 4,
            schedules: [
              { start: '06:00', end: '12:00', isAvalilable: true },
              { start: '14:00', end: '22:00', isAvalilable: true },
            ],
          },
          {
            day: 'fri',
            dayValue: 5,
            schedules: [
              { start: '06:00', end: '12:00', isAvalilable: true },
              { start: '14:00', end: '22:00', isAvalilable: true },
            ],
          },
        ],
      },
    },
  ];

  return isChildRoute ? (
    <Outlet />
  ) : (
    <>
      <PageContainer
        header={
          <Box
            sx={{
              display: 'flex',
              width: 'full',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography variant="h4">{t('common_areas')}</Typography>
            <Button
              onClick={() => {
                navigateTo('/areas/register');
              }}
              variant="outlined"
            >
              {t('add')}
            </Button>
          </Box>
        }
        content={
          <Box sx={{ display: 'flex', direction: 'row' }}>
            <Box sx={{ overflowY: 'auto' }}>
              {commonAreas.map(area => (
                <AreaItem
                  area={area}
                  key={area.name}
                  selectedArea={selectedArea}
                  onClick={handleSelectArea}
                  onHover={handleHoverArea}
                />
              ))}
            </Box>
            <Box sx={{ flex: 1 }}>
              <DateCalendar
                value={calendarValue}
                onChange={newValue => setCalendarValue(newValue || dayjs())}
                disableHighlightToday
                maxDate={selectedArea ? dayjs(selectedArea.avaliability.period.end) : undefined}
                minDate={selectedArea ? dayjs(selectedArea.avaliability.period.start) : undefined}
                slots={{
                  day: props =>
                    CustomDay({
                      selectedArea: selectedArea || hoveredArea,
                      onDaySelected: setSelectedDate,
                      ...props,
                    }),
                }}
              />
            </Box>
            <Box
              sx={{ flex: 1, marginRight: '16px', alignItems: 'center', justifyContent: 'center' }}
            >
              <ScheduleList
                selectedDate={selectedDate}
                selectedArea={selectedArea || hoveredArea}
              />
            </Box>
          </Box>
        }
      />
    </>
  );
};

export default AreasView;
