<template>
  <div
    class="w-full h-screen flex flex-col text-xs sm:text-sm md:text-base lg:text-lg"
  >
    <div class="flex-grow flex items-center justify-center">
      <div
        class="w-10/12 md:w-8/12 lg:w-1/2 xl:w-2/6 bg-gray-200 p-6 rounded-lg shadow-md"
      >
        <div class="w-full">
          <h4
            class="text-left mb-4 text-base sm:text-lg md:text-xl lg:text-2xl text-blue-700 font-serif"
          >
            Welcome
          </h4>
          <form @submit.prevent="handleSignin" action="">
            <div class="mb-4">
              <input
                class="w-full px-3 py-2 border-b-2 border-blue-700 rounded focus:outline-none"
                type="email"
                id="email"
                placeholder="Email"
                required
                v-model="email"
              />
            </div>
            <div class="">
              <input
                class="w-full px-3 py-2 border-b-2 border-blue-700 rounded focus:outline-none"
                :type="showPassword ? 'search' : 'password'"
                id="password"
                placeholder="Password"
                v-model="password"
                required
              />
            </div>
            <label
              class="w-fit my-2 pr-3 flex items-center text-xs md:text-sm leading-5"
            >
              <input
                type="checkbox"
                class="form-checkbox h-3 w-3 md:h-5 md:w-5 text-gray-600"
                v-model="showPassword"
              />
              <span class="ml-2">Show Password</span>
            </label>
            <label v-if="error">{{ error }} </label>
            <div class="w-full">
              <button
                v-if="!isPending"
                type="submit"
                class="px-4 py-2 w-full font-medium bg-blue-700 text-white rounded hover:bg-blue-700"
              >
                Sign in
              </button>
              <button
                v-else
                type="submit"
                class="px-4 py-2 w-full font-medium bg-blue-700 text-white rounded hover:bg-blue-700"
              >
                Sign in...
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <fooTer />
  </div>
</template>
<script>
import { ref, watch, watchEffect, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import fooTer from "@/components/fooTer";
import USER from "@/composables/user";
export default {
  name: "Signin",
  components: { fooTer },
  setup() {
    const email = ref("");
    const password = ref("");
    const showPassword = ref(false);
    const router = useRouter();
    const { error, signin, isPending } = USER();
    const handleSignin = async () => {
      /////////////////////////////
    };
    return { email, password, showPassword, isPending, error, handleSignin };
  },
};
</script>
<style></style>
