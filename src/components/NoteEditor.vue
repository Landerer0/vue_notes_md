<script setup lang="ts">
import { Note } from '@/models/Note';

const props = defineProps<{
  note: Note | null
}>()
</script>

<template>
  <div
    class="flex-1 p-4 rounded bg-[var(--color-sage)] max-h-[400px] overflow-y-auto flex flex-col"
  >
    <div v-if="props.note" class="flex flex-col h-full">
      <div class="flex items-center gap-2">
        <h3>Title:</h3>
        <input
          v-model="props.note.title"
          class="border rounded px-2 py-1 flex-1 bg-[var(--input-bg)]"
        />
      </div>
      <textarea
        class="border rounded p-2 flex-1 resize-none my-2 text-justify w-full break-words bg-[var(--input-bg)]"
        style="min-height: 100px"
        v-model="props.note.content"
      ></textarea>
    </div>
    <div v-else>
      <p>Selecciona una nota para editar</p>
    </div>
  </div>
</template>

<style scoped></style>
