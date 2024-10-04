<script setup>
defineProps({
  id: {
    type: Number,
    default: 0,
    required: false,
  },
});
// Importaciones
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import MaterialButton from "@/components/MaterialButton.vue";
import { useAppStore } from "@/stores";

// Estado para almacenar la información del curso y las lecciones
const courseData = ref({ abilities: "" });
const lessonsData = ref([]);

// Obtener route, router y store
const route = useRoute();
const router = useRouter();
const store = useAppStore();

// Obtener el userId directamente desde el store usando computed
const userId = computed(() => store.getIdentificador);
// Computed para determinar si el usuario es docente
const isDocente = computed(() => {
  if (userId.value === 2) {
    return true;
  } else if (userId.value !== 1 && userId.value !== 2) {
    return false;
  }
  return false;
});
// Estado para controlar la visibilidad del pop-up
const showPopup = ref(false);

// Función para abrir y cerrar el pop-up
const openPopup = () => (showPopup.value = true);
const closePopup = () => (showPopup.value = false);

// Dividir las habilidades en un array
const abilitiesArray = computed(() => courseData.value.abilities.split(";"));

const courseId = route.query.courseId; // Obtener el courseId de la query
// Función para confirmar la inscripción
const confirmInscription = async () => {
  showPopup.value = false; 

  // Verificar el valor de studentUserId
  console.log("studentUserId:", userId.value);
  console.log("courseId:", courseId);

  try {
    const response = await axios.post(
      "http://localhost:9999/api/v1/enrollments/create",
      {
        studentUserId: userId.value,
        coursesCourseId: courseId,
        enrollmentDate: new Date().toISOString().split("T")[0], // Fecha actual en formato YYYY-MM-DD
      },
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (response.data.code === "200-OK") {
      Swal.fire("Éxito", "Inscripción Confirmada!!!", "success");
    } else {
      console.error("Error al crear la inscripción:", response.data.message);
      Swal.fire("Error", "No se pudo confirmar la inscripción.", "error");
    }
  } catch (error) {
    console.error("Error en la solicitud de inscripción:", error);
    Swal.fire("Error", "No se pudo confirmar la inscripción.", "error");
  }
};

// Función para obtener el curso por ID
const fetchCourseById = async (id) => {
  try {
    const response = await axios.get(
      `http://localhost:9999/api/v1/courses/${id}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

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
    const response = await axios.get(
      `http://localhost:9999/api/v1/lessons/course/${courseId}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

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
  if (courseId) {
    fetchCourseById(courseId);
    fetchLessonsByCourseId(courseId); // Llamar a la función para obtener el curso
  }
});

// Función para iniciar una lección
const startLesson = (title) => {
  Swal.fire("Éxito", `Iniciando la leccion : ${title}`, "success");
};

// Estado de la nueva lección
const titleLesson = ref("");
const descriptionLesson = ref("");
const durationLesson = ref("");
const contentLesson = ref("");
const videoLesson = ref("");
const orderLesson = ref(0);

// Función para crear una nueva lección
const createLesson = async () => {
  try {
    // Datos de la nueva lección
    const newLesson = {
      title: titleLesson.value,
      description: descriptionLesson.value,
      duration: durationLesson.value,
      content: contentLesson.value,
      video: videoLesson.value || null, // El video es opcional
      order: orderLesson.value,
      courseId: courseId, // Vincula la lección con el curso
    };

    // Realizar la solicitud POST para crear la lección
    const response = await axios.post(
      "http://localhost:9999/api/v1/lessons/create",
      newLesson,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.code === "200-OK") {
      Swal.fire("Éxito", "La lección ha sido creada exitosamente.", "success");
      // Redirigir o recargar la lista de lecciones
      router.push({ path: "/lessons", query: { courseId: courseId } });
    } else {
      console.error("Error al crear la lección:", response.data.message);
      Swal.fire("Error", "No se pudo crear la lección.", "error");
    }
  } catch (error) {
    console.error("Error en la solicitud de creación de lección:", error);
    Swal.fire("Error", "Hubo un problema al crear la lección.", "error");
  }
};

</script>

<template>
  <div v-if="isDocente" class="opcionesDocentes">
    <div class="container py-2">
      <!-- Button trigger modal -->
      <MaterialButton
        variant="gradient"
        color="success"
        data-bs-toggle="modal"
        data-bs-target="#createLessonModal"
      >
        Crear Nueva Lección
      </MaterialButton>

      <!-- Modal -->
      <div
        class="modal fade"
        id="createLessonModal"
        tabindex="-1"
        aria-labelledby="createLessonModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="createLessonModalLabel">
                Crear Nueva Lección
              </h5>
              <MaterialButton
                color="none"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
              </MaterialButton>
            </div>
            <div class="modal-body">
              <!-- Insertar el formulario aquí -->
              <div class="create-lesson-container">
                <form @submit.prevent="createLesson">
                  <div class="form-container">
                    <div class="first-part">
                      <!-- Título de la Lección -->
                      <div class="field-group">
                        <label for="lesson-title" class="form-label"
                          >Título de la Lección</label
                        >
                        <input
                          id="lesson-title"
                          type="text"
                          class="form-control"
                          v-model="titleLesson"
                          placeholder="Título de la lección"
                          required
                        />
                      </div>

                      <!-- Descripción -->
                      <div class="field-group">
                        <label for="lesson-description" class="form-label"
                          >Descripción</label
                        >
                        <textarea
                          id="lesson-description"
                          class="form-control"
                          v-model="descriptionLesson"
                          placeholder="Descripción de la lección"
                          rows="4"
                          required
                        ></textarea>
                      </div>

                      <!-- Duración -->
                      <div class="field-group">
                        <label for="lesson-duration" class="form-label"
                          >Duración</label
                        >
                        <input
                          id="lesson-duration"
                          type="text"
                          class="form-control"
                          v-model="durationLesson"
                          placeholder="Ej. 1h 30m"
                          required
                        />
                      </div>
                    </div>

                    <div class="second-part">
                      <!-- Contenido -->
                      <div class="field-group">
                        <label for="lesson-content" class="form-label"
                          >Contenido</label
                        >
                        <textarea
                          id="lesson-content"
                          class="form-control"
                          v-model="contentLesson"
                          placeholder="Contenido de la lección"
                          rows="4"
                          required
                        ></textarea>
                      </div>

                      <!-- Enlace de Video -->
                      <div class="field-group">
                        <label for="lesson-video" class="form-label"
                          >Enlace del Video</label
                        >
                        <input
                          id="lesson-video"
                          type="url"
                          class="form-control"
                          v-model="videoLesson"
                          placeholder="URL del video (opcional)"
                        />
                      </div>

                      <!-- Orden -->
                      <div class="field-group">
                        <label for="lesson-order" class="form-label"
                          >Orden</label
                        >
                        <input
                          id="lesson-order"
                          type="number"
                          class="form-control"
                          v-model="orderLesson"
                          placeholder="Orden de la lección"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <!-- Botón para crear lección -->
                  <div class="modal-footer justify-content-between">
                    <MaterialButton
                      variant="gradient"
                      color="dark"
                      data-bs-dismiss="modal"
                    >
                      Cerrar
                    </MaterialButton>
                    <MaterialButton
                      type="submit"
                      variant="gradient"
                      color="success"
                      class="mb-0"
                    >
                      Crear Lección
                    </MaterialButton>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <header>
    <div
      v-if="courseData"
      class="page-header min-vh-100 d-flex align-items-center justify-content-center"
      :style="{
        backgroundImage: `url(${courseData.image})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
      }"
    >
      <span class="mask bg-gradient-dark opacity-7"></span>
      <div class="container text-center text-white">
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <h1 class="display-3 mb-4 font-weight-bold">
              {{ courseData.title }}
            </h1>
            <p class="lead mb-4">
              {{ courseData.description }}
            </p>
            <div v-if="userId === 1 || userId === 2">
              <MaterialButton color="white" class="mt-4" @click="openPopup"
                >Inscribirse</MaterialButton
              >
            </div>
          </div>
        </div>
      </div>
    </div>

    <section class="skills py-5">
      <div class="container">
        <h2 class="text-center mb-5">Habilidades que Obtendrás</h2>
        <ul class="list-unstyled d-flex justify-content-center flex-wrap">
          <li
            v-for="(ability, index) in abilitiesArray"
            :key="index"
            class="mb-4 px-4"
          >
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
          <div
            v-for="(lesson, index) in lessonsData"
            :key="index"
            class="leccion-card"
          >
            <img :src="lesson.image" alt="Lección" class="leccion-image" />
            <div class="leccion-content p-3">
              <h2>{{ lesson.title }}</h2>
              <p><strong>Duración:</strong> {{ lesson.duration }}</p>
              <p>{{ lesson.description }}</p>
              <button @click="startLesson(lesson.title)" class="btn-start">
                Iniciar
              </button>
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
        <MaterialButton color="white" @click="confirmInscription"
          >Confirmar</MaterialButton
        >
        <MaterialButton color="none" @click="closePopup"
          >Cancelar</MaterialButton
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Estilos del formulario y modal */
.create-lesson-container {
  background-color: #fbebd5;
  padding: 2rem;
  border-radius: 12px;
}

.field-group {
  margin-bottom: 1rem;
}

.form-label {
  font-size: 1rem;
  font-weight: 500;
}

.form-control {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
}

.modal-footer .btn-create {
  background-color: #28a745;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.btn-create:hover {
  background-color: #218838;
}
h1.display-3 {
  color: white; /* Cambia el color del título a blanco */
}
/* Fondo de la página principal */
.skills[data-v-607194c2] {
  background-color: #eee3c5;
  padding: 2rem 0;
}
.opcionesDocentes {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: start;
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
