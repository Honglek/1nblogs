import { db } from "@/firebase/config";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import { ref, watchEffect } from "vue";

const Categories = (collectionName) => {
  return {
    error,
    addUser,
    addCate,
    updateCate,
    removeCate,
    fetchDoc,
    getCate,
    documents,
    isPending,
  };
};
export default Categories;
