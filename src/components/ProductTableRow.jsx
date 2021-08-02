import React from 'react';
import PropTypes from 'prop-types';

import {
  TableCell,
  TableRow,
  TextField,
  Input,
  Drawer,
  Button,
  Menu,
  MenuItem,
  Box,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import { useUpdateProduct } from '../hooks/useUpdateProduct';

export default function ProductTableRow({
  headers,
  product,
  handleChange,
  handleStopEdit,
  handleDelete,
  handleEdit,
  index,
  editIdx,
}) {
  const currentlyEditing = editIdx === index;
  const { handleImgUpdate } = useUpdateProduct();
  return (
    <TableRow key={`tr-${index}`} style={{ height: '9rem' }}>
      {headers.map((header, k) =>
        header.prop === 'edit' ? (
          <TableCell
            style={{
              width: '.5rem',
              backgroundColor: '#FAFAFA',
            }}
          >
            {currentlyEditing ? (
              <CheckIcon
                color="secondary"
                style={{ cursor: 'pointer', color: '#06E32C' }}
                onClick={() => handleStopEdit(product)}
              />
            ) : (
              <EditIcon
                color="action"
                style={{ cursor: 'pointer' }}
                onClick={() => handleEdit(index, product)}
              />
            )}
            <DeleteIcon
              style={{ cursor: 'pointer', paddingTop: '1rem' }}
              onClick={() => handleDelete(product)}
              color="action"
            />
          </TableCell>
        ) : header.prop === 'img' ? (
          <TableCell key={`trc-${k}`}>
            {currentlyEditing ? (
              <TextField
                required
                name={header.prop}
                type="file"
                onChange={(e) => handleImgUpdate(e, product)}
              />
            ) : (
              <img
                style={{ maxHeight: '100px' }}
                width="auto"
                src={product[header.prop]}
                alt={product.title}
              />
            )}
          </TableCell>
        ) : (
          <TableCell TableCell key={`trc-${k}`}>
            {currentlyEditing ? (
              <TextField
                required
                name={header.prop}
                onChange={(event) =>
                  handleChange(event, header.prop, index, product)
                }
                value={product[header.prop]}
              />
            ) : header.prop === 'price' ? (
              `$${product[header.prop]}`
            ) : (
              product[header.prop]
            )}
          </TableCell>
        )
      )}
    </TableRow>
  );
}

ProductTableRow.propTypes = {
  headers: PropTypes.array.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleStopEdit: PropTypes.func.isRequired,
  handleEdit: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  editIdx: PropTypes.number.isRequired,
  handleChange: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
};
