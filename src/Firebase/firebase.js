import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
//   apiKey: process.env.API_KEY,
//   authDomain: process.env.AUTH_DOMAIN,
//   projectId: process.env.PROJECT_ID,
//   storageBucket: process.env.STORAGE_BUCKET,
//   messagingSenderId: process.env.MESSAGING_SENDER_ID,
//   appId: process.env.APP_ID,
//   measurementId: process.env.MEASUREMENT_ID
  apiKey: 'AIzaSyCXRhgnlQHpTQmQOeubwko2MYuo5SGUGqE',
  authDomain: 'allmoxy-product-grid.firebaseapp.com',
  projectId: 'allmoxy-product-grid',
  storageBucket: 'allmoxy-product-grid.appspot.com',
  messagingSenderId: '587579967238',
  appId: '1:587579967238:web:68007421920968bcff4087',
  measurementId: 'G-MNYY74XQ1B'
};


firebase.initializeApp(firebaseConfig);

// const db = firebase.firestore();
// const storage = firebase.storage();

export default firebase;
