<script setup>
import { ref } from 'vue';
import BaseLayout from "../layouts/sections/components/BaseLayout.vue";
import MaterialInput from "@/components/MaterialInput.vue";

// Aquí declaras una variable reactiva para capturar el valor de búsqueda
const searchQuery = ref('');

// Datos estáticos de los cursos
const courses = ref([
  {
    id: 1,
    title: "Curso de Vue.js Avanzado",
    description: "Aprende Vue.js en profundidad, desde los componentes hasta la gestión del estado con Vuex.",
    image: "https://via.placeholder.com/150", // Imagen de ejemplo
    available: true,
    skills: ["Vue.js", "JavaScript", "Vuex"]
  },
  {
    id: 2,
    title: "Spring Boot para Principiantes",
    description: "Una introducción completa a Spring Boot, uno de los frameworks más populares de Java.",
    image: "https://via.placeholder.com/150",
    available: false,
    skills: ["Java", "Spring Boot", "APIs REST"]
  },
  {
    id: 3,
    title: "Desarrollo Full-Stack con Spring y Vue.js",
    description: "Crea aplicaciones full-stack con Spring Boot en el backend y Vue.js en el frontend.",
    image: "https://via.placeholder.com/150",
    available: true,
    skills: ["Vue.js", "Spring Boot", "Desarrollo Full-Stack"]
  }
]);
</script>

<template>
  <BaseLayout
    title="Listado de Cursos"
    :breadcrumb="[ { label: 'Cursos', route: '/' }, { label: 'Busqueda de cursos' } ]"
  >
    <!-- Input de búsqueda -->
    <div class="row justify-space-between py-0">
      <MaterialInput
        v-model="searchQuery"
        class="input-group-dynamic mb-4"
        icon="search"
        type="text"
        placeholder="Busqueda por Titulo, categoria, puntuacion"
      />
    </div>

    <!-- Tarjetas de cursos -->
    <div class="row">
      <div
        class="col-md-6 mb-4"
        v-for="course in courses"
        :key="course.id"
      >
        <div class="card h-100">
          <div class="row g-0">
            <!-- Contenedor de la imagen, usando d-flex y align-items-center para centrarla -->
            <div class="col-md-4 d-flex align-items-center">
              <img :src="course.image" class="img-fluid rounded-start mx-auto" alt="Imagen del curso">
            </div>
            <!-- Contenido de la tarjeta -->
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{{ course.title }}</h5>
                <p class="card-text">{{ course.description }}</p>
                <p class="card-text">
                  <small class="text-muted">
                    Disponibilidad: <span v-if="course.available" class="text-success">Disponible</span>
                    <span v-else class="text-danger">No disponible</span>
                  </small>
                </p>
                <p class="card-text"><strong>Habilidades:</strong> {{ course.skills.join(', ') }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>
