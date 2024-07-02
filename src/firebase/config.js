import { initializeApp } from "firebase/app";
import { Timestamp, getFirestore, serverTimestamp } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "/////////////////////////////////////",
  authDomain: "////////////////////////",
  projectId: "///////////",
  storageBucket: "////////////////////",
  messagingSenderId: "////////////",
  appId: "////////////////////////////////",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const convertToTimestamp = Timestamp.fromDate;
const timestamp = serverTimestamp;
export { db, auth, storage, timestamp, convertToTimestamp };
