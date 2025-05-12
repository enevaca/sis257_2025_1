<script setup lang="ts">
import type { Cancion } from '@/models/cancion'
import http from '@/plugins/axios'
import { Column, DataTable, Dialog, InputGroup, InputGroupAddon, InputText } from 'primevue'
import Button from 'primevue/button'
import { computed, onMounted, ref } from 'vue'

const ENDPOINT = 'canciones'
const canciones = ref<Cancion[]>([])
const emit = defineEmits(['edit'])
const cancionDelete = ref<Cancion | null>(null)
const mostrarConfirmDialog = ref<boolean>(false)
const busqueda = ref<string>('')

async function obtenerLista() {
  canciones.value = await http.get(ENDPOINT).then((response) => response.data)
}

const cancionesFiltrados = computed(() => {
  return canciones.value.filter(
    (cancion) =>
      cancion.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      cancion.genero.descripcion.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      cancion.album.artista.nombre.toLowerCase().includes(busqueda.value.toLowerCase()) ||
      cancion.album.nombre.toLowerCase().includes(busqueda.value.toLowerCase()),
  )
})

function emitirEdicion(cancion: Cancion) {
  emit('edit', cancion)
}

function mostrarEliminarConfirm(cancion: Cancion) {
  cancionDelete.value = cancion
  mostrarConfirmDialog.value = true
}

async function eliminar() {
  await http.delete(`${ENDPOINT}/${cancionDelete.value?.id}`)
  obtenerLista()
  mostrarConfirmDialog.value = false
}

onMounted(() => {
  obtenerLista()
})
defineExpose({ obtenerLista })
</script>

<template>
  <div>
    <div class="col-7 pl-0 mt-2">
      <InputGroup>
        <InputGroupAddon><i class="pi pi-search"></i></InputGroupAddon>
        <InputText v-model="busqueda" type="text" placeholder="Buscar por nombre" />
      </InputGroup>
    </div>
    <div>
      <DataTable
        :value="cancionesFiltrados"
        paginator
        scrollable
        scrollHeight="flex"
        :rows="5"
        :rowsPerPageOptions="[5, 10, 20, 50]"
        tableStyle="min-width: 50rem"
        paginatorTemplate="RowsPerPageDropdown FirstPageLink PrevPageLink CurrentPageReport NextPageLink LastPageLink"
        currentPageReportTemplate="{first} a {last} de {totalRecords}"
      >
        <Column
          field="genero.descripcion"
          header="Género"
          sortable
          style="min-width: 100px"
        ></Column>
        <Column
          field="album.artista.nombre"
          header="Artista"
          sortable
          style="min-width: 100px"
        ></Column>
        <Column field="album.nombre" header="Album" sortable style="min-width: 100px"></Column>
        <Column field="nombre" header="Nombre" sortable style="min-width: 100px"></Column>
        <Column field="duracion" header="Duración" style="min-width: 100px"></Column>
        <Column field="tags" header="Tags" style="min-width: 100px"></Column>
        <Column field="url" header="URL" style="min-width: 100px"></Column>
        <Column header="Acciones" frozen alignFrozen="right" style="min-width: 120px">
          <template #body="{ data }">
            <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(data)" />
            <Button
              icon="pi pi-trash"
              aria-label="Eliminar"
              severity="danger"
              text
              @click="mostrarEliminarConfirm(data)"
            />
          </template>
        </Column>
      </DataTable>
    </div>
    <table v-if="false">
      <thead>
        <tr>
          <th>Nro.</th>
          <th>Género</th>
          <th>Artista</th>
          <th>Album</th>
          <th>Nombre</th>
          <th>Duración</th>
          <th>Tags</th>
          <th>URL</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(cancion, index) in cancionesFiltrados" :key="cancion.id">
          <td>{{ index + 1 }}</td>
          <td>{{ cancion.genero.descripcion }}</td>
          <td>{{ cancion.album.artista.nombre }}</td>
          <td>{{ cancion.album.nombre }}</td>
          <td>{{ cancion.nombre }}</td>
          <td>{{ cancion.duracion }}</td>
          <td>{{ cancion.tags }}</td>
          <td>{{ cancion.url }}</td>
          <td>
            <Button icon="pi pi-pencil" aria-label="Editar" text @click="emitirEdicion(cancion)" />
            <Button
              icon="pi pi-trash"
              aria-label="Eliminar"
              severity="danger"
              text
              @click="mostrarEliminarConfirm(cancion)"
            />
          </td>
        </tr>
        <tr v-if="cancionesFiltrados.length === 0">
          <td colspan="4">No se encontraron resultados.</td>
        </tr>
      </tbody>
    </table>

    <Dialog
      v-model:visible="mostrarConfirmDialog"
      header="Confirmar Eliminación"
      :style="{ width: '25rem' }"
    >
      <p>¿Estás seguro de que deseas eliminar este registro?</p>
      <div class="flex justify-end gap-2">
        <Button
          type="button"
          label="Cancelar"
          severity="secondary"
          @click="mostrarConfirmDialog = false"
        />
        <Button type="button" label="Eliminar" @click="eliminar" />
      </div>
    </Dialog>
  </div>
</template>

<style scoped></style>
