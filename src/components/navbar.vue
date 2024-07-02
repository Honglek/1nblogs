<template>
  <div class="w-full bg-white fixed top-0 z-50 p-0 m-0">
    <div
      class="w-full md:w-10/12 mx-auto p-5 flex justify-between items-baseline"
    >
      <div class="w-full flex justify-between">
        <div class="w-full">
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
        <div class="w-full flex justify-end md:hidden">
          <div class="flex items-center space-x-3">
            <!-- modal -->
            <div class="cursor-pointer">
              <font-awesome-icon
                :icon="['fas', 'magnifying-glass']"
                @click="openModal"
              />
              <dialog id="my_modal_2" class="modal" ref="modal">
                <div class="modal-box">
                  <div class="flex items-center lg:p-1 space-x-2 flex-grow">
                    <font-awesome-icon
                      @click="handleSearch"
                      class="w-3 h-3 lg:w-4 lg:h-4 text-gray-400 mt-1 cursor-pointer"
                      :icon="['fas', 'magnifying-glass']"
                    />
                    <input
                      type="search"
                      placeholder="Search"
                      v-model="searchQuery"
                      @keydown.enter="handleSearch"
                      ref="searchInput"
                      class="w-full bg-transparent text-sm text-black placeholder-gray-400 focus:outline-none"
                    />
                  </div>
                </div>
                <form method="dialog" class="modal-backdrop">
                  <button>close</button>
                </form>
              </dialog>
            </div>
            <!-- dropdown -->
            <div class="dropdown dropdown-end">
              <div tabindex="0" role="button" class="">
                <font-awesome-icon :icon="['fas', 'bars']" />
              </div>
              <ul
                tabindex="0"
                class="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
              >
                <li v-for="categories in documents" :key="categories.id">
                  <router-link
                    :to="{
                      name: 'PageCategories',
                      params: { categoriesID: categories.id },
                    }"
                  >
                    <h3>{{ $t(`${categories.data.name}`) }}</h3>
                  </router-link>
                </li>
              </ul>
            </div>
            <!-- change language -->
            <div
              class="flex bg-gray-300 text-white p-1 font-mono font-semibold text-sm space-x-2"
            >
              <button
                @click="changeLanguage()"
                class="p-px px-1 bg-gray-100 text-gray-400"
              >
                {{ currentLanguage.toUpperCase() }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full hidden md:block">
        <!-- justify-(start-center-end) -->
        <div v-if="isPending" class="">loading</div>
        <div
          v-else
          v-if="documents"
          class="flex justify-start items-center space-x-4"
        >
          <router-link to="/"
            ><h3 class="text-lg font-serif cursor-pointer">
              {{ $t("Home") }}
            </h3></router-link
          >
          <div
            v-for="categories in documents"
            :key="categories.id"
            class="flex justify-center items-center text-center"
          >
            <router-link
              :to="{
                name: 'PageCategories',
                params: { categoriesID: categories.id },
              }"
            >
              <span class="text-lg font-serif cursor-pointer capitalize">
                {{ $t(`${categories.data.name}`) }}
              </span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="w-full hidden md:flex justify-end">
        <div class="w-8/12 flex items-center bg-gray-100 p-px px-2">
          <div class="flex items-center lg:p-1 space-x-2 flex-grow">
            <font-awesome-icon
              @click="handleSearch"
              class="w-3 h-3 lg:w-4 lg:h-4 text-gray-400 mt-1 cursor-pointer"
              :icon="['fas', 'magnifying-glass']"
            />
            <input
              type="search"
              placeholder="Search"
              v-model="searchQuery"
              @keydown.enter="handleSearch"
              ref="searchInput"
              class="w-full bg-transparent text-sm text-black placeholder-gray-400 focus:outline-none"
            />
          </div>
        </div>
        <div class="flex pl-2">
          <div
            class="flex bg-gray-300 text-white p-1 font-mono font-semibold text-sm space-x-2"
          >
            <button
              @click="changeLanguage('en')"
              :class="btnlanguage('en')"
              class="p-1 px-2 text-gray-400"
            >
              EN
            </button>
            <button
              @click="changeLanguage('kh')"
              :class="btnlanguage('kh')"
              class="p-1 px-2 text-gray-400"
            >
              KH
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, onMounted, onBeforeUnmount, onUnmounted } from "vue";
import { useI18n } from "vue-i18n";
import { useRouter } from "vue-router";
import Categories from "@/composables/categories";
export default {
  setup() {
    const modal = ref(false);
    const searchQuery = ref("");
    const searchInput = ref(null);
    const router = useRouter();
    const currentLanguage = ref("en");
    const { t, locale } = useI18n({ useScope: "global" });
    const { getCate, isPending } = Categories("Categories");
    const { documents } = getCate("");
    const handleSearch = (event) => {
      if (searchQuery.value) {
        ///
      }
      closeModal();
      searchQuery.value = "";
      searchInput.value.blur();
    };
    const focusSearchInput = (event) => {
      if (event.ctrlKey && event.key === "k") {
        event.preventDefault();
        if (searchInput.value) {
          searchInput.value.focus();
        }
      }
    };
    onMounted(() => {
      window.addEventListener("keydown", focusSearchInput);
    });
    onUnmounted(() => {
      window.removeEventListener("keydown", focusSearchInput);
    });
    const changeLanguage = (lang) => {
      ///
    };
    const btnlanguage = (lang) => {
      return locale.value === lang
        ? "bg-gray-100 text-gray-500"
        : "text-gray-400";
    };
    const openModal = () => {
      modal.value.showModal();
    };
    const closeModal = () => {
      modal.value.close();
    };
    return {
      t,
      modal,
      documents,
      searchQuery,
      searchInput,
      isPending,
      handleSearch,
      focusSearchInput,
      currentLanguage,
      changeLanguage,
      btnlanguage,
      openModal,
    };
  },
};
</script>
<style>
////
</style>
