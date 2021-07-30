import React, { useEffect, useState } from 'react';
import Form from '../Form';
import ProductTable from '../ProductTable';
import firebase from '../../Firebase/firebase';


const ref = firebase.firestore().collection('Products');

export default function App() {
  const [editIdx, setEditIdx] = useState(-1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    title: '',
    description: '',
    price: 0,
    quantity: 0,
  });

  const [orderDirection, setOrderDirection] = useState('asc');
  const [valueToOrderBy, setValueToOrderBy] = useState(null);

  const handleRequestSort = (event, property) => {
    const isAscending = valueToOrderBy === property && orderDirection === 'asc';
    setValueToOrderBy(property);
    setOrderDirection(isAscending ? 'desc' : 'asc');
  };

  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property);
  };
  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
   
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const sortedRowInformation = (rowArray, comparator) => {
    const stabilizedRowArray = rowArray.map((el, index) => [el, index]);

    stabilizedRowArray.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) return order;
      return a[1] - b[1];
    });
    return stabilizedRowArray.map((el) => el[0]);
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
