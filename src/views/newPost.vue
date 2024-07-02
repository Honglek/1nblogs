<template>
  <div class="w-full lg:w-[1060px] text-xs sm:text-sm md:text-base lg:text-lg">
    <div class="w-full md:flex md:justify-between">
      <div class="w-full md:w-1/2 lg:pr-5">
        <form class="font-semibold">
          <label for="" class="text-sm sm:text-base md:text-lg lg:text-xl"
            >Title</label
          >
          <input
            class="w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-700 my-2"
            type="search"
            v-model="title"
            required
            :disabled="title.length >= 100"
          />
          <label for="" class="text-sm sm:text-base md:text-lg lg:text-xl"
            >Sub Title</label
          >
          <input
            class="w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-700 my-2"
            type="search"
            v-model="subtitle"
          />
          <div class="w-full grid grid-cols-2 mb-2">
            <div class="w-full pr-2">
              <label for="" class="text-sm sm:text-base md:text-lg lg:text-xl"
                >Select a Category</label
              >
              <select
                class="mt-1 block w-full pl-3 pr-10 py-2 focus:outline-none focus:ring-blue-700 focus:border-blue-700 sm:text-sm border-b-2 border-gray-300 capitalize"
                v-model="selectedOptionCategories"
              >
                <option value="" class="">none</option>
                <option
                  v-for="option in documents"
                  :key="option.id"
                  :value="option.id"
                  class="capitalize"
                >
                  {{ option.data.name }}
                </option>
              </select>
            </div>
          </div>
          <label for="" class="text-sm sm:text-base md:text-lg lg:text-xl"
            >#Tags <span class="text-xs">hit (space)</span></label
          >
          <input
            @keypress.space.prevent="handleInsertTag"
            class="w-full border-b-2 border-gray-300 focus:outline-none focus:border-blue-700 my-2"
            type="search"
            v-model="tag"
            :disabled="tags.length >= 5"
          />
          <label
            v-if="tags.length > 0"
            class="text-indigo-600 text-lg flex flex-wrap"
          >
            [
            <span class="p-1" v-for="(tag, index) in tags" :key="index">
              <div class="flex w-fit text-sm bg-gray-300">
                <span class="ml-2">{{ tag }} </span>
                <span class="flex items-center">
                  <svg
                    @click="handleRemoveTag(index)"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-4 h-4 mr-2 cursor-pointer ml-1 mt-1 text-red-600"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </span>
              </div>
            </span>
            ]
          </label>
          <br />
          <label for="" class="text-sm sm:text-base md:text-lg lg:text-xl"
            >Description</label
          >
          <textarea
            class="w-full h-[180px] border-2 border-gray-300 focus:outline-none my-2 p-2 text-xs"
            rows="10"
            v-model="description"
            required
          />
        </form>
      </div>
      <div class="w-full md:w-1/2 md:pl-5">
        <div class="w-full md:w-3/4 lg:w-1/2 h-auto">
          <h5 v-if="id" class="text-red-500">
            If you choose file, this image will automatically be deleted.
          </h5>
          <div class="h-64 w-full bg-gray-300 flex justify-center items-center">
            <img
              v-if="ImgUrl"
              :src="ImgUrl"
              class="object-center object-cover"
              alt=""
            />
            <h2 v-else class="text-lg font-bold text-black text-opacity-20">
              No Image
            </h2>
          </div>

          <div
            class="w-full p-6 bg-white rounded-lg shadow-lg text-white py-2 mt-2"
          >
            <input
              class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-700 file:text-white"
              @change="handleChanges"
              type="file"
            />
          </div>
          <div v-if="name">
            <p>{{ name }}</p>
          </div>
          <span v-if="fileError" class="text-red-400">{{ fileError }}</span>
        </div>
      </div>
    </div>
    <div class="mt-4 md:mt-0">
      <button
        v-if="!isPending"
        @click.prevent="handleAddPost"
        type="submit"
        class="btn text-white hover:bg-blue-700 bg-blue-700 mr-2"
      >
        {{ id ? "Update" : "Save" }}
      </button>
      <button v-else class="btn text-white hover:bg-blue-700 bg-blue-700 mr-2">
        {{ id ? "Updating..." : "Saving..." }}
      </button>
      <button type="button" @click="btnClear" class="btn">Clear</button>
    </div>
  </div>
</template>

<script>
import { ref, watch, watchEffect, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { timestamp } from "@/firebase/config";
import Categories from "@/composables/categories";
import useStorage from "@/composables/useStorage";
import Post from "@/composables/post";
import { Timestamp, getFirestore, serverTimestamp } from "firebase/firestore";
export default {
  props: ["id"],
  setup(props) {
    const router = useRouter();
    const title = ref("");
    const subtitle = ref("");
    const tag = ref("");
    const image = ref("");
    const name = ref("");
    const tags = ref([]);
    const description = ref("");
    const file = ref(null);
    const fileError = ref(null);
    const ImgUrl = ref(null);
    const selectedOptionCategories = ref("");
    const { getCate } = Categories("Categories");
    const { uploadImage, deleteImage, url } = useStorage();
    const { documents } = getCate("");
    const {
      cPost,
      uPost,
      fetchDoc,
      documents: post,
      isPending,
    } = Post("Posts");
    const handleRemoveTag = (index) => {
      tags.value.splice(index, 1);
    };
    const handleInsertTag = () => {
      const letterRegex = /[a-zA-Z]/;
      if (tag.value && letterRegex.test(tag.value)) {
        tags.value.push(tag.value);
        tag.value = "";
      }
    };

    const handleChanges = async (e) => {
      /////
    };
    const handleAddPost = async () => {
      ///////////////////
    };
    const btnClear = async () => {
      title.value = "";
      subtitle.value = "";
      selectedOptionCategories.value = "";
      description.value = "";
      tags.value = [];
      name.value = "";
    };
    watchEffect(async () => {
      ///////
    });

    return {
      title,
      subtitle,
      tag,
      tags,
      description,
      file,
      fileError,
      documents,
      image,
      name,
      ImgUrl,
      isPending,
      btnClear,
      selectedOptionCategories,
      handleRemoveTag,
      handleInsertTag,
      handleChanges,
      handleAddPost,
    };
  },
};
</script>
