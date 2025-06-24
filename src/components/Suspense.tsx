import React, { Suspense } from 'react';
import { LoadingScreen } from '@components/Loading';
import AppContainer from './AppContainer';

const DialogModal = React.lazy(() => import('./DialogModal'));

const SuspenseComponents = () => {
  return (
    <Suspense
      fallback={
        <AppContainer>
          <LoadingScreen />
        </AppContainer>
      }
    >
      <DialogModal />
    </Suspense>
  );
};

export default SuspenseComponents;
