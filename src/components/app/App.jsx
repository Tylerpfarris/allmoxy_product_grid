import React from 'react';
import Form from '../Form';
import ProductTable from '../ProductTable';
import { handleDelete } from '../../Firebase/firebase';
import { useSort } from '../../hooks/useSort';
import { useProductFetch } from '../../hooks/useProductFetch';
import { useUpdateProduct } from '../../hooks/useUpdateProduct';
import { tableHeaders } from '../../utils/tableHeaders';

export default function App() {
  const {
    sortedRowInformation,
    getComparator,
    createSortHandler,
    orderDirection,
    valueToOrderBy,
  } = useSort();

  const { loading, products, setProducts } = useProductFetch();

  const { handleChange, handleStopEdit, handleEdit, editIdx } =
    useUpdateProduct(products, setProducts);

  if (loading) return <h1>Loading...</h1>;
  return (
    <div>
      <Form />
      <ProductTable
        handleDelete={handleDelete}
        handleStopEdit={handleStopEdit}
        handleEdit={handleEdit}
        editIdx={editIdx}
        handleChange={handleChange}
        products={sortedRowInformation(
          products,
          getComparator(orderDirection, valueToOrderBy)
        )}
        orderDirection={orderDirection}
        createSortHandler={createSortHandler}
        valueToOrderBy={valueToOrderBy}
        headers={tableHeaders}
      />
    </div>
  );
}
