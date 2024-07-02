import { db } from "@/firebase/config";
import {
  collection,
  onSnapshot,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import { ref, watchEffect } from "vue";

const getAllPost = (number) => {
  const error = ref(null);
  const isPending = ref(false);
  const categories = ref([]);
  const postsByCategory = ref({});
  const allTags = ref(new Set());

  return { categories, postsByCategory, allTags, error, isPending };
};

export default getAllPost;
