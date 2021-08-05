import { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';
import { db, storage } from '../Firebase/firebase';

export const useFormSubmit = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [fileName, setFileName] = useState('');

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    setFileName(file.name);

    const reff = await storage.ref().child('/' + file.name);
    reff.put(file).then((snapshot) => {
      console.log('uploaded a blob or file', snapshot);
    });

  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const fileRef = storage.ref().child('/' + fileName);
    const url = await fileRef.getDownloadURL();
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
        img: url,
      })
      .finally(() => {
        e.target.reset();
        setFileName('');
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
