import React from 'react';
import PropTypes from 'prop-types';
import ProductTableRow from './ProductTableRow';

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  makeStyles,
  Box,
} from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 200,
  },
});

export default function ProductTable({
  headers,
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
    <Box style={{ margin: '5rem', marginTop: '1rem' }}>
      <TableContainer component={Paper}>
        <Table
          stickyHeader
          className={classes.table}
          aria-label="product-table"
        >
          <TableHead style={{ border: 'none' }}>
            <TableRow>
              {headers.map((product, i) => (
                <TableCell align="left" key={i} style={{ width: 'auto' }}>
                  {product.prop === 'edit' ? (
                    product.name
                  ) : (
                    <TableSortLabel
                      active={valueToOrderBy === product.prop}
                      direction={
                        valueToOrderBy === product.prop ? orderDirection : 'asc'
                      }
                      onClick={createSortHandler(product.prop)}
                    >
                      {product.name}
                    </TableSortLabel>
                  )}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => (
              <ProductTableRow
                key={index}
                headers={headers}
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
    </Box>
  );
}

ProductTable.propTypes = {
  headers: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleStopEdit: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  editIdx: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      price: PropTypes.isRequired,
      quantity: PropTypes.isRequired,
      img: PropTypes.string.isRequired,
    })
  ).isRequired,
  valueToOrderBy: PropTypes.string.isRequired,
  orderDirection: PropTypes.string.isRequired,
  createSortHandler: PropTypes.func.isRequired,
};
