<script setup lang="ts">
const props = defineProps<{
  note: {
    id: string
    title: string
    content: string
  } | null
}>()
</script>

<template>
  <div class="p-4 rounded bg-[var(--color-sage)] max-h-[400px] overflow-y-auto flex flex-col">
    <div v-if="props.note" class="flex flex-col flex-1">
      <div class="flex items-center gap-2">
        <h3>Title:</h3>
        <input v-model="props.note.title" class="border rounded px-2 py-1 flex-1" />
      </div>
      <textarea
        class="border rounded p-2 flex-1 resize-none my-2 w-full break-words"
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
