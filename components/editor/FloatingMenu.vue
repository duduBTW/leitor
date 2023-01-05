<script setup lang="ts">
import { Editor, FloatingMenu } from "@tiptap/vue-3";
import type { FloatingMenu as FloatingMenuType } from "@tiptap/vue-3";
const props = defineProps<{
  editor: Editor | undefined;
}>();

const addImage = () => {
  if (!props.editor) return;
  const url = window.prompt("URL");

  if (url) {
    props.editor.chain().focus().setImage({ src: url }).run();
  }
};

// Base source Tiptap `extension-floating-menu`
// https://github.com/ueberdosis/tiptap/blob/main/packages/extension-floating-menu/src/floating-menu-plugin.ts#L36
const shouldShow = ({
  view,
  state,
  editor,
}: {
  view: import("prosemirror-view").EditorView;
  state: import("prosemirror-state").EditorState;
  editor: import("@tiptap/core").Editor;
}) => {
  const { selection } = state;
  const { $anchor, empty } = selection;
  const isRootDepth = $anchor.depth === 1;
  const isEmptyTextBlock =
    $anchor.parent.isTextblock &&
    !$anchor.parent.type.spec.code &&
    !$anchor.parent.textContent;

  if (!view.hasFocus() || !empty || !isRootDepth || !isEmptyTextBlock) {
    return false;
  }

  if ($anchor.parent.type.name === "heading") {
    return false;
  }

  return true;
};
</script>

<template>
  <floating-menu :editor="editor" :should-show="shouldShow" :tippy-options="{ duration: 100 }" v-if="editor" class="px-3 py-1  bg-indigo-50 flex gap-3 rounded items-center justify-center">
    <LButtonIcon @click="addImage">
      <Icon name="ri:image-line" :class="{ 'text-purple-700': editor.isActive('bulletList') }" />
    </LButtonIcon>
    <LButtonIcon @click="editor?.chain().focus().toggleBulletList().run()">
      <Icon name="ri:list-unordered" :class="{ 'text-purple-700': editor.isActive('bulletList') }" />
    </LButtonIcon>
    <LButtonIcon @click="editor?.chain().focus().toggleOrderedList().run()">
      <Icon name="ri:list-ordered" :class="{ 'text-purple-700': editor.isActive('orderedList') }" />
    </LButtonIcon>
  </floating-menu>
</template>
