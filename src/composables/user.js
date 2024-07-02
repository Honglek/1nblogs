import { db, auth } from "@/firebase/config";
import { collection, addDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { ref, watchEffect } from "vue";
const USER = (collectionName) => {
  const error = ref(null);
  const isPending = ref(false);
  const user = ref(null);

  return {
    addUser,
    signin,
    signout,
    getUser,
    user,
    isAuthenticated,
    isPending,
    error,
  };
};
export default USER;
