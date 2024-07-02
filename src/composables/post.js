import { db } from "@/firebase/config";
import {
  collection,
  doc,
  addDoc,
  setDoc,
  onSnapshot,
  query,
  orderBy,
  getDoc,
  getDocs,
  deleteDoc,
  limit,
  where,
} from "firebase/firestore";
import { ref, watchEffect } from "vue";
const Post = (collectionName) => {
  const error = ref(null);
  const isPending = ref(false);
  const documents = ref(null);
  const allTags = ref(new Set());

  return {
    error,
    cPost,
    getPost,
    dPost,
    uPost,
    fetchDoc,
    allTags,
    documents,
    isPending,
  };
};
export default Post;
