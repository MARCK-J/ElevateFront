<script setup>
import BaseLayout from "../layouts/sections/components/BaseLayout.vue";
import MaterialInput from "@/components/MaterialInput.vue";
</script>

<template>
  <BaseLayout
    title="Listado de Cursos"
    :breadcrumb="[
      { label: 'Cursos', route: '/' },
      { label: 'Busqueda de cursos' },
    ]"
  >
        <div class="row justify-space-between py-0">
            <MaterialInput
              class="input-group-dynamic mb-4"
              icon="search"
              type="text"
              placeholder="Busqueda por Titulo, categoria, puntuacion"
            />
        </div>
   
  </BaseLayout>
</template>
