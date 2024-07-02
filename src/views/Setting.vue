<template>
  <div class="w-full">
    <div class="">
      <div
        class="flex justify-center items-center text-white rounded-full uppercase w-8 h-8 bg-indigo-700"
      >
        {{ user?.email[0] }}
      </div>
      <h3>
        {{ user?.email }}
      </h3>
      <button
        @click="handleSignout"
        type="button"
        class="mt-2 bg-red-600 text-white p-1 px-2 rounded-md"
      >
        Sign out
      </button>
    </div>
  </div>
</template>
<script>
import USER from "@/composables/user";
import { auth } from "@/firebase/config";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    const { user } = USER();
    const handleSignout = async () => {
      //////////////////////
    };
    return { user, handleSignout };
  },
};
</script>
<style></style>
