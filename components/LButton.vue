<script lang="ts" setup>
export interface ButtonProps {
  fullWidth?: boolean;
  variant?: "primary" | "secondary" | "text";
  loading?: boolean;
}

withDefaults(defineProps<ButtonProps>(), {
  variant: "primary",
});
</script>

<template>
  <button class="py-2 px-5 rounded text-base font-bold hover:shadow-md disabled:bg-gray-400 disabled:text-white flex gap-2 items-center justify-center" :disabled="loading" :class="{ 
      ['w-full']: fullWidth, 
      ['bg-indigo-500 text-white shadow border-solid border-t-1 border-indigo-100']: variant === 'primary', 
      ['bg-indigo-100 text-indigo-900']: variant === 'secondary',
      ['text-indigo-900']: variant === 'text'
    }">
    <slot name="start" />

    <slot v-if="!loading" />
    <div v-else>loading...</div>

    <slot name="end" />
  </button>
</template>