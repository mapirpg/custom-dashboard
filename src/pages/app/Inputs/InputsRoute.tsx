import React from 'react';
import InputsView from './InputsView';
import InputsController from './InputsController';

const InputsRoute = React.memo(() => {
  const props = InputsController();

  return <InputsView {...props} />;
});

InputsRoute.displayName = 'InputsRoute';
export default InputsRoute;
