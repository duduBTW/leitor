<script lang="ts" setup>
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  DialogDescription,
} from "@headlessui/vue";
import { CreateBookSchema } from "~~/server/api/book/create.post";

const isOpen = ref(false);
const router = useRouter();
const { data } = await useFetch(() => `/api/book`);

const setIsOpen = (value: boolean) => {
  isOpen.value = value;
};

const submitHandler = async (formData: CreateBookSchema) => {
  try {
    const { id } = await $fetch("/api/book/create", {
      method: "POST",
      body: formData,
    });

    await navigateTo(`/book/${id}`);
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <!-- Header -->
  <div v-if="!data || data.length === 0">
    <div class="flex flex-col items-center justify-center">
      <h1 class="text-4xl font-bold">Create a book</h1>
      <p class="mt-3 text-gray-500">Add a book to start your sales!</p>
      <LButton :loading="false" class="mt-12" @click="setIsOpen(true)">
        <template #start>
          <Icon name="ri:add-line" />
        </template>

        Create
      </LButton>
    </div>
  </div>

  <!-- Body -->
  <div v-else class="container">

    <!-- Empty -->
    <div class="flex gap-3 md:gap-4">
      <input placeholder="Search..." type="text" class="w-full px-4 py-2 rounded" />
      <LButton autoFocus="true" @click="setIsOpen(true)">
        <template #start>
          <Icon name="ri:add-line" />
        </template>

        <span class="hidden md:visible">
          Create
        </span>
      </LButton>
    </div>

    <!-- Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 my-6 gap-2 md:gap-6">
      <BookCard v-for="book in data" :key="book.id" :title="book.title" :id="book.id" :book-cover="book.cover" :publishing-company="book.publishing_company" :author-name="book.author_author_name" :author-picture-url="book.author_picture_url" />
    </div>
  </div>

  <!-- Create dialog -->
  <ClientOnly>
    <Dialog :open="isOpen" @close="setIsOpen" class="relative z-50">
      <div class="fixed inset-0 bg-white/30 backdrop-blur-sm" aria-hidden="true" />

      <div class="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel class="w-full max-w-lg rounded bg-white p-6 shadow-lg">
          <FormKit id="form" #default="{ state: { loading } }" :config="{ validationVisibility: 'submit' }" type="form" @submit="submitHandler" :actions="false">
            <DialogTitle class="text-lg font-bold mb-3">Create a book</DialogTitle>
            <FormKit validation="required" data-variant="outlined" label="Book name" name="title" />
            <div class="flex gap-2 mt-8">
              <LButton type="button" class="ml-auto" variant="text" @click="setIsOpen(false)">Cancel</LButton>
              <LButton :loading="loading" type="submit">
                Finish

                <template #end>
                  <Icon name="ri:send-plane-2-line" />
                </template>
              </LButton>
            </div>
          </FormKit>
        </DialogPanel>
      </div>
    </Dialog>
  </ClientOnly>
</template>