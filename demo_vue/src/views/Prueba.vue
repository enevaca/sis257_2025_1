<script setup lang="ts">
import ListaItem from '@/components/ListaItem.vue'
import { ref } from 'vue'

const titulo = ref<string>('Página de Prueba')
const contador = ref<number>(0)
const colores = ref([
  { clave: 'red', valor: 'Rojo' },
  { clave: 'yellow', valor: 'Amarillo' },
  { clave: 'green', valor: 'Verde' },
  { clave: 'blue', valor: 'Azul' },
])
</script>

<template>
  <div>
    <h1>{{ titulo }} - {{ contador }}</h1>
    <button @click="contador++">Incrementar</button>
    Cambiar título: <input type="text" v-model="titulo" />
    <p v-if="contador % 2 == 0">Es Par</p>
    <p v-else>Es Impar</p>
    <ul>
      <ListaItem v-for="(color, i) in colores" :color="color" :key="i" />
    </ul>
  </div>
</template>

<style scoped></style>
