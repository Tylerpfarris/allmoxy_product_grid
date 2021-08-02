import { useEffect } from 'react';
import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { db, storage } from '../Firebase/firebase';

export const useFormSubmit = () => {
  const [fileUrl, setFileUrl] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: 0,
    quantity: 0
  });
  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);

    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };



  const onSubmit = (e) => {
    e.preventDefault();
    const id = uuidv4();

    if (!title || !description || !price || !quantity) return;

    db.collection('Products').doc(id).set({
      
      
      id,
      title,
      description,
      price,
      quantity,
      img: fileUrl,
    });

    // useEffect(() => {
      
    // }, []); 
    // setTitle('');
    // setDescription('');
    // setPrice(0);
    // setQuantity(0);
  };
  return {
    onSubmit,
    onFileChange,
    setTitle,
    setDescription,
    setPrice,
    setQuantity,
    setProduct,
    title,
    description,
    price,
    quantity
  };
};
