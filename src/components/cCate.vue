<template>
  <div
    class="w-full md:w-[1060px] md:px-5 pt-5 text-xs sm:text-sm md:text-base"
  >
    <h1 class="font-semibold text-2xl">Create Categories</h1>
    <form action="" @submit.prevent="handleAddCategories">
      <input
        type="text"
        class="w-full md:w-4/12 my-2 border-2 border-gray-400 p-2"
        v-model="categoriesName"
        required
      /><br />
      <button
        v-if="!isPending"
        class="p-2 px-4 rounded-md text-white hover:bg-blue-700 bg-blue-700 mr-2"
      >
        Save
      </button>
      <button
        v-else
        class="p-2 px-4 rounded-md text-white hover:bg-blue-700 bg-blue-700 mr-2"
      >
        Saving...
      </button>
      <button
        type="button"
        class="p-2 px-4 rounded-md bg-gray-300 hover:bg-gray-200"
      >
        Clear
      </button>
    </form>
  </div>
</template>
<script>
import { ref } from "vue";
import { timestamp } from "@/firebase/config";
import Categories from "@/composables/categories";

export default {
  name: "CreateCate",
  setup() {
    const categoriesName = ref("");
    const { addCate, isPending } = Categories("Categories");
    const formatForUrl = (text) => {
      return text.trim().toLowerCase();
    };
    const handleAddCategories = async () => {
      if (categoriesName.value) {
        await addCate({
          name: formatForUrl(categoriesName.value),
          createdAt: timestamp(),
        });
      }
      categoriesName.value = "";
    };
    return {
      // handleAddCategories,
      categoriesName,
      isPending,
    };
  },
};
</script>
<style></style>
