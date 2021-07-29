import React, { useState } from 'react';
import firebase from '../Firebase/firebase';

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

    if (!title || !description || !price || !quantity) return;
    db.collection('Products').doc(title, description, price, quantity).set({
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
