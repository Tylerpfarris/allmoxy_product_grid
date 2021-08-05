import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { TableCell, TableRow, TextField } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import CheckIcon from '@material-ui/icons/Check';
import { useUpdateProduct } from '../hooks/useUpdateProduct';
import { useInputErrorCheck } from '../hooks/useInputErrorCheck';
import styles from '../styles.module.css';

import Alert from '@material-ui/lab/Alert';

export default function ProductTableRow({
  headers,
  product,
  handleChange,
  handleStopEdit,
  handleDelete,
  handleEdit,
  index,
}) {
  const [editToggle, setEditToggle] = useState(false);

  const currentlyEditing = editToggle;
  const { handleImgUpdate } = useUpdateProduct();
  const { inputErrorCheck, setInputError, inputError, header } =
    useInputErrorCheck();

  return (
    <>
      {inputError && (
        <Alert
          style={{
            position: 'absolute',
          }}
          variant="filled"
          severity="error"
        >
          {header === 'price'
            ? 'incorrect price value, numbers and decimals only'
            : 'incorrect quantity value, numbers and decimals only'}
        </Alert>
      )}
      <TableRow key={`tr-${index}`} style={{ height: '9rem', width: '100vw' }}>
        {headers.map((header, k) =>
          header.prop === 'edit' ? (
            <TableCell
              key={`tc-${indexedDB}`}
              style={{
                width: '.5rem',
                backgroundColor: '#FAFAFA',
              }}
            >
              {currentlyEditing ? (
                <CheckIcon
                  className={styles.icons}
                  color="secondary"
                  style={{ cursor: 'pointer', color: '#21BA4C' }}
                  onClick={(e) => {
                    setEditToggle((prev) => !prev);
                    setInputError(false);
                    handleStopEdit(product, index, header.name, e);
                  }}
                />
              ) : (
                <EditIcon
                  className={styles.icons}
                  color="action"
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setEditToggle((prev) => !prev);
                    handleEdit(index, product);
                  }}
                />
              )}
              <DeleteIcon
                data-testid={'deleteIcon'}
                className={styles.deleteIcon}
                style={{ cursor: 'pointer', paddingTop: '1rem' }}
                onClick={() => handleDelete(product)}
                color="action"
              />
            </TableCell>
          ) : header.prop === 'img' ? (
            <TableCell key={`trc-${k}`}>
              {currentlyEditing ? (
                <TextField
                  required={true}
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
          ) : header.prop === 'price' || header.prop === 'quantity' ? (
            <TableCell key={`trc-${k}`}>
              {currentlyEditing ? (
                <TextField
                  required={true}
                  name={header.prop}
                  type="text"
                  pattern="^[0-9]*\.?[0-9]*$"
                  onChange={(event) => {
                    inputErrorCheck(event, header.prop);
                    handleChange(event, header.prop, index, product);
                  }}
                  value={product[header.prop]}
                  error={false}
                />
              ) : header.prop === 'price' ? (
                `$ ${product[header.prop]}`
              ) : (
                `${product[header.prop]} lb`
              )}
            </TableCell>
          ) : (
            <TableCell key={`trc-${k}`}>
              {currentlyEditing ? (
                <TextField
                  multiline
                  required={true}
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
      </TableRow>
    </>
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
