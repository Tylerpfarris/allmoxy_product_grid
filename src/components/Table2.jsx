import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';

import firebase from '../Firebase/firebase';
import { TextField } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable({ header }) {
  const classes = useStyles();
  const [editIdx, setEditIdx] = useState(-1);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState({
    title: '',
    description: '',
    price: 0,
    quantity: 0,
  });

  const ref = firebase.firestore().collection('Products');
  console.log(ref);
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
    console.log(product.id);
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

  const row = (
    product,
    i,
    header,
    handleDelete,
    handleEdit,
    editIdx,
    handleChange,
    handleStopEdit
  ) => {
    const currentlyEditing = editIdx === i;
    return (
      <TableRow key={`tr-${i}`}>
        {header.map((y, k) =>
          y.prop === 'img' ? (
            <TableCell key={`trc-${k}`}>
              <img width="150px" src={product[y.prop]} alt="" />
            </TableCell>
          ) : (
            <TableCell TableCell key={`trc-${k}`}>
              {currentlyEditing ? (
                <TextField
                  name={y.prop}
                  onChange={(event) => handleChange(event, y.prop, i, product)}
                  value={product[y.prop]}
                />
              ) : (
                product[y.prop]
              )}
            </TableCell>
          )
        )}
        <TableCell>
          {currentlyEditing ? (
            <CheckIcon onClick={() => handleStopEdit(product)} />
          ) : (
            <EditIcon onClick={() => handleEdit(i)} />
          )}
        </TableCell>
        <TableCell>
          <DeleteIcon onClick={() => handleDelete(product)} />
        </TableCell>
      </TableRow>
    );
  };

  if (loading) return <h1>Loading...</h1>;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {header.map((product, i) => (
              <TableCell align="center" key={i}>
                {product.name}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, i) =>
            row(
              product,
              i,
              header,
              handleDelete,
              handleEdit,
              editIdx,
              handleChange,
              handleStopEdit
            )
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
