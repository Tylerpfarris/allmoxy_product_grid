import React from 'react';
import {
  TextField,
  Button,
  Box,
  Container,
  InputLabel,
  Typography,
} from '@material-ui/core';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
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
    fileName,
  } = useFormSubmit();

  const {
    handleTitleChange,
    handleDescriptionChange,
    handlePriceChange,
    handleQuantityChange,
  } = useFormOnChange(setTitle, setDescription, setPrice, setQuantity);

  return (
    <Box style={{ marginTop: '0', display: 'flex', justifyContent: 'center' }}>
      <form
        data-testid="product-form"
        onSubmit={onSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: '0',
          justifyContent: 'space-around',
        }}
      >
        <Container
          style={{
            width: '100vw',
            display: 'flex',
            justifyContent: 'space-around',
          }}
        >
          <TextField
            data-testid="title-input"
            required
            onChange={(e) => handleTitleChange(e)}
            type="text"
            name="title "
            placeholder="TITLE"
          />
          <TextField
            data-testid="description-input"
            required
            onChange={(e) => handleDescriptionChange(e)}
            type="text"
            name="description "
            placeholder="DESCRIPTION"
          />
          <TextField
            data-testid="price-input"
            required
            onChange={(e) => handlePriceChange(e)}
            type="number"
            name="price"
            placeholder="PRICE"
          />
          <TextField
            data-testid="quantity-input"
            required
            onChange={(e) => handleQuantityChange(e)}
            type="number"
            name="quantity"
            placeholder="QUANTITY"
          />
        </Container>
        <Container
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            width: '15rem',
          }}
        >
          <Button style={{ margin: '2rem', marginBottom: '0' }}>
            {fileName ? (
              <InputLabel
                htmlFor="img"
                style={{ cursor: 'pointer', color: '#21BA4C' }}
              >
                {fileName}
              </InputLabel>
            ) : (
              <InputLabel htmlFor="img" style={{ cursor: 'pointer' }}>
                Select Image
              </InputLabel>
            )}
            <TextField
              data-testid="image-input"
              id="img"
              required
              type="file"
              name="img"
              placeholder="FILE"
              onChange={onFileChange}
              style={{ display: 'none' }}
              label="SELECT FILE"
            />
          </Button>
          <Button
            data-testid="submit-button"
            style={{
              margin: '1rem',
              width: '10rem',
              textAlign: 'center',
            }}
            type="submit"
          >
            <ArrowUpwardIcon style={{ color: '#21BA4C' }} />
            <Typography style={{ color: '#7c7c7c' }}>add product</Typography>
            <ArrowUpwardIcon style={{ color: '#21BA4C' }} />
          </Button>
        </Container>
      </form>
    </Box>
  );
}
