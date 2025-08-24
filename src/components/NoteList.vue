<script setup lang="ts">
// Define la prop 'notes' como un array de objetos tipo Note
const props = defineProps<{
  notes: Array<{
    id: string
    title: string
    content: string
  }>
}>()

const emit = defineEmits<{
  (e: 'select', noteId: string): void
  (e: 'create'): void
  (e: 'delete', noteId: string): void
}>()
</script>

<template>
  <div class="p-4 rounded bg-[var(--color-vanilla)]">
    <h2 class="text-2xl text-center font-semibold mb-2">Notes</h2>
    <ul
      class="max-h-[400px] overflow-y-auto bg-[var(--color-beige)] rounded border-[var(--color-sage)] border p-2 list-disc pl-10"
    >
      <li
        v-for="note in props.notes"
        :key="note.id"
        class="mb-2 py-1 note-content hover:bg-[var(--color-sage)] rounded cursor-pointer"
        @click="emit('select', note.id)"
      >
        <div class="flex items-center justify-between">
          <p class="font-semibold cursor-pointer break-words" @click="emit('select', note.id)">
            {{ note.title }}
          </p>
          <button
            class="ml-2 p-2 py-1 rounded text-red-600 font-bold"
            @click.stop="emit('delete', note.id)"
            title="Delete"
          >
            ×
          </button>
        </div>
      </li>
    </ul>
    <button
      class="mt-4 px-4 py-2 bg-[var(--color-beige)] border border-[var(--color-sage)] rounded mx-auto block hover:bg-[var(--color-sage)]"
      @click="emit('create')"
    >
      Add Note
    </button>
  </div>
</template>

<style scoped>
/* Puedes agregar estilos aquí si lo deseas */
</style>
