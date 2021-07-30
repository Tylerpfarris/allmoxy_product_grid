import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import firebase from '../Firebase/firebase';
import { v4 as uuidv4 } from 'uuid';

const db = firebase.firestore();

export default function Form() {
  const [fileUrl, setFileUrl] = useState(null);

  const onFileChange = async (e) => {
    const file = e.target.files[0];
    const storageRef = firebase.storage().ref();
    const fileRef = storageRef.child(file.name);
    await fileRef.put(file);
    setFileUrl(await fileRef.getDownloadURL());
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const title = e.target.title.value;
    const description = e.target.description.value;
    const price = e.target.price.value;
    const quantity = e.target.quantity.value;
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
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" name="title" placeholder="TITLE" />
        <input type="text" name="description" placeholder="DESCRIPTION" />
        <input type="number" name="price" placeholder="PRICE" />
        <input type="number" name="quantity" placeholder="QUANTITY" />
        <input type="file" onChange={onFileChange} />
        <button>Submit</button>
      </form>
    </div>
  );
}
