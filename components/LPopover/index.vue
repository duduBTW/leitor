<script lang="ts" setup>
const isHidden = ref(false);
const isOpen = ref(false);
const popoverPosition = ref<"right" | "left">("right");
const popoverTrigger = ref<HTMLDivElement>();

const resizeHandler = () => {
  if (!popoverTrigger.value) {
    return;
  }

  const { clientWidth } = document.documentElement;
  const triggerRects = popoverTrigger.value.getBoundingClientRect();
  const isMobileOrTablet = clientWidth < 740;

  isHidden.value = isMobileOrTablet;
  if (isMobileOrTablet) {
    return;
  }

  popoverPosition.value =
    clientWidth - triggerRects.right > 300 ? "right" : "left";
};

onMounted(() => {
  window.addEventListener("resize", resizeHandler);

  resizeHandler();
});

onUnmounted(() => {
  window.removeEventListener("resize", resizeHandler);
});
</script>

<template>
  <div class="relative" ref="popoverTrigger" @mouseenter="isOpen = true" @mouseleave="isOpen = false">
    <slot :isSelected="isOpen" />

    <transition enter-active-class="transition duration-200 ease-out" enter-from-class="translate-y-1 opacity-0 scale-90" enter-to-class="translate-y-0 opacity-100 scale-100">
      <div v-if="!isHidden && isOpen" class="absolute top-2  w-72 z-10 pb-6" :class="{
        'left-full': popoverPosition === 'right',
        'right-full': popoverPosition === 'left',
      }">
        <div class="absolute top-3 w-4 h-4 rounded bg-purple-50 rotate-45" :class="{
        'left-1': popoverPosition === 'right',
        'right-1': popoverPosition === 'left',
      }" />
        <div class="bg-purple-50 rounded shadow-lg px-4 py-4" :class="{
        'ml-2': popoverPosition === 'right',
        'mr-2': popoverPosition === 'left',
      }">
          <slot name="tooltip" />
        </div>
      </div>
    </transition>
  </div>
</template>