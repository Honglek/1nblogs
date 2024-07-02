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
        <h1
          class="text-lg md:textxl lg:text-2xl text-blue-700 font-semibold font-serif"
        >
          Search Results for: {{ searchQuery }}
        </h1>
        <!-- <h1>No data available</h1> -->
        <div
          v-if="filteredPosts.length == 0"
          class="w-full box-border bg-gray-100 p-2 rounded-md"
        >
          No data available
        </div>
        <div v-else class="w-full">
          <ul class="w-full text-base font-sans font-semibold py-1 space-y-3">
            <li
              v-for="post in paginatedPosts"
              :key="post.id"
              class="w-full box-border bg-gray-100 p-2 rounded-md"
            >
              <div class="w-full sm:flex">
                <div class="w-full sm:w-8/12 h-44 lg:h-40 md:w-4/12">
                  <div
                    @click="
                      goToPageView(
                        post.id,
                        post.data.title,
                        post.data.categories
                      )
                    "
                    class="h-full w-full bg-gray-300 flex justify-center items-center rounded-md cursor-pointer"
                  >
                    <img
                      v-if="post.data.image && post.data.image.url"
                      :src="post.data.image.url"
                      class="w-full h-full object-center object-cover cursor-pointer"
                      alt=""
                    />
                    <h2
                      v-else
                      class="text-lg font-bold text-black text-opacity-20"
                    >
                      No Image
                    </h2>
                  </div>
                </div>
                <div
                  class="w-full h-auto sm:h-44 lg:h-40 md:w-8/12 pl-2 text-sm text-opacity-60 text-black overflow-hidden"
                >
                  <div class="w-full sm:flex">
                    <div class="w-full sm:w-9/12 xl:w-10/12">
                      <h1 class="text-base md:text-lg lg:text-base xl:text-lg">
                        {{ truncateDescription(post.data.title, 13) }}
                      </h1>
                      <!-- <p
                        class="w-full text-xs md:text-base lg:text-sm xl:text-base"
                      >
                        {{ truncatedTitle(post.data.description, maxLength) }}
                      </p> -->
                      <p
                        class="w-full text-xs md:text-base lg:text-sm xl:text-base font-normal"
                        v-html="
                          truncateDescription(post.data.description, maxLength)
                        "
                      ></p>
                      <div
                        v-if="post.data.tags.length >= 1"
                        class="flex flex-wrap items-center mr-2 mt-1 sm:mt-0"
                      >
                        Tags :
                        <div
                          v-for="(tag, index) in post.data.tags"
                          :key="index"
                          class="mr-2"
                        >
                          <span class=""> #{{ tag }} </span>
                        </div>
                      </div>
                    </div>
                    <div
                      class="w-full sm:h-44 lg:h-40 sm:w-3/12 xl:w-2/12 sm:text-end flex justify-between mt-2 sm:mt-0 sm:flex-col"
                    >
                      <div
                        @click="
                          goToPageView(
                            post.id,
                            post.data.title,
                            post.data.categories
                          )
                        "
                        class="text-xs text-opacity-60 text-black cursor-pointer"
                      >
                        Read More>>
                      </div>
                      <h6 class="mt-auto text-xs text-opacity-60 text-black">
                        {{ formatDate(post.data.createdAt) }}
                      </h6>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <ButtonPagination
          v-if="filteredPosts.length > 5"
          :posts="filteredPosts"
          @onPagination="handleListentoPagiantion"
        />
      </div>
      <div class="w-full lg:w-4/12 lg:sticky lg:top-20 lg:bottom-0 h-full">
        <sidebar />
      </div>
    </div>
    <fooTer />
  </div>
</template>
<script>
import { ref, computed, onMounted, watchEffect, onUnmounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useStore } from "vuex";
import moment from "moment";
import sidebar from "@/components/sidebar";
import ButtonPagination from "@/components/ButtonPagination";
import fooTer from "@/components/fooTer";
import getAllPost from "@/composables/getAllPost";
import Post from "@/composables/post";
export default {
  name: "PageSearch",
  components: { sidebar, fooTer, ButtonPagination },
  props: ["search_query"],
  setup() {
    const maxLength = ref(24);
    const previous = ref(0);
    const next = ref(5);
    const store = useStore();
    const router = useRouter();
    const route = useRoute();
    const searchQuery = ref("");
    const posts = ref([]);
    const { getPost, isPending } = Post("Posts");
    const fetchPosts = async () => {
      const documents = await getPost();
      posts.value = documents.value;
    };
    onMounted(() => {
      fetchPosts();
    });
    onMounted(() => {
      ////////
    });
    watchEffect(() => {
      //////////////////////////////
      previous.value = 0;
      next.value = 5;
      window.scrollTo(0, 0);
    });
    const formatDate = (timestamp) => {
      const date = timestamp.toDate();
      return moment(date).format("MMM DD, YYYY");
    };
    const truncateDescription = (text, maxLength) => {
      if (text.split(" ").length > maxLength) {
        return text.split(" ").slice(0, maxLength).join(" ") + "...";
      } else {
        return text;
      }
    };
    const goToPageView = (id, title, categoriesID) => {
      ///////////////////////
    };

    const filteredPosts = computed(() => {
      ///////////////////////////
    });
    const paginatedPosts = computed(() => {
      return filteredPosts.value.slice(previous.value, next.value);
    });
    const handleResize = () => {
      if (window.innerWidth < 640) {
        maxLength.value = 15;
      } else if (window.innerWidth < 768) {
        maxLength.value = 34;
      } else if (window.innerWidth < 1024) {
        maxLength.value = 15;
      } else if (window.innerWidth < 1280) {
        maxLength.value = 10;
      } else {
        maxLength.value = 22;
      }
    };
    const truncatedTitle = (title, maxLength) => {
      if (title.split(" ").length > maxLength) {
        return title.split(" ").slice(0, maxLength).join(" ") + "...";
      } else {
        return title;
      }
    };
    window.addEventListener("resize", handleResize);
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });
    const handleListentoPagiantion = (pre, nxt) => {
      previous.value = pre;
      next.value = nxt;
      window.scrollTo(0, 0);
    };
    return {
      maxLength,
      posts,
      searchQuery,
      isPending,
      filteredPosts,
      paginatedPosts,
      formatDate,
      truncateDescription,
      goToPageView,
      truncatedTitle,
      handleListentoPagiantion,
      previous,
      next,
    };
  },
};
</script>
<style></style>
