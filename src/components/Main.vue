<template>
  <div class="w-full mb-5 md:mb-10">
    <div class="w-full lg:flex">
      <div class="w-full lg:w-8/12 lg:pr-5 lg:px-2">
        <div
          v-for="category in categories"
          :key="category.id"
          class="w-full bg-gray-200 py-4 px-4"
        >
          <h1
            class="text-lg md:textxl lg:text-2xl text-blue-700 font-semibold font-serif capitalize"
          >
            {{ $t(`${category.data.name}`) }}
          </h1>
          <ul class="w-full text-base font-sans font-semibold py-1 space-y-3">
            <li
              v-for="post in postsByCategory[category.id] || []"
              :key="post.id"
              class="w-full box-border bg-gray-100 p-2 rounded-md sm:flex"
            >
              <div class="w-full sm:w-8/12 h-44 lg:h-40 md:w-4/12">
                <div
                  @click="goToPageView(post.categories, post.title, post.id)"
                  class="w-full h-full bg-gray-300 flex justify-center items-center rounded-md cursor-pointer"
                >
                  <img
                    v-if="post.image"
                    :src="post.image.url"
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
                      <!-- {{ truncateDescription(post.title, 13) }} -->
                      {{ truncateDescription(post.title, 13) }}
                    </h1>
                    <p
                      class="w-full text-xs md:text-base lg:text-sm xl:text-base font-normal"
                      v-html="truncateDescription(post.description, maxLength)"
                    ></p>
                    <div
                      v-if="post.tags.length >= 1"
                      class="flex flex-wrap items-center mr-2 mt-1 sm:mt-0"
                    >
                      Tags :
                      <div class="mr-2">
                        <span v-for="tag in post.tags" class="">
                          #{{ tag }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    class="w-full sm:h-44 lg:h-40 sm:w-3/12 xl:w-2/12 sm:text-end flex justify-between mt-2 sm:mt-0 sm:flex-col"
                  >
                    <div
                      @click="
                        goToPageView(post.categories, post.title, post.id)
                      "
                      class="text-xs text-opacity-60 text-black cursor-pointer"
                    >
                      Read More>>
                    </div>
                    <h6 class="mt-auto text-xs text-opacity-60 text-black">
                      {{ formatDate(post.createdAt) }}
                    </h6>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <router-link
            :to="{
              name: 'PageCategories',
              params: { categoriesID: category.id },
            }"
          >
            <div
              class="w-full flex items-center justify-center bg-blue-700 text-white space-x-1 text-xs md:text-sm p-2 mt-2 cursor-pointer"
            >
              <h5>More</h5>
              <font-awesome-icon :icon="['fas', 'angles-right']" class="mt-1" />
            </div>
          </router-link>
        </div>
      </div>
      <div class="w-full lg:w-4/12 lg:sticky lg:top-20 lg:bottom-0 h-full">
        <sidebar />
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import moment from "moment";
import sidebar from "@/components/sidebar";
import getAllPost from "@/composables/getAllPost";
export default {
  name: "Main",
  components: { sidebar },
  setup() {
    const maxLength = ref(24);
    const store = useStore();
    const router = useRouter();
    const { categories, postsByCategory, isPending } = getAllPost("5");
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
    const goToPageView = (categoriesID, title, id) => {
      /////
    };
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
        maxLength.value = 21;
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
    return {
      maxLength,
      categories,
      postsByCategory,
      isPending,
      formatDate,
      truncateDescription,
      goToPageView,
      truncatedTitle,
    };
  },
};
</script>

<style></style>
