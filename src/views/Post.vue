<template>
  <div v-if="isPending">Loading...</div>
  <div v-else class="w-[1260px] h-[610px]">
    <div class="w-8/12 h-ful h-12">
      <h2 class="py-2 font-medium text-lg font-mono">
        All Posts({{ posts?.length }})
      </h2>
      <div class="w-full h-full">
        <div class="w-full h-[560px] overflow-y-auto rtl-scroll">
          <ul
            class="w-full text-base font-sans font-semibold py-1 space-y-3 ltr-content"
          >
            <li
              v-for="post in posts"
              :key="post.id"
              class="w-full box-border bg-gray-100 p-2 rounded-md flex"
            >
              <div class="w-2/12">
                <div
                  class="h-24 w-full bg-gray-300 flex justify-center items-center rounded-md"
                >
                  <img
                    v-if="post.data.image"
                    :src="post.data.image.url"
                    class="object-center object-cover h-24 w-full"
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
                class="w-8/12 h-24 overflow-hidden pl-2 text-sm text-opacity-60 text-black"
              >
                <h1
                  class="text-base whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  Title : {{ post.data.title }}
                </h1>
                <h6 v-if="post.data.categories" class="capitalize">
                  Categories : {{ post.data.categories }}
                </h6>
                <div
                  v-if="post.data.tags.length >= 1"
                  class="tags-container mr-2"
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
                <p
                  v-if="post.data.description"
                  class="w-8/12 whitespace-nowrap overflow-hidden text-ellipsis"
                >
                  Description :
                  <span v-html="post.data.description"></span>
                </p>
              </div>
              <div class="w-2/12 text-end flex flex-col">
                <div class="w-full space-x-1">
                  <button class="text-green-500 p-1 text-sm">
                    <font-awesome-icon
                      :icon="['far', 'pen-to-square']"
                      title="Edit"
                      @click="handleEditPost(post.id)"
                    />
                  </button>
                  <button class="text-red-500 p-1 text-sm">
                    <font-awesome-icon
                      :icon="['fas', 'x']"
                      title="Delete"
                      @click="
                        handleClick(
                          post.id,
                          post.data.image ? post.data.image.url : null
                        )
                      "
                    />
                  </button>
                </div>
                <h6
                  class="mt-auto text-xs text-opacity-60 text-black"
                  ref="createdAtDisplay"
                >
                  {{
                    date(post.data.createdAt.toDate()).format("h:mm a DD/MM/YY")
                  }}
                </h6>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  <dialog class="modal" ref="myModal">
    <div class="modal-box">
      <h3 class="font-bold text-lg">Delete Post!</h3>
      <p class="py-4">
        Are you sure you want to delete post ID : {{ postID }}?
      </p>
      <div class="modal-action">
        <form method="dialog">
          <!-- if there is a button in form, it will close the modal -->
          <button
            @click="handleDeletePost"
            class="btn bg-red-600 text-white hover:bg-red-600 mr-2"
          >
            Yes
          </button>
          <button class="btn">No</button>
        </form>
      </div>
    </div>
  </dialog>
</template>

<script>
import { ref, watch, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import moment from "moment";
import Post from "@/composables/post";
import useStorage from "@/composables/useStorage";
export default {
  name: "Post",
  setup() {
    const date = moment;
    const router = useRouter();
    const myModal = ref("");
    const posts = ref([]);
    const postID = ref(null);
    const imageUrl = ref(null);
    const { getPost, dPost, isPending } = Post("Posts");
    const { deleteImage } = useStorage("Posts");
    const fetchPosts = async () => {
      const documents = await getPost();
      posts.value = documents.value;
    };
    onMounted(() => {
      fetchPosts();
    });
    const handleClick = (id, imgUrl) => {
      //////
    };
    const handleDeletePost = async () => {
      ///////
    };
    const handleEditPost = (id) => {
      //////////////
    };
    return {
      date,
      myModal,
      posts,
      postID,
      isPending,
      handleClick,
      // handleDeletePost,
      handleEditPost,
    };
  },
};
</script>
<style>
.rtl-scroll {
  direction: rtl;
  scrollbar-color: #9ca3af #e5e7eb;
}
.ltr-content {
  direction: ltr;
  text-align: left;
}
.tags-container {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
</style>
