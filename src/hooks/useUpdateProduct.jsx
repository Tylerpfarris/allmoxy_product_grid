import { useState } from 'react';
import { updateProduct } from '../Firebase/firebase';

export const useUpdateProduct = (products, setProducts) => {

  const [editIdx, setEditIdx] = useState(-1);
  const [updatedProduct, setUpdatedProduct] = useState({
    title: '',
    description: '',
    price: 0,
    quantity: 0,
  });

  const handleChange = (event, name, i, product) => {
    const { value } = event.target;
    const pro = products.map((row, j) =>
      j === i ? { ...row, [name]: value } : row
    );

    setUpdatedProduct({
      title: name === 'title' ? value : product.title,
      description: name === 'description' ? value : product.description,
      price: name === 'price' ? value : product.price,
      quantity: name === 'quantity' ? value : product.quantity,
    });
    setProducts(pro);
  };

  const handleStopEdit = (product) => {
    updateProduct(product.id, updatedProduct);
    setEditIdx(-1);
  };
  const handleEdit = (i) => {
    setEditIdx(i);
  };

  return { editIdx, handleChange, handleEdit, handleStopEdit };
};
