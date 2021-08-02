import React from 'react';
import { TextField, Button, Box, Container } from '@material-ui/core';
import { useFormSubmit } from '../hooks/useFormSubmit';
import { useFormOnChange } from '../hooks/useFormOnChange';

export default function Form() {
  const {
    onSubmit,
    onFileChange,
    setTitle,
    setDescription,
    setPrice,
    setQuantity,
  } = useFormSubmit();

  const {
    handleDescriptionChange,
    handlePriceChange,
    handleTitleChange,
    handleQuantityChange,
  } = useFormOnChange(setDescription, setTitle, setPrice, setQuantity);

  return (
    <Box style={{ display: 'flex', justifyContent: 'center' }}>
      <form
        onSubmit={onSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          margin: '5rem',
          marginBottom: '0',
          
          justifyContent: 'center',
        }}
      >
        <Container >
          <TextField
            required
            onChange={(e) => handleTitleChange(e)}
            type="text"
            name="title "
            placeholder="TITLE"
          />
          <TextField
            required
            onChange={(e) => handleDescriptionChange(e)}
            type="text"
            name="description "
            placeholder="DESCRIPTION"
          />
        </Container>
        <Container>
          <TextField
            required
            onChange={(e) => handlePriceChange(e)}
            type="number"
            name="price"
            placeholder="PRICE"
          />
          <TextField
            required
            onChange={(e) => handleQuantityChange(e)}
            type="number"
            name="quantity"
            placeholder="QUANTITY"
          />
        </Container>
        <Container>
          <TextField
            required
            type="file"
            name="img"
            placeholder="FILE"
            onChange={onFileChange}
          />
        </Container>

        <Button type="submit">Submit</Button>
      </form>
    </Box>
  );
}
