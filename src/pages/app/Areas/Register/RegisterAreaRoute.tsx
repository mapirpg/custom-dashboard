import React from 'react';
import RegisterAreaController from './RegisterAreaController';
import RegisterAreaView from './RegisterAreaView';

const RegisterAreaRoute = React.memo(() => {
  const props = RegisterAreaController();

  return <RegisterAreaView {...props} />;
});

RegisterAreaRoute.displayName = 'RegisterAreaRoute';
export default RegisterAreaRoute;
