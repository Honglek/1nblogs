<template>
  <div class="w-full 2xl:max-w-[1920px] mx-auto">
    <div>
      <navbar class="w-full 2xl:max-w-[1920px] mx-auto" />
    </div>
    <router-view />
  </div>
</template>
<script>
import navbar from "@/components/navbar";
import fooTer from "@/components/fooTer";
export default {
  components: {
    navbar,
    fooTer,
  },
};
</script>
