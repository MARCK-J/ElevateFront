<template>
  <BaseLayout
    title="Listado de Cursos"
    :breadcrumb="[ { label: 'Cursos', route: '/' }, { label: 'Busqueda de cursos' } ]"
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
            required
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
        <RouterLink :to="{ name: 'course', query: { courseId: course.courseId, title: course.title } }">
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
                    <strong>Categoría:</strong> {{ course.categoryName }}
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
        </RouterLink>
      </div>
    </div>
  </BaseLayout>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
import BaseLayout from "../layouts/sections/components/BaseLayout.vue";
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialButton from "@/components/MaterialButton.vue";
import { RouterLink } from "vue-router";

export default {
  components: {
    BaseLayout,
    MaterialInput,
    MaterialButton,
    RouterLink,
  },
  data() {
    return {
      searchQuery: "",
      selectedFilter: "title",
      showDropdown: false,
      courses: [],
      filteredCourses: [],
      itemsPerPage: 10,
    };
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get("http://localhost:9999/api/v1/category/all");
        if (response.data.code === "200-OK") {
          return response.data.result;
        } else {
          console.error("Error al obtener las categorías:", response.data.message);
          return [];
        }
      } catch (error) {
        console.error("Error en la solicitud de categorías:", error);
        return [];
      }
    },
    async fetchCourses() {
      try {
        const response = await axios.get("http://localhost:9999/api/v1/courses/all");
        if (response.data.code === "200-OK") {
          return response.data.result;
        } else {
          console.error("Error al obtener cursos:", response.data.message);
          return [];
        }
      } catch (error) {
        console.error("Error en la solicitud de cursos:", error);
        return [];
      }
    },
    async generateContent() {
      const categories = await this.fetchCategories();
      const courses = await this.fetchCourses();

      // Mapa para organizar las categorías por ID
      const categoryMap = {};
      categories.forEach(category => {
        categoryMap[category.id] = category.nameCategory;
      });

      // Añadir el nombre de la categoría a cada curso
      this.courses = courses.map(course => {
        return {
          ...course,
          categoryName: categoryMap[course.categoryCourseId] || "Sin categoría",
        };
      });

      // Inicialmente mostrar todos los cursos
      this.filteredCourses = this.courses;
    },
    async fetchCoursesByDuration(duration) {
      try {
        const response = await axios.get(`http://localhost:9999/api/v1/courses/duration/${duration}`);
        this.filteredCourses = response.data.result.map(course => {
          return {
            ...course,
            categoryName: this.categoryMap[course.categoryCourseId] || "Sin categoría",
          };
        });
      } catch (error) {
        console.error("Error al obtener cursos por duración:", error);
      }
    },
    async fetchCoursesByRating(rating) {
      try {
        const response = await axios.get(`http://localhost:9999/api/v1/courses/rating/${rating}`);
        this.filteredCourses = response.data.result.map(course => {
          return {
            ...course,
            categoryName: this.categoryMap[course.categoryCourseId] || "Sin categoría",
          };
        });
      } catch (error) {
        console.error("Error al obtener cursos por rating:", error);
      }
    },
    handleSearch() {
      const query = this.searchQuery.toLowerCase();

      if (!this.courses || !Array.isArray(this.courses)) {
        return [];
      }

      return this.courses.filter((course) => {
        switch (this.selectedFilter) {
          case "title":
            return course.title.toLowerCase().includes(query);
          case "category":
            return course.categoryName.toLowerCase().includes(query);
          case "rating":
            return course.rating === Number(query);
          case "duration":
            return course.duration.toLowerCase().includes(query);
          default:
            return course.title.toLowerCase().includes(query);
        }
      });
    },
    updateFilteredCourses() {
      this.filteredCourses = this.handleSearch();
    },
    async executeSearch() {
      console.log("Filtro seleccionado:", this.selectedFilter);
      console.log("Valor de búsqueda:", this.searchQuery);

      if (this.selectedFilter === "duration") {
        await this.fetchCoursesByDuration(this.searchQuery);
      } else if (this.selectedFilter === "rating") {
        await this.fetchCoursesByRating(this.searchQuery);
      } else {
        this.updateFilteredCourses();
      }
    },
    closeDropdown() {
      this.showDropdown = false;
    },
  },
  mounted() {
    this.generateContent();
  },
  computed: {
    displayedCourses() {
      return this.filteredCourses;
    },
  },
};
</script>

<style scoped>
.text-truncate {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.card {
  height: 300px; /* Altura específica para las tarjetas */
  overflow: hidden; /* Ocultar el contenido que se desborda */
  background-color: bisque;
}

.card-body {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.card-text {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
