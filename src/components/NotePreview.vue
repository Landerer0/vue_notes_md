<script setup lang="ts">
import { marked } from 'marked'

const props = defineProps<{
  note: {
    id: string
    title: string
    content: string
  } | null
}>()
</script>

<template>
  <div class="p-4 rounded" style="background-color: var(--color-buff)">
    <div v-if="props.note" class="w-full break-words">
      <h3 class="text-center font-bold">{{ props.note.title }}</h3>
      <!-- Markdown renderizado -->
      <div class="prose prose-sm max-w-none" v-html="marked(props.note.content)"></div>
    </div>
    <div v-else>
      <p>Selecciona una nota para ver la vista previa</p>
    </div>
  </div>
</template>

<style scoped></style>
