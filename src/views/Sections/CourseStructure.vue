<script setup>
defineProps({
  id: {
    type: Number,
    default: 0,
    required: false,
  },
});
import { ref, onMounted, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Swal from "sweetalert2";
import MaterialButton from "@/components/MaterialButton.vue";
import { useAppStore } from "@/stores";


// Estado para almacenar la información del curso
const courseData = ref({
  abilities: ""
});

const route = useRoute();// Obtener la ruta actual
const router = useRouter(); // Usar el router para navegar
const store = useAppStore();
const lessonsData = ref([]);

// Obtener el userId directamente desde el store usando computed
const userId = computed(() => store.getIdentificador);

// Imagen de fondo
//const bgImage = "https://midu.dev/images/wallpapers/una-taza-de-javascript.png";

// Estado para controlar la visibilidad del pop-up
const showPopup = ref(false);

// Función para abrir el pop-up
const openPopup = () => {
  showPopup.value = true;
};

// Función para cerrar el pop-up
const closePopup = () => {
  showPopup.value = false;
};

const abilitiesArray = computed(() => {
  return courseData.value.abilities.split("; ");
});

// Función para confirmar la inscripción
const confirmInscription = async () => {
  showPopup.value = false; // Obtener el userId del store
  const courseId = route.query.courseId; // Obtener el courseId de la query

  // Verificar el valor de studentUserId
  console.log('studentUserId:', userId.value);
  console.log('courseId:', courseId);

  try {
    const response = await axios.post('http://localhost:9999/api/v1/enrollments/create', {
      studentUserId: userId.value,
      coursesCourseId: courseId,
      enrollmentDate: new Date().toISOString().split('T')[0], // Fecha actual en formato YYYY-MM-DD
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    if (response.data.code === "200-OK") {
      Swal.fire('Éxito', 'Inscripción Confirmada!!!', 'success');
    } else {
      console.error("Error al crear la inscripción:", response.data.message);
      Swal.fire('Error', 'No se pudo confirmar la inscripción.', 'error');
    }
  } catch (error) {
    console.error("Error en la solicitud de inscripción:", error);
    Swal.fire('Error', 'No se pudo confirmar la inscripción.', 'error');
  }
};

// Función para obtener el curso por ID
const fetchCourseById = async (id) => {
  try {
    const response = await axios.get(`http://localhost:9999/api/v1/courses/${id}`, {
      headers: {
        Accept: 'application/json',
      },
    });
    
    if (response.data.code === "200-OK") {
      courseData.value = response.data.result;
      await fetchLessonsByCourseId(id); // Guardar el curso
    } else {
      console.error("Error al obtener el curso:", response.data.message);
    }
  } catch (error) {
    console.error("Error en la solicitud del curso:", error);
  }
};

// Función para obtener las lecciones por courseId
const fetchLessonsByCourseId = async (courseId) => {
  try {
    const response = await axios.get(`http://localhost:9999/api/v1/lessons/course/${courseId}`, {
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.data.code === "200-OK") {
      lessonsData.value = response.data.result; // Guardar las lecciones
    } else {
      console.error("Error al obtener las lecciones:", response.data.message);
    }
  } catch (error) {
    console.error("Error en la solicitud de lecciones:", error);
  }
};

// Llamar a la función en el montaje del componente
onMounted(() => {
  const courseId = route.query.courseId; // Obtener el courseId de la consulta
  if (courseId) {
    fetchCourseById(courseId);
    fetchLessonsByCourseId(courseId); // Llamar a la función para obtener el curso
  }
});
  
  // Función para iniciar una lección
  const startLesson = (title) => {
    Swal.fire('Éxito', `Iniciando la leccion : ${title}`, 'success');
  };
  
  // Función para ir hacia atrás
  const goBack = () => {
    router.push('/'); 
  };

</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-transparent shadow-none">
      <div class="container">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar-header-2"
          aria-controls="navbar-header-2"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbar-header-2"></div>
      </div>
    </nav>

    <div
      v-if = "courseData"
      class="page-header min-vh-100 d-flex align-items-center justify-content-center"
      :style="{ 
        backgroundImage: `url(${courseData.image})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }"
    >
      <span class="mask bg-gradient-dark opacity-7"></span>
      <div class="container text-center text-white">
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <h1 class="display-3 mb-4 font-weight-bold">{{ courseData.title }}</h1>
            <p class="lead mb-4">
              {{ courseData.description }}
            </p>
            <MaterialButton color="white" class="mt-4" @click="openPopup">Inscribirse</MaterialButton>
          </div>
        </div>
      </div>
    </div>
    
    <section class="skills py-5">
      <div class="container">
        <h2 class="text-center mb-5">Habilidades que Obtendrás</h2>
        <ul class="list-unstyled d-flex justify-content-center flex-wrap">
          <li v-for="(ability, index) in abilitiesArray" :key="index" class="mb-4 px-4">
            <i class="fas fa-check-circle mr-2"></i> {{ ability }}
          </li>
        </ul>
      </div>
    </section>

    <div class="info-curso py-5">
      <div class="container">
        <h1 class="text-center mb-5">Listado de Lecciones</h1>
        <div class="lecciones-list d-flex justify-content-center flex-wrap">
          <!-- Itera sobre lessonsData para mostrar las lecciones -->
          <div v-for="(lesson, index) in lessonsData" :key="index" class="leccion-card">
            <img :src="lesson.image" alt="Lección" class="leccion-image" />
            <div class="leccion-content p-3">
              <h2>{{ lesson.title }}</h2>
              <p><strong>Duración:</strong> {{ lesson.duration }}</p>
              <p>{{ lesson.description }}</p>
              <button @click="startLesson(lesson.title)" class="btn-start">Iniciar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <!-- Popup de confirmación -->
  <div v-if="showPopup" class="popup-overlay">
    <div class="popup">
      <h2>Confirmar Inscripción</h2>
      <p>¿Estás seguro de que deseas inscribirte en este curso?</p>
      <div class="popup-buttons">
        <MaterialButton color="white" @click="confirmInscription">Confirmar</MaterialButton>
        <MaterialButton color="none" @click="closePopup">Cancelar</MaterialButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
h1.display-3 {
  color: white; /* Cambia el color del título a blanco */
}
/* Fondo de la página principal */
.skills[data-v-607194c2] {
    background-color: #eee3c5;
    padding: 2rem 0;
}
.page-header {
  position: relative;
  background-size: cover;
  background-position: center;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgb(170, 158, 133);
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

/* Sección de Habilidades */
.skills {
  background-color: #f3f3f3;
  padding: 2rem 0;
}

.skills ul {
  font-size: 1.2rem;
  list-style: none;
  padding: 0;
  display: flex;
  justify-content: space-around; 
  flex-wrap: wrap; 
}

.skills ul li {
  background-color: #28a745;
  color: white;
  padding: 1.5rem 2rem; 
  margin: 10px 20px; 
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, background-color 0.3s ease;
  min-width: 220px; 
}

.skills ul li:hover {
  background-color: #218838;
  transform: translateY(-5px);
}

.skills ul li i {
  margin-right: 10px;
}


/* Listado de Lecciones */
.lecciones-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  background-color: #f0c0c7;
  padding: 2rem 0;
}

.leccion-card {
  width: 260px;
  margin: 20px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.leccion-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
}

.leccion-image {
  width: 100%;
  border-radius: 12px 12px 0 0;
  height: 150px;
  object-fit: cover;
}

.leccion-content {
  padding: 1.5rem;
  background-color: #ffedda;
}

.leccion-content h2 {
  font-size: 1.3rem;
  color: #333;
  margin-bottom: 0.5rem;
}

.leccion-content p {
  font-size: 1rem;
  color: #555;
}

.btn-start {
  background-color: #ffc107;
  color: #333;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
}

.btn-start:hover {
  background-color: #e0a800;
}

/* Sección del Instructor */

.bg-light {
    background-color: #c5d9f7 !important;
}
.instructor {

  padding: 2rem 0;
}

.instructor-info {
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: left;
}

.instructor-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-right: 20px;
  border: 2px solid #ffc107;
}

.instructor-bio h3 {
  font-size: 1.5rem;
  color: #333;
}

.instructor-bio p {
  font-size: 1.1rem;
  color: #2b2626;
}

/* Popup overlay */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup {
  background-color: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  text-align: center;
  width: 300px;
}

.popup h2 {
  font-size: 1.4rem;
  margin-bottom: 1rem;
  color: #333;
}

.popup-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 1.5rem;
}

.popup-buttons button {
  padding: 0.5rem 1.2rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.popup-buttons button:first-child {
  background-color: #28a745;
  color: white;
}

.popup-buttons button:first-child:hover {
  background-color: #218838;
}

.popup-buttons button:last-child {
  background-color: #ffc107;
  color: #333;
}

.popup-buttons button:last-child:hover {
  background-color: #e0a800;
}

</style>
