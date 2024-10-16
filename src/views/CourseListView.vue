<script setup>
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import BaseLayout from "../layouts/sections/components/BaseLayout.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue"; // Asegúrate de importar el componente

// Variable reactiva para capturar el valor de búsqueda
const searchQuery = ref('');
const selectedFilter = ref('title'); // Filtro seleccionado
const showDropdown = ref(false); // Estado del dropdown
const courses = ref([]); // Datos dinámicos de los cursos
const itemsPerPage = ref(10); // Limitar a 10 cursos por página

// Función para obtener todos los cursos desde la API
const fetchCourses = async () => {
  try {
    const response = await axios.get('http://localhost:9999/api/v1/courses/all'); // Asegúrate de que la URL sea correcta
    courses.value = response.data.data; // Ajusta según la estructura de tu respuesta
  } catch (error) {
    console.error("Error al obtener cursos:", error);
  }
};

// Filtrar los cursos según el criterio seleccionado
const filteredCourses = computed(() => {
  const query = searchQuery.value.toLowerCase();

  // Asegúrate de que courses.value esté definido y sea un array
  if (!courses.value || !Array.isArray(courses.value)) {
    return []; // Devuelve un array vacío si no hay cursos
  }

  return courses.value.filter(course => {
    switch (selectedFilter.value) {
      case 'title':
        return course.title.toLowerCase().includes(query);
      case 'category':
        return course.category.toLowerCase().includes(query);
      case 'rating':
        // Filtrar por rating, asegurando que se compara como número
        return course.rating >= parseFloat(query); // Filtrar cursos con rating igual o mayor
      case 'duration':
        // Filtrar por duración, asegurando que se compara como número
        return course.duration >= parseInt(query); // Filtrar cursos con duración igual o mayor
      default:
        return course.title.toLowerCase().includes(query); // Búsqueda por defecto en título
    }
  });
});

// Cursos que se mostrarán en la página actual
const displayedCourses = computed(() => {
  return filteredCourses.value.slice(0, itemsPerPage.value); // Muestra solo los primeros 10 cursos
});

// Función para cerrar el dropdown
const closeDropdown = () => {
  showDropdown.value = false;
};

// Función para ejecutar la búsqueda (opcional)
const executeSearch = () => {
  console.log("Buscando:", searchQuery.value);
};

// Cargar cursos al montar el componente
onMounted(() => {
  fetchCourses();
});
</script>

<template>
  <BaseLayout
    title="Listado de Cursos"
    :breadcrumb="[ { label: 'Cursos', route: '/' }, { label: 'Busqueda de cursos' } ]"
  >
    <!-- Contenedor de búsqueda -->
    <div class="">
      <div class="row justify-space-between py-0">
        <MaterialInput
          v-model="searchQuery"
          class="input-group-dynamic mb-2"
          type="text"
          icon="search"
          placeholder="Buscar..."
        />
      </div>
      
      <div class="col-4 d-flex align-items-center">
        <MaterialButton
          variant="gradient"
          color="primary"
          @click="executeSearch"
        >
          Buscar
        </MaterialButton>
      </div>

      <!-- Dropdown de filtros -->
      <div class="col-12 mt-3">
        <div class="dropdown" @mouseleave="closeDropdown">
          <MaterialButton
            variant="gradient"
            color="success"
            class="dropdown-toggle"
            id="dropdownMenuButton"
            @click="showDropdown = !showDropdown"
            aria-expanded="showDropdown"
          >
            Filtrar por: {{ selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1) }}
          </MaterialButton>

          <ul
            class="dropdown-menu px-2 py-3"
            :class="{ show: showDropdown }"
            aria-labelledby="dropdownMenuButton"
          >
            <li>
              <a class="dropdown-item" @click="selectedFilter = 'title'; closeDropdown()">Título</a>
            </li>
            <li>
              <a class="dropdown-item" @click="selectedFilter = 'category'; closeDropdown()">Categoría</a>
            </li>
            <li>
              <a class="dropdown-item" @click="selectedFilter = 'rating'; closeDropdown()">Puntuación</a>
            </li>
            <li>
              <a class="dropdown-item" @click="selectedFilter = 'duration'; closeDropdown()">Duración</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Tarjetas de cursos -->
    <div class="row">
      <div
        class="col-md-6 mb-4"
        v-for="course in displayedCourses"
        :key="course.id"
      >
        <div class="card h-100">
          <div class="row g-0">
            <div class="col-md-4 d-flex align-items-center">
              <img :src="course.image" class="img-fluid rounded-start mx-auto" alt="Imagen del curso">
            </div>
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
                <p class="card-text"><strong>Categoría:</strong> {{ course.category }}</p>
                <p class="card-text"><strong>Puntuación:</strong> {{ course.rating }}</p>
                <p class="card-text"><strong>Duración:</strong> {{ course.duration }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>
