import React, { Suspense } from 'react';

const DialogModal = React.lazy(() => import('./DialogModal'));

const SuspenseComponents = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DialogModal />
    </Suspense>
  );
};

export default SuspenseComponents;
