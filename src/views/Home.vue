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
  <div v-else class="w-full mt-20">
    <div v-if="posts" class="w-full md:w-10/12 mx-auto mb-10 px-2 md:px-0">
      <div class="w-full pt-5 md:mt-10">
        <div class="w-full h-44 md:h-80 flex justify-between items-center p-2">
          <div v-if="posts.length > 1" class="w-7/12 h-full pr-1">
            <div
              @click="
                goToPageView(
                  posts[0].id,
                  posts[0].data.title,
                  posts[0].data.categories
                )
              "
              class="w-full h-full bg-gray-200 relative rounded-xl bordern"
            >
              <img
                v-if="posts[0].data.image && posts[0].data.image.url"
                :src="posts[0].data.image.url"
                :alt="posts[0].data.image.name"
                class="w-full h-full object-cover object-center rounded-xl absolute"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center"
              >
                <h2 class="text-2xl font-bold text-black text-opacity-20">
                  No Image
                </h2>
              </div>
              <div
                class="w-full h-full bg-opacity-10 hover:bg-opacity-0 duration-100 cursor-pointer top-0 left-0 absolute bg-black flex flex-col p-2 rounded-xl"
              >
                <h6
                  v-if="posts[0].data.categories"
                  class="mb-auto text-white bg-blue-700 text-xs md:textsm font-mono inline-block w-fit p-px px-1 md:p-1 md:px-2 rounded-md capitalize"
                >
                  {{ $t(`${posts[0].data.categories}`) }}
                </h6>
                <div class="mt-auto">
                  <h1
                    class="w-full text-black text-opacity-90 text-xl md:text-2xl xl:text-4xl font-semibold font-sans"
                  >
                    <!-- {{ truncateDescription(posts[0].data.title, 10) }} -->
                    {{ truncateDescription(posts[0].data.title, 10) }}
                  </h1>
                  <h6 class="text-gray-400 font-mono text-xs">
                    {{
                      relativeTimeFromStart(posts[0].data.createdAt.toDate())
                    }}
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div v-if="posts.length > 2" class="w-5/12 h-full pl-1 md:pl-2">
            <div
              @click="
                goToPageView(
                  posts[1].id,
                  posts[1].data.title,
                  posts[1].data.categories
                )
              "
              class="w-full h-full relative bg-gray-200 rounded-xl"
            >
              <img
                v-if="posts[1].data.image && posts[1].data.image.url"
                class="w-full h-full object-cover object-center rounded-xl absolute"
                :src="posts[1].data.image.url"
                :alt="posts[1].data.image.name"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center"
              >
                <h2 class="text-2xl font-bold text-black text-opacity-20">
                  No Image
                </h2>
              </div>
              <div
                class="w-full h-full bg-opacity-10 hover:bg-opacity-0 duration-100 cursor-pointer top-0 left-0 absolute bg-black flex flex-col p-2 rounded-xl"
              >
                <h6
                  v-if="posts[1].data.categories"
                  class="mb-auto text-white bg-blue-700 text-xs md:textsm font-mono inline-block w-fit p-px px-1 md:p-1 md:px-2 rounded-md capitalize"
                >
                  {{ $t(`${posts[1].data.categories}`) }}
                </h6>
                <div class="mt-auto">
                  <h1
                    class="w-full text-black text-opacity-90 text-sm sm:text-base md:text-lg lg:text-2xl xl:text-3xl font-semibold font-sans capitalize"
                  >
                    {{ truncateDescription(posts[1].data.title, 9) }}
                  </h1>
                  <h6 class="text-gray-400 font-mono text-xs">
                    {{
                      relativeTimeFromStart(posts[1].data.createdAt.toDate())
                    }}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="posts.length > 2"
          class="w-full h-36 md:h-48 grid grid-cols-3 gap-2 md:gap-3 p-2"
        >
          <div class="w-full h-full rounded-xl">
            <div
              @click="
                goToPageView(
                  posts[2].id,
                  posts[2].data.title,
                  posts[2].data.categories
                )
              "
              class="w-full h-full relative bg-gray-200 rounded-xl"
            >
              <img
                v-if="posts[2].data.image && posts[2].data.image.url"
                :src="posts[2].data.image.url"
                :alt="posts[2].data.image.name"
                class="w-full h-full rounded-ful object-cover object-center absolute rounded-xl"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center"
              >
                <h2 class="text-2xl font-bold text-black text-opacity-20">
                  No Image
                </h2>
              </div>
              <div
                class="w-full h-full bg-opacity-10 hover:bg-opacity-0 duration-100 cursor-pointer top-0 left-0 absolute bg-black flex flex-col p-2 rounded-xl"
              >
                <h6
                  v-if="posts[2].data.categories"
                  class="mb-auto text-white bg-blue-700 text-xs md:text-sm font-mono inline-block w-fit p-px px-1 md:p-1 md:px-2 rounded-md capitalize"
                >
                  {{ $t(`${posts[2].data.categories}`) }}
                </h6>
                <div class="mt-auto">
                  <h1
                    class="w-full text-black text-opacity-90 text-xs md:text-base xl:text-xl font-semibold font-sans"
                  >
                    {{ truncateDescription(posts[2].data.title, maxLength) }}
                  </h1>
                  <h6 class="text-gray-400 font-mono text-xs">
                    {{
                      relativeTimeFromStart(posts[2].data.createdAt.toDate())
                    }}
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full h-full rounded-xl">
            <div
              @click="
                goToPageView(
                  posts[3].id,
                  posts[3].data.title,
                  posts[3].data.categories
                )
              "
              class="w-full h-full relative bg-gray-200 rounded-xl"
            >
              <img
                v-if="posts[3].data.image && posts[3].data.image.url"
                :src="posts[3].data.image.url"
                :alt="posts[3].data.image.name"
                class="w-full h-full rounded-ful object-cover object-center absolute rounded-xl"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center"
              >
                <h2 class="text-2xl font-bold text-black text-opacity-20">
                  No Image
                </h2>
              </div>
              <div
                class="w-full h-full bg-opacity-10 hover:bg-opacity-0 duration-100 cursor-pointer top-0 left-0 absolute bg-black flex flex-col p-2 rounded-xl"
              >
                <h6
                  v-if="posts[3].data.categories"
                  class="mb-auto text-white bg-blue-700 text-xs md:text-sm font-mono inline-block w-fit p-px px-1 md:p-1 md:px-2 rounded-md capitalize"
                >
                  {{ $t(`${posts[3].data.categories}`) }}
                </h6>
                <div class="mt-auto">
                  <h1
                    class="w-full text-black text-opacity-90 text-xs md:text-base xl:text-xl font-semibold font-sans"
                  >
                    {{ truncateDescription(posts[3].data.title, maxLength) }}
                  </h1>
                  <h6 class="text-gray-400 font-mono text-xs">
                    {{
                      relativeTimeFromStart(posts[3].data.createdAt.toDate())
                    }}
                  </h6>
                </div>
              </div>
            </div>
          </div>
          <div class="w-full h-full rounded-xl">
            <div
              @click="
                goToPageView(
                  posts[4].id,
                  posts[4].data.title,
                  posts[4].data.categories
                )
              "
              class="w-full h-full relative bg-gray-200 rounded-xl"
            >
              <img
                v-if="posts[4].data.image && posts[4].data.image.url"
                :src="posts[4].data.image.url"
                :alt="posts[4].data.image.name"
                class="w-full h-full rounded-ful object-cover object-center absolute rounded-xl"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center"
              >
                <h2 class="text-2xl font-bold text-black text-opacity-20">
                  No Image
                </h2>
              </div>
              <div
                class="w-full h-full bg-opacity-10 hover:bg-opacity-0 duration-100 cursor-pointer top-0 left-0 absolute bg-black flex flex-col p-2 rounded-xl"
              >
                <h6
                  v-if="posts[4].data.categories"
                  class="mb-auto text-white bg-blue-700 text-xs md:text-sm font-mono inline-block w-fit p-px px-1 md:p-1 md:px-2 rounded-md capitalize"
                >
                  {{ $t(`${posts[4].data.categories}`) }}
                </h6>
                <div class="mt-auto">
                  <h1
                    class="w-full text-black text-opacity-90 text-xs md:text-base xl:text-xl font-semibold font-sans"
                  >
                    {{ truncateDescription(posts[4].data.title, maxLength) }}
                  </h1>
                  <h6 class="text-gray-400 font-mono text-xs">
                    {{
                      relativeTimeFromStart(posts[4].data.createdAt.toDate())
                    }}
                  </h6>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full md:w-10/12 mx-auto">
      <Main />
      <!-- <router-link to="/dashboard">
        <h1>dashboard</h1>
      </router-link> -->
    </div>
    <fooTer />
  </div>
