import React from 'react';
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
import { TextField } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function BasicTable({
  header,
  handleSort,
  handleDelete,
  handleStopEdit,
  handleEdit,
  editIdx,
  handleChange,
  products,
}) {
  const classes = useStyles();

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

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {header.map((product, i) => (
              <TableCell align="center" key={i}>
                <div onClick={() => handleSort(product.prop)}>
                  {product.name}
                </div>
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
