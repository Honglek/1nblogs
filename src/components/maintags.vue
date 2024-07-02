<template>
  <div>
    <div class="w-full mt-4">
      <h2 class="font-serif text-lg uppercase">MAIN TAGS</h2>
      <div
        class="flex flex-wrap items-center mt-2 font-serif font-semibold space-y-1 space-x-1"
      >
        <span
          v-for="tag in tagsArray"
          :key="tag.id"
          @click="handleSearch(tag)"
          class="text-xs mt-1 p-1 px-2 text-blue-500 border-2 border-blue-500 hover:bg-gray-300 hover:bg-opacity-30 cursor-pointer"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, watch, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import Post from "@/composables/post";
export default {
  setup() {
    const router = useRouter();
    const { getPost, allTags, isPending } = Post("Posts");
    const tagsArray = computed(() => Array.from(allTags.value));
    onMounted(async () => {
      const documents = await getPost("");
    });
    const handleSearch = (tag) => {
      ////
    };
    return { tagsArray, handleSearch };
  },
};
</script>
<style></style>
