<script>
// Importaciones
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Swal from "sweetalert2";
import MaterialButton from "@/components/MaterialButton.vue";
import { useAppStore } from "@/stores";
import CourseModal from "./CourseModal.vue";

export default {
  props: {
    id: {
      type: Number,
      default: 0,
      required: false,
    },
  },
  components: {
    MaterialButton,
    CourseModal,
  },
  data() {
    return {
      courseData: { abilities: "" },
      inscrito: false,
      showPopup: false,
      showDeletePopup: false, // Nueva variable para el pop-up de eliminar
      selectedLesson: null, // Variable para la lección seleccionada para eliminar
      lessons: [],
      showModal: false, // Asegúrate de que show esté definido aquí
      courseId: 0,
      store: useAppStore(), // Inicializamos el store aquí
    };
  },
  computed: {
    // Obtener el userId y rolId desde el store
    userId() {
      return this.store.getIdentificador;
    },
    rolId() {
      return this.store.getTipoPersona;
    },
    // Computed para determinar si el usuario es docente o estudiante
    isDocente() {
      return this.rolId === 2;
    },
    isEstudiante() {
      return this.rolId === 1;
    },
    isInscrito() {
      return this.inscrito;
    },
    // Dividir las habilidades en un array
    abilitiesArray() {
      return this.courseData.abilities.split(";");
    },
  },
  methods: {
    // Función para obtener el courseId de la query
    fetchCourseId() {
      const route = useRoute();
      this.courseId = route.query.courseId ? Number(route.query.courseId) : 0;
    },
    // Función para obtener las lecciones por courseId
    async fetchLessonsByCourseId(courseId) {
      try {
        const response = await axios.get(
          `http://localhost:9999/api/v1/lessons/course/${courseId}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (response.status === 200) {
          this.lessons = response.data.result; // Guardar las lecciones
        } else {
          console.error("Error al obtener las lecciones:", response.data.message);
        }
      } catch (error) {
        console.error("Error en la solicitud de lecciones:", error);
      }
    },
    // Función para obtener el curso por ID
    async fetchCourseById() {
      try {
        const response = await axios.get(
          `http://localhost:9999/api/v1/courses/${this.courseId}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (response.status === 200) {
          this.courseData = response.data.result;
          await this.fetchLessonsByCourseId(this.courseId); // Guardar el curso
        } else {
          console.error("Error al obtener el curso:", response.data.message);
        }
      } catch (error) {
        console.error("Error en la solicitud del curso:", error);
      }
    },
    openDeletePopup(lesson) {
      this.selectedLesson = lesson;
      this.showDeletePopup = true;
    },
    closeDeletePopup() {
      this.showDeletePopup = false;
      this.selectedLesson = null;
    },
    async deleteLesson() {
      if (this.selectedLesson) {
        try {
          const response = await axios.delete(
            `http://localhost:9999/api/v1/lessons/${this.selectedLesson.lessonsId}`,
            {
              headers: {
                Accept: "application/json",
              },
            }
          );
          if (response.status === 200) {
            Swal.fire("Eliminada", "La lección ha sido eliminada con éxito.", "success");
            await this.fetchLessonsByCourseId(this.courseId);
            this.lessons = this.lessons.filter(
  (lesson) => lesson.lessonsId !== this.selectedLesson.lessonsId
);
          } else {
            Swal.fire("Error", "No se pudo eliminar la lección.", "error");
          }
        } catch (error) {
          Swal.fire("Error", "No se pudo eliminar la lección.", "error");
        } finally {
          this.closeDeletePopup();
        }
      }
    },
    // Función para obtener si el usuario está registrado
    async fetchEnrollmentId() {
      try {
        const response = await axios.get(
          `http://localhost:9999/api/v1/enrollments/user/${this.userId}`,
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        if (response.status === 200) {
          const courseData = response.data.result;
          // Verificar si el usuario está inscrito en el curso
          const enrollmentFound = courseData.some(
            (enrollment) =>
              enrollment.studentUserId === this.userId &&
              enrollment.coursesCourseId == this.courseId
          );
          this.inscrito = enrollmentFound;
        } else {
          console.error("Error al obtener la inscripción:", response.data.message);
        }
      } catch (error) {
        console.error("Error en la solicitud de inscripción:", error);
      }
    },
    // Función para confirmar la inscripción
    async confirmInscription() {
      this.showPopup = false;
      try {
        const response = await axios.post(
          "http://localhost:9999/api/v1/enrollments/create",
          {
            studentUserId: this.userId,
            coursesCourseId: this.courseId,
            enrollmentDate: new Date().toISOString().split("T")[0],
          },
          {
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
            },
          }
        );

        if (response.status === 200) {
          Swal.fire("Éxito", "Inscripción Confirmada!!!", "success");
          this.inscrito = true;
        } else {
          Swal.fire("Error", "No se pudo confirmar la inscripción.", "error");
        }
      } catch (error) {
        Swal.fire("Error", "No se pudo confirmar la inscripción.", "error");
      }
    },
    // Función para navegar a los quizzes
    irAQuizzes() {
      this.$router.push({
        name: "Quizzes",
        query: { courseId: this.courseId, courseTitle: this.courseData.title },
      });
    },
    // Función para iniciar una lección
    startLesson(lessonId, courseTitle) {
      if (this.isDocente || this.isEstudiante) {
        this.$router.push({
          path: "/pages/",
          query: {
            courseId: this.courseId,
            lessonId: lessonId,
            courseTitle: courseTitle,
          },
        });
      } else {
        Swal.fire("Error", "No se encuentra registrado", "error");
      }
    },
    // Función para abrir y cerrar el pop-up
    openPopup() {
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
    },
  },
  async mounted() {
    this.fetchCourseId();
    this.fetchCourseById();
    this.fetchEnrollmentId();
  },
};
</script>


