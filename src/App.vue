<script setup lang="ts">
import NoteEditor from './components/NoteEditor.vue'
import NotePreview from './components/NotePreview.vue'
import NotesApi from '../services/notesApi'

import { computed, ref, watch, onMounted } from 'vue'
import NoteList from './components/NoteList.vue'

class Note {
  id: string
  title: string
  content: string // Markdown

  constructor(id: string, title: string, content: string) {
    this.id = id
    this.title = title
    this.content = content
  }
}

// QUEDA INCORPORAR CONEXIÓN DE LAS NOTAS CON EL BACKEND: Formato y la entrega de datos desde frontend a backend
onMounted(async () => {
  notes.value = await NotesApi.getAll()
})

async function addNote(newNote: Note) {
  const note = await NotesApi.create(newNote)
  notes.value.push(note)
}

async function deleteNote(id: string) {
  await NotesApi.remove(id)
  notes.value = notes.value.filter((n) => n.id !== id)
}

async function updateNote(id: string, updatedNote: Note) {
  const note = await NotesApi.update(id, updatedNote)
  const index = notes.value.findIndex((n) => n.id === id)
  notes.value[index] = note
}

// Cargar notas y contador de id desde localStorage
function loadNotes(): Note[] {
  const raw = localStorage.getItem('notes')
  if (!raw)
    return [
      new Note('1', 'Primera nota', '# Hola mundo'),
      new Note('2', 'Segunda nota', 'Texto **markdown** de ejemplo'),
    ]
  try {
    const arr = JSON.parse(raw)
    return arr.map((n: any) => new Note(n.id, n.title, n.content))
  } catch {
    return []
  }
}

function loadNoteIdCounter(): number {
  const raw = localStorage.getItem('noteIdCounter')
  const initialNumberOfNotes = 2
  if (raw) return parseInt(raw, 10)
  else return initialNumberOfNotes
}

const notes = ref<Note[]>(loadNotes())
const noteIdCounter = ref<number>(loadNoteIdCounter())
const activeNoteId = ref<string | null>(null)
const activeNote = computed(() => notes.value.find((n) => n.id === activeNoteId.value) || null)

watch(
  notes,
  (val) => {
    localStorage.setItem('notes', JSON.stringify(val))
  },
  { deep: true },
)

watch(noteIdCounter, (val) => {
  localStorage.setItem('noteIdCounter', val.toString())
})

function handleSelect(noteId: string) {
  activeNoteId.value = noteId
  console.log('Nota seleccionada:', noteId)
}

function handleCreate() {
  noteIdCounter.value += 1
  const newId = noteIdCounter.value.toString()
  notes.value.push(new Note(newId, 'Nueva nota ' + newId, ''))
  activeNoteId.value = newId
}

function handleDelete(noteId: string) {
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
