<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";
import BaseLayout from "../layouts/sections/components/BaseLayout.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue"; // Asegúrate de importar el componente

// Variable reactiva para capturar el valor de búsqueda
const searchQuery = ref("");
const selectedFilter = ref("title"); // Filtro seleccionado
const showDropdown = ref(false); // Estado del dropdown
const courses = ref([]); // Datos dinámicos de los cursos
const itemsPerPage = ref(10); // Limitar a 10 cursos por página

// Función para obtener todos los cursos desde la API
const fetchCourses = async () => {
  try {
    const response = await axios.get(
      "http://localhost:9999/api/v1/courses/all"
    );
    courses.value = response.data.result; // Ajusta según la estructura de tu respuesta;
  } catch (error) {
    console.error("Error al obtener cursos:", error);
  }
};

// Filtrar los cursos según el criterio seleccionado
const filteredCourses = computed(() => {
  const query = searchQuery.value.toLowerCase(); // Esto está bien para cadenas de texto

  if (!courses.value || !Array.isArray(courses.value)) {
    return [];
  }

  return courses.value.filter((course) => {
    switch (selectedFilter.value) {
      case "title":
        return course.title.toLowerCase().includes(query); // Aquí puedes seguir usando toLowerCase()
      case "category":
        return course.category?.toLowerCase().includes(query); // Asegúrate de que category existe
      case "rating":
        // Aquí no debes usar toLowerCase(), ya que rating es numérico
        return course.rating === Number(query); // Convertir la búsqueda a número
      case "duration":
        // Igual para duration, debes comparar de forma numérica
        return course.duration.toLowerCase().includes(query);
      default:
        return course.title.toLowerCase().includes(query);
    }
  });
});

// Función para obtener cursos por duración
const fetchCoursesByDuration = async (duration) => {
  console.log("duracion de curso" + duration);
  try {
    const response = await axios.get(
      `http://localhost:9999/api/v1/courses/duration/${duration}`
    );
    courses.value = response.data.result; // Asegúrate de que la respuesta sea la esperada
  } catch (error) {
    console.error("Error al obtener cursos por duración:", error);
  }
};

// Función para obtener cursos por rating
const fetchCoursesByRating = async (rating) => {
  try {
    const response = await axios.get(
      `http://localhost:9999/api/v1/courses/rating/${rating}`
    );
    courses.value = response.data.result; // Asegúrate de que la respuesta sea la esperada
  } catch (error) {
    console.error("Error al obtener cursos por rating:", error);
  }
};

// Cursos que se mostrarán en la página actual
const displayedCourses = computed(() => {
  return filteredCourses.value;
});

// Función para cerrar el dropdown
const closeDropdown = () => {
  showDropdown.value = false;
};

// Función para ejecutar la búsqueda (opcional)
const executeSearch = () => {
  console.log("Filtro seleccionado:", selectedFilter.value);
  console.log("Valor de búsqueda:", searchQuery.value);

  if (selectedFilter.value === "duration") {
    fetchCoursesByDuration(searchQuery.value);
  } else if (selectedFilter.value === "rating") {
    fetchCoursesByRating(searchQuery.value);
  } else {
    console.log("Buscando por título o categoría:", searchQuery.value);
  }
};

// Cargar cursos al montar el componente
onMounted(() => {
  fetchCourses();
});
</script>

<template>
  <BaseLayout
    title="Listado de Cursos"
    :breadcrumb="[
      { label: 'Cursos', route: '/' },
      { label: 'Busqueda de cursos' },
    ]"
  >
    <div class="">
      <div class="row justify-space-between py-0">
        <div class="input-group">
          <span class="input-group-text">
            <i class="fas fa-search" aria-hidden="true"></i>
          </span>
          <input
            v-model="searchQuery"
            type="text"
            class="form-control input-group-dynamic mb-2"
            placeholder="Buscar por titulo, categoria, puntuación o duración"
            Required
          />
        </div>
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
            Filtrar por:
            {{
              selectedFilter.charAt(0).toUpperCase() + selectedFilter.slice(1)
            }}
          </MaterialButton>

          <ul
            class="dropdown-menu px-2 py-3"
            :class="{ show: showDropdown }"
            aria-labelledby="dropdownMenuButton"
          >
            <li>
              <a
                class="dropdown-item"
                @click="
                  selectedFilter = 'title';
                  closeDropdown();
                "
                >Título</a
              >
            </li>
            <li>
              <a
                class="dropdown-item"
                @click="
                  selectedFilter = 'category';
                  closeDropdown();
                "
                >Categoría</a
              >
            </li>
            <li>
              <a
                class="dropdown-item"
                @click="
                  selectedFilter = 'rating';
                  closeDropdown();
                "
                >Puntuación</a
              >
            </li>
            <li>
              <a
                class="dropdown-item"
                @click="
                  selectedFilter = 'duration';
                  closeDropdown();
                "
                >Duración</a
              >
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div class="row">
      <div
        class="col-md-6 mb-4"
        v-for="course in displayedCourses"
        :key="course.courseId"
      >
        <div class="card h-100">
          <div class="row g-0">
            <div class="col-md-4 d-flex align-items-center">
              <img
                :src="course.image"
                class="img-fluid rounded-start mx-auto"
                alt="Imagen del curso"
              />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{{ course.title }}</h5>
                <p class="card-text text-truncate">{{ course.description }}</p>
                <p class="card-text">
                  <small class="text-muted">
                    Disponibilidad:
                    <span v-if="course.available" class="text-success"
                      >Disponible</span
                    >
                    <span v-else class="text-danger">No disponible</span>
                  </small>
                </p>
                <p class="card-text">
                  <strong>Habilidades:</strong>
                  {{ course.abilities.split(";").join(", ") }}
                </p>
                <p class="card-text">
                  <strong>Categoría:</strong> {{ course.category }}
                </p>
                <p class="card-text">
                  <strong>Puntuación:</strong> {{ course.rating }}
                </p>
                <p class="card-text">
                  <strong>Duración:</strong> {{ course.duration }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<style scoped>
.text-truncate {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
