import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';

import ProductTableRow from './ProductTableRow';
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function ProductTable({
  header,
  handleDelete,
  handleStopEdit,
  handleEdit,
  editIdx,
  handleChange,
  products,
  valueToOrderBy,
  orderDirection,
  createSortHandler,
}) {
  const classes = useStyles();


  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            {header.map((product, i) => (
              <TableCell align="center" key={i}>
                <TableSortLabel
                  active={valueToOrderBy === product.prop}
                  direction={
                    valueToOrderBy === product.prop ? orderDirection : 'asc'
                  }
                  onClick={createSortHandler(product.prop)}
                >
                  {/* <div onClick={() => handleSort(product.prop)}>
                  </div> */}
                  {product.name}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product, index) => (
            // row(
            //   product,
            //   i,
            //   header,
            //   handleDelete,
            //   handleEdit,
            //   editIdx,
            //   handleChange,
            //   handleStopEdit
            // )
            <ProductTableRow
              key={index}
              header={header}
              product={product}
              handleChange={handleChange}
              handleStopEdit={handleStopEdit}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              index={index}
              editIdx={editIdx}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
