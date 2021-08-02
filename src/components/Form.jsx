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
        onSubmit={onSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          // margin: '5rem',
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
            // multiline="true"
            placeholder="DESCRIPTION"
          />
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
