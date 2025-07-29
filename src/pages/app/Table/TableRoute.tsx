import React from 'react';
import TableView from './TableView';
import TableController from './TableController';

const TableRoute = React.memo(() => {
  const props = TableController();

  return <TableView {...props} />;
});

TableRoute.displayName = 'TableRoute';
export default TableRoute;
