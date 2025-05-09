<script setup lang="ts">
import type { Album } from '@/models/album'
import type { Artista } from '@/models/artista'
import type { Cancion } from '@/models/cancion'
import type { Genero } from '@/models/genero'
import http from '@/plugins/axios'
import { InputMask, Select } from 'primevue'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import InputText from 'primevue/inputtext'
import { computed, ref, watch } from 'vue'

const ENDPOINT = 'canciones'
const props = defineProps({
  mostrar: Boolean,
  cancion: {
    type: Object as () => Cancion,
    default: () => ({}) as Cancion,
  },
  modoEdicion: Boolean,
})
const emit = defineEmits(['guardar', 'close'])

const generos = ref<Genero[]>([])
const artistas = ref<Artista[]>([])
const albumes = ref<Album[]>([])

const dialogVisible = computed({
  get: () => props.mostrar,
  set: (value) => {
    if (!value) emit('close')
  },
})

const artista = ref<Artista>({} as Artista)
const cancion = ref<Cancion>({ ...props.cancion })

async function obtenerGeneros() {
  generos.value = await http.get('generos').then((response) => response.data)
}

async function obtenerArtistas() {
  artistas.value = await http.get('artistas').then((response) => response.data)
}

async function obtenerAlbumes() {
  albumes.value = await http.get(`albumes/artista/${artista.value.id}`).then((res) => res.data)
}

async function handleSave() {
  try {
    const body = {
      idAlbum: cancion.value.album.id,
      idGenero: cancion.value.genero.id,
      nombre: cancion.value.nombre,
      duracion: cancion.value.duracion,
      tags: cancion.value.tags,
      url: cancion.value.url,
    }
    if (props.modoEdicion) {
      await http.patch(`${ENDPOINT}/${cancion.value.id}`, body)
    } else {
      await http.post(ENDPOINT, body)
    }
    emit('guardar')
    cancion.value = {} as Cancion
    dialogVisible.value = false
  } catch (error: any) {
    alert(error?.response?.data?.message)
  }
}

watch(
  () => props.mostrar,
  (nuevoValor) => {
    if (nuevoValor) {
      obtenerGeneros()
      obtenerArtistas()

      if (props.cancion.id) {
        cancion.value = { ...props.cancion }
        artista.value.id = cancion.value.album.artista.id
        obtenerAlbumes()
      }
    }
  },
)
</script>

<template>
  <div class="card flex justify-center">
    <Dialog
      v-model:visible="dialogVisible"
      :header="(props.modoEdicion ? 'Editar' : 'Crear') + ' Canción'"
      style="width: 25rem"
    >
      <div class="flex items-center gap-4 mb-4">
        <label for="genero" class="font-semibold w-3">Género</label>
        <Select
          id="genero"
          v-model="cancion.genero.id"
          :options="generos"
          optionLabel="descripcion"
          optionValue="id"
          class="flex-auto"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="artista" class="font-semibold w-3">Artista</label>
        <Select
          id="artista"
          v-model="artista.id"
          :options="artistas"
          optionLabel="nombre"
          optionValue="id"
          class="flex-auto"
          autofocus
          @change="obtenerAlbumes()"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="album" class="font-semibold w-3">Album</label>
        <Select
          id="album"
          v-model="cancion.album.id"
          :options="albumes"
          optionLabel="nombre"
          optionValue="id"
          class="flex-auto"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="nombre" class="font-semibold w-3">Nombre</label>
        <InputText
          id="nombre"
          v-model="cancion.nombre"
          class="flex-auto"
          autocomplete="off"
          maxlength="40"
          autofocus
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="duracion" class="font-semibold w-3">Duración</label>
        <InputMask
          id="duracion"
          v-model="cancion.duracion"
          class="flex-auto"
          autocomplete="off"
          mask="99:99"
          placeholder="03:15"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="tags" class="font-semibold w-3">Tags</label>
        <InputText
          id="tags"
          v-model="cancion.tags"
          class="flex-auto"
          autocomplete="off"
          maxlength="30"
        />
      </div>
      <div class="flex items-center gap-4 mb-4">
        <label for="url" class="font-semibold w-3">URL</label>
        <InputText
          id="url"
          v-model="cancion.url"
          class="flex-auto"
          autocomplete="off"
          maxlength="250"
        />
      </div>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          icon="pi pi-times"
          severity="secondary"
          @click="dialogVisible = false"
        ></Button>
        <Button type="button" label="Guardar" icon="pi pi-save" @click="handleSave"></Button>
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
