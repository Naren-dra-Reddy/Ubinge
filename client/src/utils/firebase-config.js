import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
import { getFirestore, collection, getDocs } from "firebase/firestore";
import { getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBcnSSm6S0wrf2JkUk8553sQgsHcBncElw",
  authDomain: "ubinge-9f52e.firebaseapp.com",
  databaseURL: "https://ubinge-9f52e-default-rtdb.firebaseio.com/",
  projectId: "ubinge-9f52e",
  storageBucket: "ubinge-9f52e.appspot.com",
  messagingSenderId: "605021207617",
  appId: "1:605021207617:web:b90ce281255d778a8e5ac0",
  measurementId: "G-333SBC94CT",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const firebaseAuth = getAuth(app);
const db = getFirestore(app);

const storage = getStorage();

export { database, firebaseAuth, db, storage };
