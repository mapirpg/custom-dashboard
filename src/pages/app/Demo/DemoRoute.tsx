import React from 'react';
import DemoView from './DemoView';
import DemoController from './DemoController';

const DemoRoute = React.memo(() => {
  const props = DemoController();

  return <DemoView {...props} />;
});

DemoRoute.displayName = 'DemoRoute';
export default DemoRoute;
