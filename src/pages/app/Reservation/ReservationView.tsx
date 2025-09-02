import PageContainer from '@components/PageContainer';
import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const AreaItem = ({ area }) => {
  const [isHovered, setIsHovered] = useState(false);

  const style = {
    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
    transition: 'transform 0.3s ease',
  };

  return (
    <Box
      sx={{
        width: '300px',
        cursor: 'pointer',
        margin: '16px',
        ':hover': {
          transform: 'scale(1.05)',
          boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
        },
      }}
      // onHoverStart={() => setIsHovered(true)}
      // onHoverEnd={() => setIsHovered(false)}
      // key={area.name}
      // style={{ width: '300px', ...style }}
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
          <Box sx={{ display: 'flex', alignItems: 'center', marginTop: '8px' }}>
            {/* <Description fontSize="small" sx={{ marginRight: '4px' }} /> */}
            {/* <Typography variant="body2" color="textSecondary">
                      {area.avaliability
                        .map(day => (
                          <span key={day.weekDay}>
                            {day.weekDay.charAt(0).toUpperCase() + day.weekDay.slice(1)}:{' '}
                            {day.schedules.map(slot => `${slot.start} - ${slot.end}`).join(', ')}
                          </span>
                        ))
                        .reduce((prev, curr) => [prev, ', ', curr])}
                    </Typography> */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

const ReservationView = () => {
  const { t } = useTranslation();

  const commonAreas = [
    {
      img: 'https://tuacasa.uol.com.br/wp-content/uploads/2016/08/piscinas-capa-0.jpeg',
      name: 'Piscina',
      description: 'Piscina adulto e infantil',
      avaliability: [
        {
          weekDay: 'tue',
          schedules: [
            { start: '08:00', end: '12:00' },
            { start: '14:00', end: '18:00' },
          ],
        },
      ],
    },
    {
      img: 'https://www.catering.com.br/site/article/10713/8621/salao-de-festas-dicas-importantes-para-locacao-0_ai1.jpg',
      name: 'Salão de Festas',
      description: 'Salão de festas com churrasqueira',
      avaliability: [
        {
          weekDay: 'fri',
          schedules: [{ start: '18:00', end: '23:00' }],
        },
        {
          weekDay: 'sat',
          schedules: [{ start: '10:00', end: '23:00' }],
        },
        {
          weekDay: 'sun',
          schedules: [{ start: '10:00', end: '22:00' }],
        },
      ],
    },
  ];

  return (
    <PageContainer
      header={<Typography variant="h4">{t('reservations')}</Typography>}
      content={
        <Box sx={{ overflowY: 'auto' }}>
          {commonAreas.map(area => (
            <AreaItem area={area} key={area.name} />
          ))}
        </Box>
      }
    />
  );
};

export default ReservationView;
