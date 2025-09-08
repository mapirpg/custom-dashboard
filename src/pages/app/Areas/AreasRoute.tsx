import React from 'react';
import AreasView from './AreasView';
import AreasController from './AreasController';

const AreasRoute = React.memo(() => {
  const props = AreasController();

  return <AreasView {...props} />;
});

AreasRoute.displayName = 'AreasRoute';
export default AreasRoute;
