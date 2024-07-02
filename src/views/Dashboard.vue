<template>
  <div class="w-full mt-20">
    <!-- <navbar /> -->
    <div
      class="w-full flex mt-5 p-2 sm:p-3 text-xs sm:text-sm md:textbase lg:text-lg"
    >
      <div class="w-fit p-2 border-r-2 border-b-slate-400">
        <div class="text-end mb-2">
          <font-awesome-icon
            :icon="['fas', 'angles-left']"
            class="bg-gray-200 p-2 rounded-full cursor-pointer"
            @click="toggleVisibility"
          />
        </div>
        <div v-if="isVisible" class="w-fit">
          <router-link
            class="rounded-full shadow-md inline-block p-2 px-6 cursor-pointer border-b-2 border-b-slate-400"
            to="/dashboard/new-post"
          >
            <font-awesome-icon :icon="['fas', 'plus']" />
            <span class="ml-1 md:ml-2">New Post</span>
          </router-link>
          <ul class="w-[120px] md:w-[160px] mt-5 space-y-3 border-y-2 py-4">
            <li class="">
              <router-link to="/dashboard/posts">
                <font-awesome-icon :icon="['fas', 'folder-open']" />
                <span class="ml-2">Posts</span>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/categories">
                <font-awesome-icon :icon="['fas', 'layer-group']" />
                <span class="ml-2">Categories</span>
              </router-link>
            </li>
            <li>
              <router-link to="/dashboard/setting">
                <font-awesome-icon :icon="['fas', 'gear']" />
                <span class="ml-2">Setting</span>
              </router-link>
            </li>
          </ul>
          <div class="mt-2 text-blue-700">
            <a href="/" target="_blank">
              <font-awesome-icon
                :icon="['fas', 'arrow-up-right-from-square']"
              />
              <span class="ml-2">View</span>
            </a>
          </div>
        </div>
      </div>
      <div class="w-fit bg-blue- flex p-5">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import navbar from "@/components/navbar";

export default {
  name: "Dashboard",
  components: {
    navbar,
  },
  data() {
    return {
      isVisible: true,
    };
  },
  methods: {
    toggleVisibility() {
      this.isVisible = !this.isVisible;
    },
  },
};
</script>
