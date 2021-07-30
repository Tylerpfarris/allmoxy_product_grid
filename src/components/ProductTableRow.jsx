import React from 'react';
import PropTypes from 'prop-types';

import { TableCell, TableRow, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';

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

  return (
    <TableRow TableRow key={`tr-${index}`}>
      {headers.map((header, k) =>
        header.prop === 'img' ? (
          <TableCell key={`trc-${k}`}>
            <img width="150px" src={product[header.prop]} alt="" />
          </TableCell>
        ) : (
          <TableCell TableCell key={`trc-${k}`}>
            {currentlyEditing ? (
              <TextField
                name={header.prop}
                onChange={(event) =>
                  handleChange(event, header.prop, index, product)
                }
                value={product[header.prop]}
              />
            ) : (
              product[header.prop]
            )}
          </TableCell>
        )
      )}
      <TableCell>
        {currentlyEditing ? (
          <CheckIcon onClick={() => handleStopEdit(product)} />
        ) : (
          <EditIcon onClick={() => handleEdit(index)} />
        )}
      </TableCell>
      <TableCell>
        <DeleteIcon onClick={() => handleDelete(product)} />
      </TableCell>
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
