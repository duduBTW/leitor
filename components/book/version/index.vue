<script lang="ts" setup>
import type { BookVersion, Book } from "@prisma/client";

const props = defineProps<{
  bookId: string;
  versions: BookVersion[] | null;
  book: Book | null;
  refreshVersion: () => Promise<void>;
}>();

const isPiblishing = ref(false);

const publish = async () => {
  try {
    isPiblishing.value = true;
    await $fetch(`/api/book/${props.bookId}/publish`, {
      method: "POST",
    });

    await props.refreshVersion();
  } catch (error) {
  } finally {
    isPiblishing.value = false;
  }
};
</script>

<template>
  <BookDivider />
  <!-- List -->
  <template v-if="versions && versions.length > 0">
    <h3 class="text-base font-medium text-gray-600">History</h3>
    <ul class="flex flex-col gap-6">
      <BookVersionListItem v-for="version in versions" :key="version.id" :version="version" />
    </ul>
  </template>

  <!-- Empty -->
  <div v-else class="mt-10 md:mt-16 flex flex-col md:items-center">
    <div class="relative">
      <h3 class="text-gray-800 text-4xl z-10 relative">Publish “{{ book?.title }}”</h3>
      <img class="absolute -left-20 -top-6 invisible md:visible" src="~/assets/images/book.png" alt="" />
    </div>
    <div class="text-gray-400 mt-3 z-10">Once your book is published it is avaliable to the public!</div>
  </div>

  <div class="flex flex-col-reverse mt-16 md:mt-10 md:flex-row gap-3">
    <LButton variant="secondary" class=" w-full md:w-auto md:ml-auto">
      <template v-slot:start>
        <Icon name="ri:file-4-line" />
      </template>

      <span>Preview</span>
    </LButton>
    <LButton class="w-full md:w-auto" :class="{
              'md:mr-auto': !versions || versions?.length <= 0
            }" :loading="isPiblishing" @click="publish">
      <template v-slot:start>
        <Icon name="ri:file-transfer-line" />
      </template>

      Publish
    </LButton>
  </div>
</template>