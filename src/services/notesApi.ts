import axios from 'axios'
import { Note } from '@/models/Note'

const BASE_URL = '/api/notes'

export const NotesApi = {
  async getAll(): Promise<Note[]> {
    const response = await axios.get(BASE_URL)
    return response.data.result.map((n: any) => Note.fromJson(n))
  },

  async create(title: string, content: string): Promise<Note> {
    const response = await axios.post(BASE_URL, {
      title: title,
      content: content,
    })
    return Note.fromJson(response.data.result)
  },

  async update(note: Note): Promise<Note> {
    console.log('Updating note:', note) // Debug log
    const response = await axios.put(`${BASE_URL}/${note.id}`, {
      title: note.title,
      content: note.content,
    })
    return Note.fromJson(response.data.result)
  },

  async delete(id: string): Promise<void> {
    await axios.delete(`${BASE_URL}/${id}`)
  },
}
