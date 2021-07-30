import React from 'react';
import { TextField, Button, Input } from '@material-ui/core';
import { useFormSubmit } from '../hooks/useFormSubmit';

export default function Form() {
  const {
    onSubmit,
    onFileChange,
    setTitle,
    setDescription,
    setPrice,
    setQuantity,
  } = useFormSubmit();

  return (
    <div>
      <form onSubmit={onSubmit} >
        <TextField
          required
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          name="title "
          placeholder="TITLE"
        />
        <TextField
          required
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          name="description "
          placeholder="DESCRIPTION"
        />
        <TextField
          required
          onChange={(e) => setPrice(Number(e.target.value))}
          type="number"
          name="price"
          placeholder="PRICE"
        />
        <TextField
          required
          onChange={(e) => setQuantity(Number(e.target.value))}
          type="text"
          name="quantity"
          placeholder="QUANTITY"
        />
        <Input
          required
          type="file"
          name="img"
          placeholder="FILE"
          onChange={onFileChange}
        />
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
