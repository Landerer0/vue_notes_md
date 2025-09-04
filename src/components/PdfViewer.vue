<template>
  <div class="modal">
    <iframe :src="pdfUrl" width="100%" height="100%"></iframe>
    <button @click="downloadPDF">Download PDF</button>
    <button @click="$emit('close')">Close Modal</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NotesApi } from '@/services/notesApi'

const pdfUrl = ref('')

onMounted(async () => {
  const pdfBlob = await NotesApi.downloadTitlesPdf('titulos-notas-vue')
  pdfUrl.value = URL.createObjectURL(pdfBlob)
})

async function downloadPDF() {
  const link = document.createElement('a')
  link.href = pdfUrl.value
  link.download = 'titulos-notas-vue.pdf'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
</script>

<style scoped>
.modal {
  position: fixed;
  top: 10%;
  left: 10%;
  width: 80%;
  height: 80%;
  background: white;
  border: 1px solid #ccc;
  padding: 1rem;
  overflow: hidden;
}
</style>
