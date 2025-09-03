<template>
  <div class="modal">
    <canvas ref="canvas"></canvas>
    <!-- Agregar iconos y css -->
    <button @click="downloadPDF">Download PDF</button>
    <button @click="$emit('close')">Close Modal</button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist'
import axios from 'axios'
import { NotesApi } from '@/services/notesApi'


GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString()

const canvas = ref<HTMLCanvasElement | null>(null)

onMounted(async () => {
  const pdfData = await NotesApi.getTitlesPdf('titulos-notas-vue')
  const loadingTask = getDocument({ data: pdfData })
  const pdf = await loadingTask.promise
  const page = await pdf.getPage(1)
  const viewport = page.getViewport({ scale: 1.5 })

  const context = canvas.value!.getContext('2d')!
  canvas.value!.height = viewport.height
  canvas.value!.width = viewport.width

  await page.render({
    canvasContext: context,
    canvas: canvas.value!,
    viewport: viewport,
  }).promise
})


async function downloadPDF() {
  try {
    const pdfBlob = await NotesApi.downloadTitlesPdf('titulos-notas-vue')
    const url = URL.createObjectURL(pdfBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'titulos-notas-vue.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  } catch (error) {
    console.error('Error al descargar el PDF:', error)
  }
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
  overflow: auto;
}
</style>
