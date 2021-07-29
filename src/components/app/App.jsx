import React from 'react';
import Form from '../Form';

import Table from '../Table';
import TableMat from '../TableMat';
import Table2 from '../Table2';

export default function App() {
  return (
    <div>
      <Form />
      {/* <Table /> */}
      <Table2
        header={[
          {
            name: 'Title',
            prop: 'title',
          },
          {
            name: 'Description',
            prop: 'description',
          },
          {
            name: 'Price',
            prop: 'price',
          },
          {
            name: 'Quantity',
            prop: 'quantity',
          },
          {
            name: 'Image',
            prop: 'img',
          },
        ]}
      />
      {/* <TableMat/> */}
    </div>
  );
}
