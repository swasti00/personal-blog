import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

import 'firebase/compat/storage'
const firebaseConfig = {
  apiKey: "AIzaSyBr4281qaN4oF6g9LfOl7-durJQV0IlvZM",

  authDomain: "blog-d8804.firebaseapp.com",

  projectId: "blog-d8804",

  storageBucket: "blog-d8804.appspot.com",

  messagingSenderId: "258760981343",

  appId: "1:258760981343:web:9f8e731a62bc24c32194ea",

  measurementId: "G-YM8XRWLLHY"



};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const db = firebase.firestore();
export const storage = firebase.storage();
export const timestamp = firebase.firestore.FieldValue.serverTimestamp;
