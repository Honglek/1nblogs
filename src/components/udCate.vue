<template>
  <div class="w-[1060px] px-5 pt-5">
    <div class="w-full flex justify-between">
      <h1 class="font-semibold text-2xl">Update Categories</h1>
      <button
        onclick="my_modal_1.showModal()"
        class="text-lg bg-red-600 text-white p-2 px-6 rounded-lg"
      >
        Delete
      </button>
    </div>
    <form action="" @submit.prevent="handleAddCategories">
      <input
        type="text"
        class="w-4/12 my-2 border-2 border-gray-400 p-2"
        v-model="categoriesName"
        required
      /><br />
      <button
        v-if="!isPending"
        @click="handleUpdateeCategories"
        class="btn text-white hover:bg-blue-700 bg-blue-700 mr-2"
      >
        Update
      </button>
      <button v-else class="btn text-white hover:bg-blue-700 bg-blue-700 mr-2">
        Updating...
      </button>
    </form>
    <dialog id="my_modal_1" class="modal">
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
import { ref, watchEffect } from "vue";
import { useRouter } from "vue-router";
import Categories from "@/composables/categories";
import { onMounted } from "@vue/runtime-core";
import { data } from "autoprefixer";
export default {
  name: "UpdateDeleteCate",
  props: ["id"],
  setup(props) {
    const router = useRouter();
    const categoriesName = ref("");
    const { removeCate, updateCate, fetchDoc, documents, isPending } =
      Categories("Categories");
    watchEffect(async () => {
      if (props.id) {
        await fetchDoc(props.id);
        categoriesName.value = documents.value.data.name;
      }
    });
    const handleUpdateeCategories = async () => {
      if (props.id && categoriesName.value) {
        await updateCate(props.id, {
          data: {
            name: categoriesName.value,
          },
        });
      }

      router.push({ name: "Categories" });
    };
    const handleDeleteCategories = async () => {
      await removeCate(props.id, categoriesName.value);
      router.push({ name: "Categories" });
    };

    return {
      categoriesName,
      documents,
      isPending,
    };
  },
};
</script>
<style></style>
