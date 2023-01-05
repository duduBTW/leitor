<script setup lang="ts">
const route = useRoute();
const { data: book, refresh: refreshBook } = await useFetch(
  () => `/api/book/${route.params.id}`,
  {
    key: String(route.params.id),
  }
);
const { data: versions, refresh: refreshVersion } = await useFetch(
  () => `/api/book/${route.params.id}/version`
);
const { data: chapters } = await useFetch(
  () => `/api/book/${route.params.id}/chapter`
);

const bookId = computed(() => String(route.params.id));
</script>

<template>
  <div class="container flex flex-col gap-6">
    <NuxtLink class="flex items-center gap-2 text-blue-400 hover:underline" :to="`/`">
      <Icon name="ri:arrow-left-line" size="20px" />
      <span>Back to home</span>
    </NuxtLink>

    <BookInformation v-if="book" :book="book" :book-id="bookId" :refresh-book="refreshBook" />
    <BookChapterList v-if="chapters" :chapters="chapters" :book-id="bookId" />
    <BookVersion v-if="chapters && chapters.length > 0" :book="book" :versions="versions" :refresh-version="refreshVersion" :book-id="bookId" />

    <div class="h-2 md:h-10" />
  </div>
</template>