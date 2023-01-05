<script lang="ts" setup>
import type { BookVersion } from "@prisma/client";
import { format } from "date-fns";

const props = defineProps<{
  version: BookVersion;
}>();

const formattedVersion = computed(
  () =>
    props.version.createdDate &&
    format(new Date(props.version.createdDate), "dd/MM/yyyy")
);
</script>

<template>
  <li class="text-base flex gap-3 items-center text-gray-500" :class="{
            'font-bold text-gray-900': version.isActive
          }">
    <div class="rounded-full h-2 w-2" :class="{
        'bg-green-500': version.isActive,
        'border-2 border-red-300': !version.isActive,
      }" />
    <span>Version {{ version.version }}</span>
    <span v-if="formattedVersion" class="font-normal text-gray-400 -ml-3"> . {{ formattedVersion }} </span>
  </li>
</template>