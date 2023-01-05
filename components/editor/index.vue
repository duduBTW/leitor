<script setup lang="ts">
import { useEditor, EditorEvents, EditorContent } from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import { debounce } from "lodash";
import Heading from "@tiptap/extension-heading";

const onUpdate = debounce(async ({ editor }: EditorEvents["update"]) => {
  //
}, 200);

const editor = useEditor({
  content: "<p>teste</p>",
  extensions: [StarterKit, Heading],
  onUpdate,
  editorProps: {
    attributes: {
      class:
        "max-w-xl mx-auto w-full bg-white p-10 pt-8 rounded min-h-[800px] mb-6",
      spellcheck: "false",
    },
  },
});
</script>

<template>
  <ClientOnly>
    <EditorContent :editor="editor" />
  </ClientOnly>
</template>