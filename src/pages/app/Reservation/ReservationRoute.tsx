import React from 'react';
import ReservationView from './ReservationView';
import ReservationController from './ReservationController';

const ReservationRoute = React.memo(() => {
  const props = ReservationController();

  return <ReservationView {...props} />;
});

ReservationRoute.displayName = 'ReservationRoute';
export default ReservationRoute;
