<script setup lang="ts">
import { IconCirclePlus, IconX } from '@tabler/icons-vue'

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
  <div class="rounded bg-[var(--color-vanilla)] p-4 flex flex-col gap-2">
    <div class="flex w-full items-center justify-between">
      <h2 class="pl-2 text-2xl font-semibold">Notes</h2>
      <button
        class="flex px-4 py-2 bg-[var(--color-beige)] border border-[var(--color-sage)] rounded block hover:bg-[var(--color-sage)]"
        @click="emit('create')"
      >
        <IconCirclePlus class="w-6 h-6 mr-1" /> New
      </button>
    </div>
    <ul
      class="flex-1 overflow-y-auto bg-[var(--color-beige)] rounded border-[var(--color-sage)] border gap-2 list-disc pl-6"
    >
      <li
        class="mb-2 note-content rounded cursor-pointer group"
        v-for="note in props.notes"
        :key="note.id"
        @click="emit('select', note.id)"
      >
        <div class="flex items-center justify-between">
          <p
            class="font-semibold cursor-pointer break-words group-hover:underline"
            @click="emit('select', note.id)"
          >
            {{ note.title }}
          </p>
          <button
            class="px-2 py-1 rounded text-red-600 font-bold group-hover:no-underline decoration-transparent"
            @click.stop="emit('delete', note.id)"
            title="Delete"
          >
            <IconX class="w-4 h-4" />
          </button>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Puedes agregar estilos aquí si lo deseas */
</style>
