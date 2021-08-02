import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {

  apiKey: 'AIzaSyCXRhgnlQHpTQmQOeubwko2MYuo5SGUGqE',
  authDomain: 'allmoxy-product-grid.firebaseapp.com',
  projectId: 'allmoxy-product-grid',
  storageBucket: 'allmoxy-product-grid.appspot.com',
  messagingSenderId: '587579967238',
  appId: '1:587579967238:web:68007421920968bcff4087',
  measurementId: 'G-MNYY74XQ1B'
};


firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const storage = firebase.storage();

//async await method

export const updateProduct = async (id, updates) => {
  await firebase
    .firestore()
    .collection('Products')
    .doc(id)
    .update(updates);
  
  const doc = await firebase
    .firestore()
    .collection('Products')
    .doc(id)
    .get();
  
  const product = {
    id: doc.id,
    ...doc.data(),
  };
  return product;
};


//promise chain

export const handleDelete = (product) => {
  firebase
    .firestore()
    .collection('Products')
    .doc(product.id)
    .delete()
    .catch((error) => console.log(error));
};

export default firebase;
