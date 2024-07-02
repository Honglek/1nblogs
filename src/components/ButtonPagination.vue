<template>
  <nav aria-label="Pagination" class="flex items-center text-gray-600">
    <a
      href="#"
      @click.prevent="handlePrevious"
      :class="{ 'opacity-50 cursor-not-allowed': previous <= 0 }"
      class="p-1 mr-2 rounded hover:bg-gray-100"
    >
      <font-awesome-icon :icon="['fas', 'angle-left']" />
    </a>
    <a
      v-for="i in totalPages"
      :key="i"
      href="#"
      @click.prevent="handlePageClick(i)"
      :class="[
        'px-3 py-1 rounded hover:bg-gray-100 mx-1 mt-1 font-xs',
        { 'bg-gray-200 text-gray-900 font-medium': i === Indexactive },
      ]"
    >
      {{ i }}
    </a>
    <a
      href="#"
      @click.prevent="handleNext(posts.length)"
      :class="{ 'opacity-50 cursor-not-allowed': next >= posts.length }"
      class="p-1 ml-2 rounded hover:bg-gray-100"
    >
      <font-awesome-icon :icon="['fas', 'angle-right']" />
    </a>
  </nav>
</template>

<script>
import { ref, watchEffect } from "vue";

export default {
  props: ["posts"],
  setup(props, { emit }) {
    const previous = ref(0);
    const next = ref(5);
    const Indexactive = ref(1);
    const totalPages = ref(Math.ceil(props.posts.length / 5));

    const updatePagination = () => {
      emit("onPagination", previous.value, next.value);
    };

    const handleNext = (totalPosts) => {
      if (next.value < totalPosts) {
        previous.value += 5;
        next.value += 5;
        Indexactive.value++;
        updatePagination();
      }
    };

    const handlePrevious = () => {
      if (previous.value > 0) {
        previous.value -= 5;
        next.value -= 5;
        Indexactive.value--;
        updatePagination();
      }
    };

    const handlePageClick = (pageNumber) => {
      if (pageNumber !== Indexactive.value) {
        const newIndex = (pageNumber - 1) * 5;
        previous.value = newIndex;
        next.value = newIndex + 5;
        Indexactive.value = pageNumber;
        updatePagination();
      }
    };

    watchEffect(() => {
      totalPages.value = Math.ceil(props.posts.length / 5);
    });

    updatePagination();

    return {
      previous,
      next,
      Indexactive,
      totalPages,
      handleNext,
      handlePrevious,
      handlePageClick,
    };
  },
};
</script>

<style>
.opacity-50 {
  opacity: 0.5;
}
.cursor-not-allowed {
  cursor: not-allowed;
}
</style>
