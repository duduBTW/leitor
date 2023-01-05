<script setup lang="ts">
defineProps<{
  title: string;
  id: string;
  bookCover?: string | null;
  publishingCompany?: string | null;
  authorName?: string | null;
  authorPictureUrl?: string | null;
}>();
</script>

<template>
  <LPopover>
    <template #default="{ isSelected }">
      <NuxtLink class="relative" :to="`/book/${id}`">
        <div class="p-3 bg-white rounded " :class="{
          'outline outline-purple-100': isSelected
        }">
          <img :src="bookCover ?? `/images/book_cover.svg`" :alt="`${title} miniature`" class="rounded border border-purple-100 h-80 md:h-72 w-full object-cover object-center" />
          <h3 class="mt-3 text-base font-medium">{{ title }}</h3>
        </div>
      </NuxtLink>
    </template>

    <template #tooltip>
      <NuxtLink class="relative" :to="`/book/${id}`">
        <div class="text-lg font-bold text-gray-900 mb-1 font-display hover:underline">
          {{title}}
        </div>
      </NuxtLink>

      <div class="text-sm text-purple-500 font-medium">{{ publishingCompany || "Unknown publisher" }}</div>

      <div v-if="authorPictureUrl && authorName" class="flex gap-2 mt-6">
        <img :src="authorPictureUrl" class="w-5 aspect-square rounded-full border border-gray-400/50" />
        <div class="text-sm font-medium text-gray-500">{{ authorName }}</div>
      </div>
    </template>
  </LPopover>
</template>

<style>
.v-popper--theme-info-dropdown .v-popper__inner {
  background: #004499;
}

.v-popper--theme-info-dropdown .v-popper__arrow-inner {
  border-color: #004499;
}
</style>
