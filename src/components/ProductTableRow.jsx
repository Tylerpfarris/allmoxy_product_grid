import { TableCell, TableRow, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';

import React from 'react';

export default function ProductTableRow({
  header,
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
                onChange={(event) =>
                  handleChange(event, y.prop, index, product)
                }
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
          <EditIcon onClick={() => handleEdit(index)} />
        )}
      </TableCell>
      <TableCell>
        <DeleteIcon onClick={() => handleDelete(product)} />
      </TableCell>
    </TableRow>
  );
}
