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

import firebase from '../Firebase/firebase';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable({ header }) {
  const classes = useStyles();
  const [editIdx, setEditIdx] = useState('');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [editIdx, setEditIdx]
  const ref = firebase.firestore().collection('Products');
  //   console.log(selected);
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

  const handleEdit = (product) => {
    console.log(product);
    setEditIdx(product.title);
    console.log(editIdx);
    firebase
      .firestore()
      .collection('Products')
      .doc(product.title)
      .update({
        title: 'Kiwiwiw',
      })
      .catch((error) => console.log(error));
  };
  const handleDelete = (product) => {
    console.log(product);
    firebase
      .firestore()
      .collection('Products')
      .doc(product.title)
      .delete()
      .catch((error) => console.log(error));
  };

  //   const currentlyEditing = editIdx === product.title;

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
          {products.map((product, i) => (
            <TableRow key={`tr-${i}`}>
              {header.map((y, k) =>
                y.prop === 'img' ? (
                  <TableCell key={`trc-${k}`}>
                    <img width="150px" src={product[y.prop]} alt="" />
                  </TableCell>
                ) : (
                  <TableCell TableCell key={`trc-${k}`}>
                    {product[y.prop]}
                  </TableCell>
                )
              )}
            </TableRow>
          ))}

          {/* // <TableRow key={j}>
            //   <TableCell component="th" scope="product">
            //     {product.title}
            //   </TableCell>
            //   <TableCell align="right">{product.description}</TableCell>
            //   <TableCell align="right">${product.price}</TableCell>
            //   <TableCell align="right">{product.quantity}</TableCell>
            //   <TableCell align="right">
            //     {' '}
            //     <img width="150px" src={product.img} alt="" />
            //   </TableCell>
            //   <TableCell>
            //     <EditIcon onClick={() => handleEdit(product)} />
            //   </TableCell>
            //   <TableCell>
            //     <DeleteIcon onClick={() => handleDelete(product)} />
            //   </TableCell>
            // </TableRow> */}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
