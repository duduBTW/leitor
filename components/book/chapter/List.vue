<script lang="ts" setup>
import type { BookChapter } from "@prisma/client";

const props = defineProps<{
  bookId: string;
  chapters: BookChapter[];
}>();

const newChapter = async () => {
  try {
    const { id } = await $fetch(`/api/book/${props.bookId}/chapter/new`, {
      method: "POST",
    });

    await navigateTo(`/chapter/${id}`);
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <h3 class="text-base font-medium text-gray-600">Chapters</h3>
  <div class="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
    <NuxtLink v-for="chapter, index in chapters" :key="chapter.id" :to="`/chapter/${chapter.id}`">
      <div class="relative w-full aspect-[2/3] rounded bg-white overflow-hidden hover:outline hover:outline-purple-100">
        <div class="opacity-60" v-html="chapter.miniature" />
      </div>
      <div class="text-base mt-3"> <span class="text-gray-400">{{ index + 1 }}.</span> <span class="font-medium" v-if="chapter.title">{{ chapter.title }}</span> <span v-else class="text-gray-400">No title</span> </div>
    </NuxtLink>

    <div class="w-full aspect-[2/3] bg-white rounded border border-purple-100 flex flex-col gap-2 items-center justify-center text-base font-medium text-purple-700 cursor-pointer hover:outline hover:outline-purple-100" @click="newChapter">
      <Icon name="ri:add-line" />
      <h4 class="text-lg">New chapter</h4>
    </div>
  </div>
</template>