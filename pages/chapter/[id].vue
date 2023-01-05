<script setup lang="ts">
import { debounce } from "lodash";
import { elementToSVG, inlineResources } from "dom-to-svg";

// Tiptap
import {
  useEditor,
  EditorEvents,
  EditorContent,
  BubbleMenu,
} from "@tiptap/vue-3";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Document from "@tiptap/extension-document";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import Image from "@tiptap/extension-image";

const route = useRoute();
const { data } = await useFetch(() => `/api/chapter/${route.params.id}`);
const headings = [
  { id: "p", name: "Paragraph", level: null },
  { id: 2, name: "Title 2", level: 2 },
  { id: 3, name: "Title 3", level: 3 },
  { id: 4, name: "Title 4", level: 4 },
] as const;
const selectedHeading = ref(headings[0].id);

const onUpdate = debounce(async ({ editor }: EditorEvents["update"]) => {
  let svgString: string = "";

  try {
    const editorElement = document.querySelector(".ProseMirror");
    if (!editorElement) return;

    const svgDocument = elementToSVG(editorElement);
    await inlineResources(svgDocument.documentElement);

    svgString = new XMLSerializer().serializeToString(svgDocument);

    // Remove fixed width and height
    svgString = svgString
      .replace(/width=["'](.*?)["']/, 'width="100%"')
      .replace(/height=["'](.*?)["']/, 'height="100%"');
  } catch (error) {
    console.error(error);
  }

  await $fetch(`/api/chapter/${route.params.id}/save`, {
    method: "PUT",
    body: {
      html: editor.getHTML(),
      json: JSON.stringify(editor.getJSON()),
      miniature: svgString,
    },
  });
}, 200);

const BookDocument = Document.extend({
  content: "heading block*",
});

const editor = useEditor({
  content: data?.value?.html,
  extensions: [
    StarterKit.configure({
      document: false,
    }),
    BookDocument,
    Placeholder.configure({
      placeholder: ({ node }) => {
        if (node.type.name === "heading" && node.attrs.level === 1) {
          return "Titulo do capitulo";
        }

        return "";
      },
    }),
    BulletList,
    OrderedList,
    Image,
  ],
  onUpdate,
  onSelectionUpdate: ({ editor }) => {
    const { selection } = editor.state;
    const { $anchor } = selection;

    if ($anchor.parent.type.name === "heading") {
      const { level } = editor.getAttributes("heading");
      selectedHeading.value = level;
    }

    selectedHeading.value = "p";
  },
  editorProps: {
    attributes: {
      class: "w-full bg-white px-8 py-9 rounded min-h-[800px] mb-6 shadow-sm",
      spellcheck: "false",
    },
  },
});
</script>

<template>
  <ClientOnly>
    <EditorBubbleMenu :headings="headings" :selectedHeading="selectedHeading" :editor="editor" />
    <EditorFloatingMenu :editor="editor" />
    <div class="max-w-2xl mx-auto w-full">
      <NuxtLink class="mb-2 ml-2 md:ml-0 flex items-center gap-2 text-blue-400" :to="`/book/${data?.bookId}`">
        <Icon name="ri:arrow-left-line" size="16px" />
        <span>Back to book</span>
      </NuxtLink>
      <EditorContent :editor="editor" />
    </div>
  </ClientOnly>
</template>