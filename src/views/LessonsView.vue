<template>
   <BaseLayout
    :title="lessonData?.title || 'Título de la lección'"
    :breadcrumb="[ 
      { label: 'cursos', route: '/' },
      { label: courseTitle, route: '/' },
      { label: lessonData?.title || 'Título de la lección' },
    ]"
  >
    <div class="container">
      <main class="main-content">
        <div class="video-container" v-if="lessonData && lessonData.video">
          <iframe
            :src="getEmbedUrl(lessonData.video)"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
        <div v-else>
          <p>No hay video disponible.</p>
        </div>

        <aside class="sidebar">
          <div class="download-section">
            <h3>Archivos descargables</h3>
            <ul>
              <li>
                <a href="#" class="btn-download-exercise"
                  >Ejercicios de práctica</a
                >
              </li>
              <li>
                <a href="#" class="btn-download-resource"
                  >PDF - Teoría de la lección</a
                >
              </li>
            </ul>
          </div>
          <div class="evaluation-section">
            <h3>Evaluación de la lección</h3>
            <p>Una vez terminada la lección, realice la evaluación.</p>
            <button @click="evaluateLesson" class="btn-evaluate">
              Ingresar aquí
            </button>
          </div>
        </aside>
      </main>

      <div class="lesson-info" v-if="lessonData">
        <h2>{{ lessonData.title }}</h2>
        <p>Duración: {{ lessonData.duration }}</p>
        <h3>{{ lessonData.description }}</h3>
        <p>{{ lessonData.content }}</p>
        <ul>
          <li>Orden de la lección: {{ lessonData.order }}</li>
          <li v-if="lessonData.complete">Lección completa</li>
          <li v-else>Lección no completada</li>
        </ul>
      </div>

      <!-- Popup para crear cuestionario -->
      <div v-if="showQuizPopup" class="popup-overlay">
        <div class="popup-content">
          <button @click="showQuizPopup = false" class="btn-close-popup">X</button>
          <CuestionarioLeccion :lessonId="lessonId" />
        </div>
      </div>
    </div>
  </BaseLayout>
</template>

<script>
import { useRoute, useRouter } from "vue-router";
import { computed, ref, onMounted } from "vue";
import BaseLayout from "../layouts/sections/components/BaseLayout.vue";
import axios from "axios";


export default {
  components: {
    BaseLayout,
  },
  setup() {
    // Acceder a la ruta actual
    const route = useRoute();
    const router = useRouter();

    // Extraer `courseId` y `courseTitle` de la query
    const courseId = computed(() => route.query.courseId || 0);
    const courseTitle = computed(() => route.query.courseTitle || "");
    const lessonId = computed(() => route.query.lessonId || "");

    const lessonData = ref(null); // Para almacenar los datos de la lección

    // Función para obtener la lección por `lessonId`
    const fetchLessonById = async (lessonId) => {
      try {
        const response = await axios.get(
          `http://localhost:9999/api/v1/lessons/${lessonId.value}`, // Usar el lessonId para la consulta
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (response.data.code === "200-OK") {
          lessonData.value = response.data.result; // Guardar los datos de la lección
          console.log(lessonData.value)
        } else {
          console.error("Error al obtener la lección:", response.data.message);
        }
      } catch (error) {
        console.error("Error al obtener la lección:", error);
      }
    };

    // Llamar a la función en el montaje del componente
    onMounted(() => {
      if (lessonId.value) {
        fetchLessonById(lessonId); // Llamar a la función para obtener la lección
      }
    });

    const goBack = () => {
      window.history.back(); // Alternativa a this.$router.go(-1)
    };

    // Función para convertir la URL del video a una URL embebida
    const getEmbedUrl = (url) => {
      let videoId = null;
      if (url.includes('youtube.com')) {
        videoId = url.split('v=')[1]?.split('&')[0];
      } else if (url.includes('youtu.be')) {
        videoId = url.split('youtu.be/')[1]?.split('?')[0];
      }
      return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
    };

    return {
      courseId,
      courseTitle,
      lessonData, // Devolver los datos de la lección al template
      goBack,
      getEmbedUrl,
    };
  },
};
</script>

<style scoped>
/* Estilos globales */
body {
  font-family: "Poppins", sans-serif;
  background-color: #f8f8d9;
  margin: 0;
  padding: 0;
}

/* Contenedor principal */
.container {
  display: flex;
  flex-direction: column;
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Estilo del encabezado */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  background-color: #f8f8d9;
  padding: 10px 20px;
  color: #fff;
  border-radius: 8px;
}

.btn-back {
  margin-right: auto; /* Empuja el botón hacia la izquierda */
  background-color: #f76c6c;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn-back:hover {
  background-color: #f44747;
}

/* Estilo del contenido principal */
.main-content {
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 20px;
}

/* Video */
.video-container {
  flex: 2;
}

.video-container iframe {
  width: 100%;
  height: 400px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Sección de descarga y evaluación */
.download-section,
.evaluation-section {
  background-color: #f8f8d9;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.btn-download-exercise {
  display: inline-block;
  background-color: #1231e0; /* Color de fondo azul */
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.btn-download-resource {
  display: inline-block;
  background-color: #f50e21; /* Color de fondo azul */
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.btn-download:hover {
  background-color: #0056b3; /* Color al pasar el mouse */
}

.evaluation-section {
  background-color: #e0f7e9; /* Color de fondo verde claro */
}

.btn-evaluate {
  background-color: #086b1d;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: block;
  width: 100%;
  text-align: center;
  margin-top: 10px; /* Espacio adicional en la parte superior */
}

.btn-evaluate:hover {
  background-color: #1f1e38;
}

/* Información de la lección */
.lesson-info {
  flex: 1 0 100%; /* Full width */
  background-color: #f8f8d9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-top: 20px; /* Espacio adicional en la parte superior */
}

.lesson-info h2 {
  font-size: 22px;
  color: #2b2e4a;
  margin-bottom: 10px;
}

.lesson-info p {
  color: #4a4a4a;
  line-height: 1.6;
}

.lesson-info ul {
  list-style-type: none;
  padding-left: 0;
}

.lesson-info ul li {
  margin-bottom: 10px;
  position: relative;
}

.lesson-info ul li::before {
  content: "•";
  color: #f76c6c;
  font-weight: bold;
  position: absolute;
  left: -20px;
}

/* Barra lateral */
.sidebar {
  flex: 1;
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.sidebar h3 {
  font-size: 18px;
  color: #2b2e4a;
  margin-bottom: 10px;
}

.sidebar ul {
  list-style-type: none;
  padding: 0;
}

.sidebar ul li {
  margin-bottom: 15px;
}

</style>
