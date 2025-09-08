<template>
  <div
    class="fixed modal bg-[var(--color-vanilla)] top-[10%] left-[10%] w-[80%] h-[80%] border rounded border-[var(--color-sage)]"
  >
    <div class="flex flex-row gap-2 p-2 justify-between">
      <button
        class="flex px-4 py-2 bg-[var(--color-beige)] border border-[var(--color-sage)] rounded block hover:bg-[var(--color-sage)]"
        @click="downloadPDF"
      >
        <IconDownload /> Download
      </button>
      <button @click="$emit('close')"><IconX /></button>
    </div>
    <iframe :src="pdfUrl" class="px-2" width="100%" height="90%"></iframe>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { NotesApi } from '@/services/notesApi'
import { IconDownload, IconX } from '@tabler/icons-vue'

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
</style>