<template>
  <div>
  <div v-if="isDocente" class="opcionesDocentes">
    <div class="container py-2">
      <button class="btn btn-secondary mb-3" @click="showModal = true">Crear Nueva Leccion</button>
      <CourseModal :show="showModal" :courseId="courseId" @close="showModal = false" @lessonCreated="fetchCourseById" />

      <button @click="irAQuizzes" class="btn btn-primary">
        Mis Cuestionarios
      </button>
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
            <div v-if="isEstudiante">
              <div v-if="isInscrito">
                <MaterialButton color="success" class="mt-4">
                  Suscrito
                </MaterialButton>
              </div>
              <div v-else>
                <MaterialButton color="white" class="mt-4" @click="openPopup">
                  Inscribirse
                </MaterialButton>
              </div>
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
            v-for="(lesson, index) in lessons"
            :key="index"
            class="leccion-card"
          >
            <img
              src="https://img.freepik.com/vector-premium/hombre-que-sienta-pila-libros_165488-4983.jpg"
              alt="Lección"
              class="leccion-image"
            />
            <div class="leccion-content p-3">
              <h2>{{ lesson.title }}</h2>
              <p><strong>Duración:</strong> {{ lesson.duration }}</p>
              <p>{{ lesson.description }}</p>
              <button
                @click="startLesson(lesson.lessonsId, courseData.title)"
                class="btn-start"
              >
                Iniciar
              </button>
              <button
                @click="openDeletePopup(lesson)"
                class="btn btn-danger mt-3 w-100"
              >
                Eliminar Lección
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Popup de confirmación para eliminar lección -->
<div v-if="showDeletePopup" class="popup-overlay d-flex align-items-center justify-content-center">
  <div class="popup bg-white p-4 rounded shadow">
    <h2>Confirmar Eliminación</h2>
    <p>¿Estás seguro de que deseas eliminar esta lección?</p>
    <div class="d-flex justify-content-between mt-4">
      <MaterialButton @click="deleteLesson" color="danger">Confirmar</MaterialButton>
      <MaterialButton @click="closeDeletePopup" color="secondary">Cancelar</MaterialButton>
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

/* Estilos del popup */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup {
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
  text-align: center;
}

.popup h2 {
  margin-bottom: 20px;
}

.popup-buttons {
  display: flex;
  justify-content: space-around;
}

/* Diseño de la lista de lecciones */
.leccion-card {
  background-color: #f8f9fa;
  border: 1px solid #e2e6ea;
  border-radius: 8px;
  width: 300px;
  margin: 15px;
  text-align: center;
}

.leccion-image {
  width: 100%;
  border-bottom: 1px solid #e2e6ea;
}

.leccion-content {
  padding: 15px;
}

.btn-danger {
  background-color: #da4733;
  color: #333;
  padding: 0.7rem 1.5rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  margin: 0ch;
  
}

.btn-danger:hover {
  background-color: #c82333;
}
</style>
