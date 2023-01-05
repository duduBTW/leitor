<script lang="ts" setup>
import type { Book } from "@prisma/client";

const props = defineProps<{
  book: Book;
  bookId: string;
  refreshBook: () => Promise<void>;
}>();

const formValues = ref(props.book);

const handleFormChange = async () => {
  try {
    await $fetch(`/api/book/${props.bookId}/update`, {
      method: "PUT",
      body: formValues.value,
    });

    await props.refreshBook();
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <FormKit v-model="formValues" type="form" :actions="false" @change="handleFormChange">
    <div class="flex flex-col gap-8 md:flex-row">
      <img :src="formValues?.cover || '/images/book_cover.svg'" alt="Book cover" class="rounded md:w-52 lg:w-72 z-10 h-full md:shadow-md" />
      <div class="flex-1 flex flex-col gap-6 h-min md:mt-8">
        <FormKit data-variant="shadow" name="title" label="Book name" />
        <FormKit data-variant="shadow" name="cover" label="Cover url" />
        <FormKit data-variant="shadow" name="publishing_company" label="Publishing company" />
        <BookDivider />
        <h3 class="text-base font-medium text-gray-600">Author</h3>
        <div>
          <img :src="formValues?.author_picture_url ?? 'https://via.placeholder.com/80x80'" class="w-16 aspect-square object-cover object-center rounded-full mb-3" alt="">
          <FormKit data-variant="shadow" name="author_picture_url" placeholder="http://example.com/" label="Picture url" />
        </div>
        <FormKit data-variant="shadow" label="Author name" name="author_author_name" />
        <BookDivider />
      </div>
    </div>
  </FormKit>
</template>