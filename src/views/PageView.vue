<template>
  <div
    v-if="isPending"
    class="w-full h-screen flex items-center justify-center"
  >
    <div class="flex gap-2">
      <div class="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
      <div class="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
      <div class="w-5 h-5 rounded-full animate-pulse bg-blue-600"></div>
    </div>
  </div>
  <div v-else class="w-full md:pt-10 mt-20">
    <div class="w-full md:w-10/12 md:mx-auto lg:flex">
      <div class="w-full lg:w-8/12 lg:pr-5 lg:px-2 px-4 mb-5">
        <div v-for="post in posts" class="w-full">
          <div class="border-b-2 border-gray-200 pb-3">
            <h6 class="text-3xl font-mono font-medium">
              {{ post.title }}
            </h6>
            <div class="w-full flex items-center mt-2">
              <font-awesome-icon :icon="['far', 'calendar-days']" />
              <h6 class="ml-2 font-sans text-sm">
                <!-- {{ post.createdAt }} -->
                {{ formatDate(post.createdAt) }}
              </h6>
            </div>
          </div>
          <div class="mt-2 text-base font-sans">
            <h2 class="">
              {{ post.subtitle }}
            </h2>
            <div
              v-if="post.image"
              class="h-96 w-full mt-2 rounded-xl flex justify-center items-center"
            >
              <img
                :src="post.image.url"
                :alt="post.image.name"
                class="w-fit max-w-full h-96 object-center object-cover"
              />
            </div>
            <p
              class="mt-2 justify-start font-normal"
              v-html="post.description"
            ></p>
            <!-- v-html="$t(`${post.description}`)" -->
            <!-- <p class="mt-2 text-justify font-normal">
              <iframe
                width="560"
                height="315"
                src="{{  }}"
                frameborder="0"
                allowfullscreen
              ></iframe>
            </p> -->
            <div
              v-if="post.tags.length >= 1"
              class="flex flex-wrap items-center mt-2 font-serif font-semibold"
            >
              <font-awesome-icon :icon="['fas', 'tag']" class="mr-1" />Tags :
              <div class="">
                <span
                  v-for="tag in post.tags"
                  :key="tag"
                  @click="handleSearch(tag)"
                  class="mx-1 text-black hover:text-opacity-70 cursor-pointer"
                >
                  #{{ tag }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full lg:w-4/12 lg:sticky lg:top-20 lg:bottom-0 h-full">
        <sidebar />
      </div>
    </div>
    <fooTer />
  </div>
</template>
<script>
import { ref, onMounted, watch, watchEffect, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { computed } from "vue";
import { useStore, mapState, mapActions } from "vuex";
import moment from "moment";
import sidebar from "@/components/sidebar";
import fooTer from "@/components/fooTer";
import Post from "@/composables/post";
export default {
  name: "PageView",
  components: { sidebar, fooTer },
  props: ["categoriesID", "title", "id"],
  setup(props) {
    const posts = ref([]);
    const router = useRouter();
    const route = useRoute();
    const store = useStore();
    // const id = computed(() => store.getters.getId);
    const { getPost, isPending } = Post("Posts");
    const fetchPosts = async () => {
      // const documents = await getPost(null, null, id.value);
      const documents = await getPost(null, null, route.query.id);
      posts.value = documents.value;
    };
    onMounted(() => {
      // alert(route.query.id);
      fetchPosts();
    });
    watchEffect(() => {
      fetchPosts();
      window.scrollTo(0, 0);
    });
    const formatDate = (timestamp) => {
      const date = timestamp.toDate();
      return moment(date).format("MMM DD, YYYY h:mma");
    };

    const handleSearch = (tag) => {
      //////////////
    };
    return {
      posts,
      isPending,
      formatDate,
      handleSearch,
    };
  },
};
</script>
<style></style>
