import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyA86MQgKQukSPHehRZ7IUf_Ary4rIXT_Lo",
  authDomain: "tarefasplus-4b3df.firebaseapp.com",
  projectId: "tarefasplus-4b3df",
  storageBucket: "tarefasplus-4b3df.appspot.com",
  messagingSenderId: "1033936949421",
  appId: "1:1033936949421:web:19a6bbb0e3724910f13624"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore(firebaseApp);

export { db };