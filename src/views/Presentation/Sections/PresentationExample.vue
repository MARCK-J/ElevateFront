<script setup>
import { ref, onMounted } from "vue";
import ExampleCard from "../Components/ExampleCard.vue";
import MaterialBadge from "../../../components/MaterialBadge.vue";
import axios from "axios";

const imagesPrefix =
  "https://raw.githubusercontent.com/creativetimofficial/public-assets/master/material-design-system/presentation/sections";

// Estado para almacenar los datos
const data = ref([]);

// Función para obtener las categorías desde el endpoint
const fetchCategories = async () => {
  try {
    const response = await axios.get("http://localhost:9999/api/v1/category/all");
    if (response.data.code === "200-OK") {
      return response.data.result; // Devuelve las categorías
    } else {
      console.error("Error al obtener las categorías:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("Error en la solicitud de categorías:", error);
    return [];
  }
};

// Función para obtener los cursos desde el endpoint
const fetchCourses = async () => {
  try {
    const response = await axios.get("http://localhost:9999/api/v1/courses/all");
    if (response.data.code === "200-OK") {
      return response.data.result; // Devuelve los cursos
    } else {
      console.error("Error al obtener los cursos:", response.data.message);
      return [];
    }
  } catch (error) {
    console.error("Error en la solicitud de cursos:", error);
    return [];
  }
};

// Función para generar el contenido dinámicamente
const generateContent = async () => {
  const categories = await fetchCategories();
  const courses = await fetchCourses();

  // Mapa para organizar los cursos por categoría
  const categoryMap = {};

  // Agrupar los cursos por categoryCourseId
  courses.forEach(course => {
    const categoryId = course.categoryCourseId;
    if (!categoryMap[categoryId]) {
      categoryMap[categoryId] = [];
    }
    categoryMap[categoryId].push({
      image: "", // Imagen vacía por ahora
      title: course.title,
      available: course.available,
      route: "" // Define la ruta correspondiente si es necesario
    });
  });

  // Crear la estructura final para cada categoría con sus cursos
  data.value = categories.map(category => {
    return {
      heading: category.nameCategory,
      items: categoryMap[category.id] || [] // Obtener los cursos correspondientes a la categoría
    };
  });
};

// Llamar a la función en el montaje del componente
onMounted(() => {
  generateContent();
});

</script>

<template>
  <section class="my-5 py-5">
    <div class="container">
      <div class="row justify-content-center text-center mb-5">
        <div class="col-lg-8">
          <MaterialBadge color="primary" class="mb-3">
            Explora nuestras colecciones de cursos
          </MaterialBadge>
          <h2 class="text-primary mb-3">Aquí empieza tu preparación para el futuro</h2>
          <p class="lead text-muted">
            Estamos comprometidos con tu educación, ofreciéndote los mejores cursos en un solo lugar.
          </p>
        </div>
      </div>
    </div>
    <div class="container">
      <div
        v-for="({ heading, items }, index) in data"
        :key="heading"
        :class="`row ${index > 0 ? 'pt-lg-5' : ''}`"
      >
        <div :class="`col-lg-4`">
          <div
            class="sticky-top pb-lg-5 pb-3 mt-lg-0 mt-5 px-3"
            style="top: 100px"
          >
            <h3 class="text-dark font-weight-bold mb-3">{{ heading }}</h3>
          </div>
        </div>
        <div :class="`col-lg-8`">
          <div :class="`row ${index > 0 ? 'mt-4' : ''}`">
            <div
              class="col-md-6 col-lg-4 mt-4"
              v-for="{ image, title, available, route } in items"
              :key="title"
            >
              <ExampleCard
                class="min-height-200 shadow-lg rounded-3 p-3"
                :image="image"
                :title="title"
                :route="route"
              />
              <p class="text-muted">{{ available ? 'Disponible' : 'No disponible' }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<style scoped>
/* Estilo general para la sección */
section {
  background-color: #c3dbe4; /* Fondo suave para destacar el contenido */
}

/* Estilo para el título principal */
h2 {
  font-family: 'Montserrat', sans-serif; /* Fuente moderna */
  font-size: 2.5rem; /* Tamaño del texto */
  font-weight: 700; /* Peso del texto */
  color: #007bff; /* Color primario */
}

/* Estilo para el texto de párrafo */
p.lead {
  font-family: 'Open Sans', sans-serif; /* Fuente legible */
  font-size: 1.125rem; /* Tamaño del texto */
  color: #2f3235; /* Color de texto suave */
}

/* Estilo para las tarjetas */
.ExampleCard {
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Transición suave para efectos */
}

.ExampleCard:hover {
  transform: translateY(-10px); /* Efecto de elevación al pasar el ratón */
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2); /* Sombra más prominente */
}
</style>
