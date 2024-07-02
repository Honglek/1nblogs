<template>
  <div class="w-full md:w-fit md:flex">
    <div class="w-full md:w-fit">
      <div class="w-fit">
        <router-link to="/dashboard/categories/create-categories">
          <font-awesome-icon
            :icon="['fas', 'plus']"
            title="Add Categories"
            class="bg-blue-700 rounded-full p-3 text-white h-3 w-3 md:w-5 md:h-5"
          />
        </router-link>
      </div>
      <div class="w-fit">
        <h2 class="py-2 font-bold text-xl font-serif">Categories</h2>
        <div class="w-fit h-auto md:h-[530px]">
          <div v-if="documents" class="w-fit h-full overflow-y-auto rtl-scroll">
            <ul
              v-for="categories in documents"
              :key="categories.id"
              class="w-full text-base font-sans font-semibold py-1 px-2 md:px-5"
            >
              <li
                @dblclick="handleDblClick(categories.id)"
                title="double click to delete"
                class="w-full box-border text-center bg-gray-200 p-2 px-12 rounded-md cursor-pointer capitalize"
              >
                {{ categories.data.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="w-full">
      <router-view></router-view>
    </div>
    <dialog class="modal" ref="myModal">
      <div class="modal-box">
        <h3 class="font-bold text-lg">Delete Categories!</h3>
        <p class="py-4">
          Are you sure you want to delete categories {{ categoriesName }}?
        </p>
        <div class="modal-action">
          <form method="dialog">
            <!-- if there is a button in form, it will close the modal -->
            <button
              @click="handleDeleteCategories"
              class="btn bg-red-600 text-white hover:bg-red-600 mr-2"
            >
              Yes
            </button>
            <button class="btn">No</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Categories from "@/composables/categories";
// import { faL } from "@fortawesome/free-solid-svg-icons";
export default {
  name: "Categories",
  setup() {
    const myModal = ref("");
    const categoriesName = ref("");
    const router = useRouter();
    //const currentComponent = ref("");
    const { getCate, removeCate } = Categories("Categories");
    const { documents } = getCate("");

    const handleDblClick = (id) => {
      myModal.value.showModal();
      categoriesName.value = id;
      // router.push({ name: "UpdateDeleteCate", params: { id: id } });
    };
    const handleDeleteCategories = async () => {
      await removeCate(categoriesName.value);
    };
    return {
      handleDblClick,
      // handleDeleteCategories,
      documents,
      myModal,
      categoriesName,
    };
  },
};
</script>
<style>
.rtl-scroll {
  direction: rtl; /* Set the
  direction to right-to-left */
  scrollbar-color: #9ca3af #e5e7eb;
}
.ltr-content {
  direction: ltr; /* Set the content direction back to left-to-right */
  text-align: left; /* Ensure text aligns to the left */
}
</style>
scrollbar-width: thin; #D1D5DB
