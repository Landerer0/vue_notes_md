<script setup lang="ts">
import { marked } from 'marked'
import { Note } from '@/models/Note';

const props = defineProps<{
  note: Note | null
}>()
</script>

<template>
  <div class="flex-1 p-4" style="background-color: var(--color-buff)">
    <div v-if="props.note" class="w-full">
      <h3 class="text-center font-bold text-4xl">{{ props.note.title }}</h3>
      <!-- Markdown renderizado -->
      <div
        class="prose max-w-full text-justify break-words"
        v-html="marked(props.note.content)"
      ></div>
    </div>
    <div v-else>
      <p>Selecciona una nota para ver la vista previa</p>
    </div>
  </div>
</template>

<style scoped></style>