</template>
<script>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import moment from "moment";
import Main from "@/components/Main.vue";
import fooTer from "@/components/fooTer";
import Post from "@/composables/post";
export default {
  name: "Home",
  components: { Main, fooTer },
  setup() {
    const maxLength = ref(7);
    const store = useStore();
    const router = useRouter();
    const posts = ref([]);
    const { getPost, isPending } = Post("Posts");
    const { documents } = getPost();
    const fetchPosts = async () => {
      const documents = await getPost("5");
      posts.value = documents.value;
    };
    onMounted(() => {
      fetchPosts();
      window.scrollTo(0, 0);
    });
    const goToPageView = (id, title, categoriesID) => {
      ///////
    };
    const truncateDescription = (text, maxLength) => {
      if (text.split(" ").length > maxLength) {
        return text.split(" ").slice(0, maxLength).join(" ") + "...";
      } else {
        return text;
      }
    };
    const relativeTimeFromStart = (date) => {
      return moment(date).startOf("hour").fromNow();
    };
    // Function to handle resize and update maxLength
    const handleResize = () => {
      if (window.innerWidth < 640) {
        maxLength.value = 4; // Set maxLength to 2 when window width is less than 640
      } else if (window.innerWidth < 768) {
        maxLength.value = 5; // Set maxLength to 3 when window width is less than 768
      } else if (window.innerWidth < 1024) {
        maxLength.value = 7; // Set maxLength to 5 when window width is less than 1024
      } else {
        maxLength.value = 9; // Default maxLength for larger screens
      }
    };
    const truncatedTitle = (title, maxLength) => {
      // const maxLength = window.innerWidth < 768 ? 2 : 10;
      if (title.split(" ").length > maxLength) {
        return title.split(" ").slice(0, maxLength).join(" ") + "...";
      } else {
        return title;
      }
    };
    // Watch window resize and update maxLength
    window.addEventListener("resize", handleResize);

    // Clean up resize event listener
    onUnmounted(() => {
      window.removeEventListener("resize", handleResize);
    });
    return {
      posts,
      documents,
      isPending,
      goToPageView,
      truncateDescription,
      relativeTimeFromStart,
      maxLength,
      truncatedTitle,
    };
  },
};
</script>
