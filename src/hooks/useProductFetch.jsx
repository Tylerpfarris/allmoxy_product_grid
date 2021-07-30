import firebase from '../Firebase/firebase';

const ref = firebase.firestore().collection('Products');

import { useEffect, useState } from 'react';

export const useProductFetch = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

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

  return { products, loading, setProducts };
};
