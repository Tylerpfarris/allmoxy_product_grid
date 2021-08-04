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
    console.log(file);

    const reff = await storage.ref().child(file.name);
   

    reff.put(file).then((snapshot) => {
      console.log('uploaded a blob or file', snapshot);
    });

    storage
      .ref('/' + file.name)
      .getDownloadURL()
      .then((url) => {
        setFileUrl(url);
      });

    reff.getDownloadURL();
    // const storageRef = storage.ref();
    // const fileRef = storageRef.child(file.name);
    // console.log(fileRef);
    // console.log(imgUrl);
    // setFileUrl(imgUrl);
    // fileRef.put(file);

    // const storageRef = storage.ref();
    // const imgRef = storageRef.child(file.name);
    // imgRef.put(file);
    // const storImgRef = storageRef.child(`images/${file}`);
    // imgRef.name === storImgRef.name;
    // imgRef.fullPath === storImgRef.fullPath;
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
      .catch((err) => {
        console.error(err);
      })
      .then(() => {
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
