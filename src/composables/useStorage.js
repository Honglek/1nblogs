import { storage } from "@/firebase/config";
import { ref } from "vue";
import {
  uploadBytes,
  getDownloadURL,
  put,
  ref as storageRef,
  deleteObject,
  refFromURL,
} from "firebase/storage";

const useStorage = () => {
  const error = ref(null);
  const url = ref(null);
  const filePath = ref(null);

  return { uploadImage, deleteImage, error, url, filePath };
};

export default useStorage;
