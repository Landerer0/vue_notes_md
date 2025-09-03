<script setup lang="ts">
import NoteEditor from '@/components/NoteEditor.vue'
import NotePreview from '@/components/NotePreview.vue'
import { NotesApi } from '@/services/notesApi'

import { computed, ref, watch, onMounted } from 'vue'
import { Note } from '@/models/Note'
import NoteList from '@/components/NoteList.vue'
import { debounce } from '@/composables/Debounce'

const props = defineProps<{ note: Note | null }>()
const debounceTimeInMiliseconds = 1000
const notes = ref<Note[]>([])
const activeNote = ref<Note | null>(null)

onMounted(async () => {
  notes.value = await NotesApi.getAll()
})

const debouncedSave = debounce(async (note: Note) => {
  const noteToSave = new Note(note.id, note.title, note.content, note.createdAt, note.updatedAt)

  if (noteToSave.id) {
    await updateNote(noteToSave)
    console.log(
      'Nota guardada automáticamente con debounce de ',
      debounceTimeInMiliseconds,
      'ms, id: ' + noteToSave.id,
    )
  }
}, debounceTimeInMiliseconds)

watch(
  activeNote,
  (newNote) => {
    if (newNote) {
      debouncedSave(newNote)
      console.log('Se detectó un cambio en la nota activa:', newNote.id)
    }
  },
  { deep: true },
)

async function updateNote(noteToUpdate: Note) {
  const updatedNote = await NotesApi.update(noteToUpdate)
  const index = notes.value.findIndex((n) => n.id === updatedNote.id)
  notes.value[index] = updatedNote
}

async function handleSelect(selectedNote: Note) {
  activeNote.value = selectedNote
  console.log('Nota seleccionada:', activeNote.value.id)
}

async function handleCreate() {
  const newNote = await NotesApi.create('newTitle', '')
  notes.value.push(newNote)
  activeNote.value = newNote
}

async function handleDelete(noteToDelete: Note) {
  await NotesApi.delete(noteToDelete.id)
  notes.value = notes.value.filter((n) => n.id !== noteToDelete.id)
  if (activeNote.value && activeNote.value.id === noteToDelete.id) {
    activeNote.value = null
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
