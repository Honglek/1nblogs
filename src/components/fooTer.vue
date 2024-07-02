<template>
  <div class="w-full bg-gray-200 text-white pt-10 pb-5 mt-5 font-sans">
    <div
      class="w-full md:w-10/12 mx-auto md:flex border-b-2 border-blue-700 pb-2 px-3 md:px-0"
    >
      <div class="w-full md:w-3/12">
        <router-link
          to="/"
          class="w-fit prevent-select text-lg md:text-2xl flex items-baseline"
        >
          <span
            class="animate-gradient gradient-text text-2xl md:text-4xl font-bold font-Fira flex"
          >
            <span
              class="w-fit inline-block bg-black text-white transform rotate-[9deg]"
              >1</span
            >
            N
          </span>
          <span class="ml-1 text-black font-Kumar">Blog</span>
        </router-link>
      </div>
      <div
        class="w-full md:w-9/12 grid grid-cols-2 md:grid-cols-4 gap-y-4 md:gap-y-0 mt-4 md:mt-0 text-xs md:text-base text-black"
      >
        <div class="w-full">
          <div
            v-for="categories in categoriesName"
            :key="categories.id"
            class="w-full text-black"
          >
            <router-link
              :to="{
                name: 'PageCategories',
                params: { categoriesID: categories.id },
              }"
              class=""
            >
              <h4
                class="capitalize cursor-pointer hover:pl-5 transition-all duration-300"
              >
                <span class="mr-1 text-lg">&raquo;</span
                >{{ $t(`${categories.data.name}`) }}
              </h4>
            </router-link>
          </div>
        </div>
        <div class="w-full">
          <ul class="space-y-1 cursor-pointer">
            <li class="hover:pl-5 transition-all duration-300">Twitter</li>
            <li class="hover:pl-5 transition-all duration-300">Instagram</li>
            <li class="hover:pl-5 transition-all duration-300">Facebook</li>
            <li class="hover:pl-5 transition-all duration-300">Youtube</li>
          </ul>
        </div>
        <div class="w-full">
          <ul class="space-y-1">
            <li class="cursor-pointer">Terms & conditions</li>
            <li class="cursor-pointer">Privacy Plicy</li>
          </ul>
        </div>
        <div class="w-full">
          <ul class="space-y-1">
            <li class="">Email : honglek315@gmail.com</li>
            <li class="">Telegram : @honglekx</li>
          </ul>
        </div>
      </div>
    </div>
    <div
      class="w-full md:w-10/12 mx-auto flex items-center justify-between prevent-select text-xs md:text-sm mt-2 px-3 md:px-0 text-black"
    >
      <div class="">
        <h3>&copy; 2024 Honglek | All Rights Reserved.</h3>
      </div>
      <div class="text-sm md:text-lg">
        <a href="https://github.com/Honglek" target="_blank">
          <font-awesome-icon :icon="['fab', 'github']"
        /></a>
      </div>
    </div>
  </div>
</template>
<script>
import Categories from "@/composables/categories";
export default {
  setup() {
    const { getCate, isPending } = Categories("Categories");
    const { documents: categoriesName } = getCate("");
    return { categoriesName };
  },
};
</script>
<style></style>
