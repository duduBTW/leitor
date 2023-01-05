<script setup lang="ts">
import { Editor, BubbleMenu } from "@tiptap/vue-3";
import {
  Listbox,
  ListboxButton,
  ListboxOptions,
  ListboxOption,
  TransitionRoot,
} from "@headlessui/vue";
import { debounce } from "lodash";

interface Heading {
  id: string | number;
  name: string;
  level: null | import("@tiptap/extension-heading").Level;
}

const props = defineProps<{
  editor: Editor | undefined;
}>();
const headings: Heading[] = [
  { id: "p", name: "Paragraph", level: null },
  { id: 2, name: "Title 2", level: 2 },
  { id: 3, name: "Title 3", level: 3 },
  { id: 4, name: "Title 4", level: 4 },
];
const selectedHeading = ref<Heading>(headings[0]);

const onSelecionUpdate = debounce(
  ({ editor }: { editor: import("@tiptap/core").Editor }) => {
    const { selection } = editor.state;
    const { $anchor } = selection;

    if ($anchor.parent.type.name === "heading") {
      const { level } = editor.getAttributes("heading");
      if (level === 1) return;

      const updatedHeading = headings.find(
        (heading) => heading.level === level
      );
      if (!updatedHeading) return;

      selectedHeading.value = updatedHeading;
      return;
    }

    selectedHeading.value = headings[0];
  },
  100
);

onMounted(() => {
  props.editor?.on("selectionUpdate", onSelecionUpdate);
});

onUnmounted(() => {
  props.editor?.off("selectionUpdate", onSelecionUpdate);
});
</script>

<template>
  <bubble-menu :shouldShow="({ editor, from, to }) => !editor.isActive('image') && !editor.isActive('heading', { level: 1 }) && from !== to" :editor="editor" :tippy-options="{ duration: 100 }" v-if="editor" class="px-3 py-1 bg-purple-50 flex gap-3 rounded shadow-md items-center justify-center">
    <Listbox v-model="selectedHeading">
      <div class="relative">
        <ListboxButton class="relative w-full cursor-default rounded text-left pr-6 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-300 sm:text-sm">
          <span class="truncate">{{ selectedHeading.name }}</span>
          <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-0">
            <Icon name="ri:arrow-down-s-line" class="text-gray-500" />
          </span>
        </ListboxButton>

        <ListboxOptions class="absolute mt-2 max-h-60 w-40 overflow-auto rounded-md bg-purple-50 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <ListboxOption v-slot="{ active, selected }" v-for="heading in headings" :key="heading.name" :value="heading" as="template">
            <li @click="() => {
              if(!heading.level) {
                editor?.chain().setParagraph().run()
                return;
              }
              editor?.chain().setHeading({ level: heading.level }).run()
            }" :class="[
                  active ? 'bg-purple-100 text-purple-900' : 'text-gray-900',
                  'relative cursor-default select-none py-1.5 px-3',
                ]">
              <span :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]">{{ heading.name }}</span>
              <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                <CheckIcon class="h-5 w-5" aria-hidden="true" />
              </span>
            </li>
          </ListboxOption>
        </ListboxOptions>
      </div>
    </Listbox>

    <div class="h-4 bg-gray-300 w-px" />
    <LButtonIcon @click="editor?.chain().focus().toggleBold().run()">
      <Icon :class="{ 'text-purple-700': editor.isActive('bold') }" name="ri:bold" />
    </LButtonIcon>
    <LButtonIcon @click="editor?.chain().focus().toggleItalic().run()">
      <Icon :class="{ 'text-purple-700': editor.isActive('italic') }" name="ri:italic" />
    </LButtonIcon>
    <LButtonIcon @click="editor?.chain().focus().toggleStrike().run()">
      <Icon :class="{ 'text-purple-700': editor.isActive('strike') }" name="ri:strikethrough" />
    </LButtonIcon>
    <!-- <div class="h-4 bg-gray-300 w-px" />
    <LButtonIcon @click="editor?.chain().focus().toggleStrike().run()">
      <Icon :class="{ 'text-purple-700': editor.isActive('strike') }" name="ri:footprint-line" />
    </LButtonIcon>
    <LButtonIcon @click="editor?.chain().focus().toggleStrike().run()">
      <Icon :class="{ 'text-purple-700': editor.isActive('strike') }" name="ri:link" />
    </LButtonIcon> -->
  </bubble-menu>
</template>