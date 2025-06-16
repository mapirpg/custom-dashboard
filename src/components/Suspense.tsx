import React, { Suspense } from 'react';
import { LoadingScreen } from '@components/Loading';
import Container from './Container';

const DialogModal = React.lazy(() => import('./DialogModal'));

const SuspenseComponents = () => {
  return (
    <Suspense
      fallback={
        <Container>
          <LoadingScreen />
        </Container>
      }
    >
      <DialogModal />
    </Suspense>
  );
};

export default SuspenseComponents;
