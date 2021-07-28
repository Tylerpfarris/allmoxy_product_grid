import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import firebase from '../Firebase/firebase';

export default function Table() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const ref = firebase.firestore().collection('Products');
  console.log(ref);
  const getProducts = () => {
    setLoading(true);
    ref.onSnapshot((querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push(doc.data());
      });

      setProducts(items);
      setLoading(false);
    });
  };
  useEffect(() => {
    getProducts();
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }
  return (
    <table aria-label="product-table">
      <thead>
        <tr>
          <th>title</th>
          <th>description</th>
          <th>price</th>
          <th>quantity</th>
          <th>Image</th>
        </tr>
      </thead>
      <tbody aria-label="product-table-body">
        {products.map(({ id, title, description, price, quantity, img }) => (
          <tr key={`${id}+${title}`}>
            <td>{title}</td>
            <td>{description}</td>
            <td>{quantity}</td>
            <td>${price}</td>
            <td>
              <img src={img} alt={title} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
