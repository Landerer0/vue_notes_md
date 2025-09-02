import axios from 'axios'

const BASE_URL = '/api/notes' // Usa proxy configurado en Vite

// formatear datos para entregarselos a la API
export function useNotesApi() {
  const getAll = async () => {
    const response = await axios.get(BASE_URL)
    console.log(BASE_URL)
    console.log(response.data)
    return response.data
  }

  const create = async (note) => {
    const response = await axios.post(BASE_URL, note)
    console.log(BASE_URL)
    console.log(response.data)
    return response.data
  }

  const update = async (id, note) => {
    const response = await axios.put(`${BASE_URL}/${id}`, note)
    console.log(`${BASE_URL}/${id}`)
    console.log(response.data)
    return response.data
  }

  const remove = async (id) => {
    await axios.delete(`${BASE_URL}/${id}`)
    console.log(`${BASE_URL}/${id}`)
  }

  return {
    getAll,
    create,
    update,
    remove,
  }
}
