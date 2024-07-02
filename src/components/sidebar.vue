<template>
  <div class="w-full bg-gray-200 p-4 text-base font-mono mt-5 lg:mt-0">
    <div class="w-full text-center">
      <h1 class="text-3xl font-sans font-semibold bg-gray-300 p-2">
        {{ currentTime }}
      </h1>
    </div>
    <!-- labels -->
    <div class="w-full mt-2 font-mono">
      <h2 class="font-serif text-lg uppercase">Labels</h2>
      <div class="w-full">
        <div
          v-for="categories in categoriesName"
          :key="categories.id"
          class="w-full flex items-center justify-between space-y-2 text-blue-700 cursor-pointer hover:pl-5 transition-all duration-300"
        >
          <router-link
            :to="{
              name: 'PageCategories',
              params: { categoriesID: categories.id },
            }"
          >
            <h4 class="capitalize">
              <span class="mr-1 text-lg">&raquo;</span
              >{{ $t(`${categories.data.name}`) }}
            </h4>
          </router-link>
          <h4 class="">({{ getPostCount(categories.id) }})</h4>
        </div>
      </div>
    </div>
    <!-- Lasted Post -->
    <div v-if="posts.length >= 1" class="w-full mt-4">
      <h2 class="font-serif text-lg uppercase">Lasted Post</h2>
      <div class="w-full">
        <div
          @click="
            goToPageView(
              posts[0].id,
              posts[0].data.title,
              posts[0].data.categories
            )
          "
          class="h-48 w-full mt-2 flex justify-center items-center cursor-pointer"
        >
          <img
            v-if="posts[0].data.image"
            :src="posts[0].data.image.url"
            class="w-fit h-48 object-center object-cover cursor-pointer"
            alt=""
          />
          <h2
            v-else
            class="text-lg font-bold bg-gray-300 text-black text-opacity-20"
          >
            No Image
          </h2>
        </div>
        <h5
          v-if="posts[0].data.categories"
          class="text-sm text-black text-opacity-50 capitalize"
        >
          {{ $t(`${posts[0].data.categories}`) }}
        </h5>
        <h1
          @click="
            goToPageView(
              posts[0].id,
              posts[0].data.title,
              posts[0].data.categories
            )
          "
          class="w-fit text-blue-700 text-base font-serif font-semibold cursor-pointer"
        >
          <!-- {{ truncateDescription(posts[0].data.title, 11) }} -->
          {{ truncateDescription(posts[0].data.title, 11) }}
        </h1>
        <!-- v-html="truncateDescription(posts[0].data.description, 20)" -->
        <p
          class="text-sm font-normal"
          v-html="truncateDescription(posts[0].data.description, 11)"
        ></p>
      </div>
      <!-- 01 -->
      <article class="w-full text-xs mt-2">
        <div class="w-full flex items-">
          <h6 class="font-semibold mt-1">01</h6>
          <div class="w-full pl-2">
            <h1
              @click="
                goToPageView(
                  posts[1].id,
                  posts[1].data.title,
                  posts[1].data.categories
                )
              "
              class="w-fit text-sm font-sans text-black hover:text-gray-500 cursor-pointer delay-100"
            >
              {{ truncateDescription(posts[1].data.title, 16) }}
            </h1>
            <h6 class="mt-auto text-xs text-opacity-40 text-black">
              {{ formatDate(posts[1].data.createdAt) }}
            </h6>
          </div>
        </div>
      </article>
      <!-- 02 -->
      <article class="w-full text-xs mt-2">
        <div class="w-full flex items-">
          <h6 class="font-semibold mt-1">02</h6>
          <div class="w-full pl-2">
            <h1
              @click="
                goToPageView(
                  posts[2].id,
                  posts[2].data.title,
                  posts[2].data.categories
                )
              "
              class="w-fit text-sm font-sans text-black hover:text-gray-500 cursor-pointer delay-100"
            >
              {{ truncateDescription(posts[2].data.title, 16) }}
            </h1>
            <h6 class="mt-auto text-xs text-opacity-40 text-black">
              {{ formatDate(posts[2].data.createdAt) }}
            </h6>
          </div>
        </div>
      </article>
      <!-- 03 -->
      <article class="w-full text-xs mt-2">
        <div class="w-full flex items-">
          <h6 class="font-semibold mt-1">03</h6>
          <div class="w-full pl-2">
            <h1
              @click="
                goToPageView(
                  posts[3].id,
                  posts[3].data.title,
                  posts[3].data.categories
                )
              "
              class="w-fit text-sm font-sans text-black hover:text-gray-500 cursor-pointer delay-100"
            >
              {{ truncateDescription(posts[3].data.title, 16) }}
            </h1>
            <h6 class="mt-auto text-xs text-opacity-40 text-black">
              {{ formatDate(posts[3].data.createdAt) }}
            </h6>
          </div>
        </div>
      </article>
    </div>
    <div class="w-full mt-4">
      <maintags />
    </div>
  </div>
</template>
<script>
import { ref, watch, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import moment from "moment";
import maintags from "@/components/maintags.vue";
import Post from "@/composables/post";
import getAllPost from "@/composables/getAllPost";
export default {
  components: { maintags },
  setup() {
    const currentTime = ref("");
    const router = useRouter();
    const store = useStore();
    const posts = ref([]);
    const { categories: categoriesName, postsByCategory } = getAllPost();
    const { getPost, allTags, isPending } = Post("Posts");
    const tagsArray = computed(() => Array.from(allTags.value));
    const fetchPosts = async () => {
      const documents = await getPost("4");
      posts.value = documents.value;
    };
    onMounted(() => {
      fetchPosts();
      updateTime();
      setInterval(updateTime, 1000);
    });
    const truncateDescription = (text, maxLength) => {
      if (text.split(" ").length > maxLength) {
        return text.split(" ").slice(0, maxLength).join(" ") + "...";
      } else {
        return text;
      }
    };

    const updateTime = () => {
      currentTime.value = moment().format("h:mm:ss A");
    };
    const formatDate = (timestamp) => {
      const date = timestamp.toDate();
      return moment(date).format("MMM DD, YYYY");
    };
    const getPostCount = (categoryId) => {
      return (postsByCategory.value[categoryId] || []).length;
    };
    const handleSearch = (tag) => {
      router.push({
        name: "PageSearch",
        query: { search_query: tag },
      });
    };
    const goToPageView = (id, title, categoriesID) => {
      /////
    };
    return {
      posts,
      categoriesName,
      currentTime,
      formatDate,
      truncateDescription,
      getPostCount,
      goToPageView,
    };
  },
};
</script>
<style>
.prevent-select {
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>
