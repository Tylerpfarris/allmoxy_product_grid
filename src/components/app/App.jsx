import React, { useEffect, useState } from 'react';
import Form from '../Form';
import Table2 from '../Table2';
import firebase from '../../Firebase/firebase';
import { orderBy } from 'lodash';

const ref = firebase.firestore().collection('Products');

export default function App() {
  const [editIdx, setEditIdx] = useState(-1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortDirection, setSortDirection] = useState('desc');
  const [columnToSort, setColumnToSort] = useState('');
  const [updatedProduct, setUpdatedProduct] = useState({
    title: '',
    description: '',
    price: 0,
    quantity: 0,
  });

  const invertDirection = {
    asc: 'desc',
    desc: 'asc',
  };

  const getProducts = () => {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });
      setProducts(items);
      setLoading(false);
    });
  };
  useEffect(() => {
    getProducts();
  }, []);

  const updateProduct = async (id, updates) => {
    await firebase.firestore().collection('Products').doc(id).update(updates);
    const doc = await firebase.firestore().collection('Products').doc(id).get();
    const product = {
      id: doc.id,
      ...doc.data(),
    };
    return product;
  };

  const handleChange = (event, name, i, product) => {
    const { value } = event.target;
    const pro = products.map((row, j) =>
      j === i ? { ...row, [name]: value } : row
    );

    setUpdatedProduct({
      title: name === 'title' ? value : product.title,
      description: name === 'description' ? value : product.description,
      price: name === 'price' ? value : product.price,
      quantity: name === 'quantity' ? value : product.quantity,
    });
    setProducts(pro);
  };

  const handleStopEdit = (product) => {
    updateProduct(product.id, updatedProduct);
    setEditIdx(-1);
  };
  const handleEdit = (i) => {
    setEditIdx(i);
  };

  const handleDelete = (product) => {
    console.log(product);
    firebase
      .firestore()
      .collection('Products')
      .doc(product.id)
      .delete()
      .catch((error) => console.log(error));
  };

  const handleSort = (columnName) => {
    console.log(columnName);
    setColumnToSort(columnName);
    setSortDirection(
      columnToSort === columnName ? invertDirection[sortDirection] : 'asc'
    );
  };
  if (loading) return <h1>Loading...</h1>;
  return (
    <div>
      <Form />
      <Table2
        handleSort={handleSort}
        handleDelete={handleDelete}
        handleStopEdit={handleStopEdit}
        handleEdit={handleEdit}
        editIdx={editIdx}
        handleChange={handleChange}
        columnToSort={columnToSort}
        sortDirection={sortDirection}
        products={orderBy(products, columnToSort, sortDirection)}
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
    </div>
  );
}
