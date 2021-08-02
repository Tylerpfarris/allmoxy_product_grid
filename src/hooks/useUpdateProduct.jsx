import { useState } from 'react';
import { updateProduct, storage, db } from '../Firebase/firebase';

export const useUpdateProduct = (products, setProducts) => {
  const [editIdx, setEditIdx] = useState(-1);
  const [updatedProduct, setUpdatedProduct] = useState({
    title: '',
    description: '',
    price: 0,
    quantity: 0,
  });

  const handleImgUpdate = async (e, product) => {
    const productImgRef = db.collection('Products').doc(product.id);
    const file = e.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);

    await fileRef.put(file);
    const uploadImg = await fileRef.getDownloadURL();

    return productImgRef.update({
      title: product.title,
      description: product.description,
      price: Number(product.price),
      quantity: Number(product.quantity),
      img: uploadImg,
    });
  };

  const handleChange = (event, name, i, product) => {
    const { value } = event.target;
    const pro = products.map((row, j) =>
      j === i ? { ...row, [name]: value } : row
    );
    
    setUpdatedProduct({
      [name]: value,
      img: name === 'img' ? value.file : product.img,
    });
    setProducts(pro);
  };
  
  const handleStopEdit = (product) => {
    updateProduct(product.id, updatedProduct);
    setEditIdx(-1);
  };
  const handleEdit = async (i, product) => {
    setEditIdx(i);
    setUpdatedProduct(product);
  };

  return { editIdx, handleChange, handleEdit, handleStopEdit, handleImgUpdate };
};
