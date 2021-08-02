import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { db, storage } from '../Firebase/firebase';

export const useFormSubmit = () => {
  const [fileUrl, setFileUrl] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [fileName, setFileName] = useState('');

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    setFileName(file.name);

    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);

    const imgUrl = await fileRef.getDownloadURL();
    setFileUrl(imgUrl);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const id = uuidv4();

    await db
      .collection('Products')
      .doc(id)
      .set({
        id,
        title,
        description,
        price,
        quantity,
        img: fileUrl,
      })
      .then(() => {
        e.target.reset();
      });
  };

  return {
    onSubmit,
    onFileChange,
    setTitle,
    setDescription,
    setPrice,
    setQuantity,
    fileName,
    title,
    description,
    price,
    quantity,
  };
};
