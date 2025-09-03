<script setup lang="ts">
import NoteEditor from './components/NoteEditor.vue'
import NotePreview from './components/NotePreview.vue'
import { NotesApi } from './services/notesApi'

import { computed, ref, watch, onMounted } from 'vue'
import { Note } from '@/models/Note'
import NoteList from './components/NoteList.vue'
import { debounce } from '@/composables/Debounce'

const props = defineProps<{ note: Note | null }>()
const debounceTimeInMs = 1000
const notes = ref<Note[]>([])
const activeNoteId = ref<string | null>(null)
const activeNote = computed(() => notes.value.find((n) => n.id === activeNoteId.value) || null)

onMounted(async () => {
  notes.value = await NotesApi.getAll()
})

const debouncedSave = debounce(async (note: Note) => {
  if (note.id) {
    await updateNote(note)
    console.log(
      'Nota guardada automáticamente con debounce de ',
      debounceTimeInMs,
      'ms, id: ' + note.id,
    )
  }
}, debounceTimeInMs)

watch(
  () => props.note,
  (newNote) => {
    if (newNote) debouncedSave(newNote)
  },
  { deep: true },
)

async function updateNote(updatedNote: Note) {
  const note = await NotesApi.update(updatedNote)
  const index = notes.value.findIndex((n) => n.id === note.id)
  notes.value[index] = note
}

async function handleSelect(noteId: string) {
  activeNoteId.value = noteId
  console.log('Nota seleccionada:', noteId)
}

async function handleCreate() {
  const newNote = await NotesApi.create('newTitle', '')
  notes.value.push(newNote)
  activeNoteId.value = newNote.id
}

async function handleDelete(noteId: string) {
  await NotesApi.delete(noteId)
  notes.value = notes.value.filter((n) => n.id !== noteId)
  if (activeNoteId.value === noteId) {
    activeNoteId.value = null
  }
}
</script>

<template>
  <div class="h-dvh flex flex-col overflow-hidden bg-[var(--color-beige)]">
    <h1 class="shrink-0 text-3xl font-bold text-center pt-4">Markdown Notes</h1>
    <div class="flex-1 min-h-0 overflow-hidden">
      <div class="flex h-full w-full gap-4 p-4">
        <NoteList
          :notes="notes"
          @select="handleSelect"
          @create="handleCreate"
          @delete="handleDelete"
          class="w-1/4 shrink-0 h-full overflow-auto"
        />
        <div class="flex-1 min-w-0 h-full overflow-hidden flex flex-col gap-4">
          <NoteEditor :note="activeNote" class="shrink-0" />
          <NotePreview :note="activeNote" class="flex-1 min-h-0 overflow-auto rounded-lg" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
