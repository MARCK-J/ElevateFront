<template>
  <div class="courses-section">
    <h2>Mis Cursos</h2>
    <div class="courses-container">
      <div class="course" v-for="(course, index) in courses" :key="index">
        <img :src="course.image" alt="Imagen del curso" class="course-image" />
        <p><strong>Curso:</strong> {{ course.title }}</p>
        <div class="buttons-container">
          <RouterLink :to="{ name: 'course', query: { courseId: course.courseId, title: course.title } }">
            <button class="go-to-course-button">Ingresar</button>
          </RouterLink>
          <button v-if="tipo" class="unsubscribe-button" @click="confirmUnsubscribe(course.title)">Desinscribirme</button>
        </div>
      </div>
    </div>

    <!-- Custom Modal for Unsubscribe Confirmation -->
    <div v-if="isModalVisible" class="custom-modal">
      <div class="modal-content">
        <div class="modal-header">
          <h5 v-if="!modalMessage">Confirmar Desinscripción</h5>
          <h5 v-else>{{ modalMessage }}</h5>
          <button class="close-button" @click="closeModal">×</button>
        </div>
        <div class="modal-body" v-if="!modalMessage">
          ¿Estás seguro que deseas desinscribirte del curso <strong>{{ selectedCourse }}</strong>?
        </div>
        <div class="modal-footer" v-if="!modalMessage">
          <button class="cancel-button" @click="cancelUnsubscribe">Cancelar</button>
          <button class="confirm-button" @click="unsubscribe">Desinscribirme</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { RouterLink } from "vue-router";
import { ref, onMounted, computed } from "vue";
import { useAppStore } from "@/stores";

export default {
  components: {
    RouterLink,
  },
  setup() {
    const store = useAppStore();
    const courses = ref([]);
    const selectedCourse = ref("");
    const isModalVisible = ref(false);
    const modalMessage = ref("");
    const id = store.getIdentificador;
    const rol = store.getTipoPersona;

    const tipo = computed(() => {
      if (rol === 1) {
        return true;
      } else {
        return false;
      }
    });

    const fetchEnrollments = async () => {
      try {
        let response;

        if (rol === 1) {
          response = await axios.get(`http://localhost:9999/api/v1/enrollments/student/${id}`, {
            headers: {
              Accept: "application/json",
            },
          });

          if (response.data.code === "200-OK") {
            const enrollments = response.data.result;
            const coursePromises = enrollments.map((enrollment) =>
              axios.get(`http://localhost:9999/api/v1/courses/${enrollment.coursesCourseId}`, {
                headers: {
                  Accept: "application/json",
                },
              })
            );
            const courseResponses = await Promise.all(coursePromises);
            courses.value = courseResponses.map((courseResponse) => courseResponse.data.result);
          } else {
            console.error("Error al obtener inscripciones:", response.data.message);
          }
        } else if (rol === 2) {
          response = await axios.get(`http://localhost:9999/api/v1/courses/teacher/${id}`, {
            headers: {
              Accept: "application/json",
            },
          });

          if (response.data.code === "200-OK") {
            courses.value = response.data.result;
          } else {
            console.error("Error al obtener cursos del docente:", response.data.message);
          }
        }
      } catch (error) {
        console.error("Error en la solicitud de inscripciones o cursos:", error);
      }
    };

    const confirmUnsubscribe = (courseTitle) => {
      selectedCourse.value = courseTitle;
      isModalVisible.value = true;
      modalMessage.value = "";
    };

    const unsubscribe = () => {
      modalMessage.value = `Te desinscribiste con éxito del curso "${selectedCourse.value}".`;
      setTimeout(closeModal, 2000);
    };

    const cancelUnsubscribe = () => {
      modalMessage.value = "Operación Cancelada.";
      setTimeout(closeModal, 2000);
    };

    const closeModal = () => {
      isModalVisible.value = false;
      modalMessage.value = "";
    };

    onMounted(() => {
      fetchEnrollments();
    });

    return {
      courses,
      selectedCourse,
      isModalVisible,
      modalMessage,
      confirmUnsubscribe,
      unsubscribe,
      cancelUnsubscribe,
      closeModal,
      store,
      tipo,
    };
  },
};
</script>

<style scoped>
.courses-section {
  margin-top: 30px;
  padding: 20px;
}

.courses-section h2 {
  font-family: 'Arial', sans-serif;
  font-weight: bold;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.courses-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.course {
  background-color: #fff;
  width: 30%;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  border: 1px solid #4a4a4a;
}

.course:hover {
  transform: scale(1.05);
}

.course-image {
  width: 100%;
  height: 150px; /* Altura fija para la imagen */
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
}

.buttons-container {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
}

.unsubscribe-button, .go-to-course-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1rem;
}

.unsubscribe-button {
  background-color: #FF6347;
  color: white;
}

.unsubscribe-button:hover {
  background-color: #c0392b;
}

.go-to-course-button {
  background-color: #3e8e41;
  color: white;
}

.go-to-course-button:hover {
  background-color: #09640c;
}

.custom-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  width: 400px;
  text-align: center;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
}

.modal-footer {
  display: flex;
  justify-content: center;
}

.cancel-button, .confirm-button {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  font-size: 1rem;
}

.cancel-button {
  background-color: #cccccc;
  color: white;
  margin-right: 10px;
}

.confirm-button {
  background-color: #FF6347;
  color: white;
}

.cancel-button:hover {
  background-color: #999999;
}

.confirm-button:hover {
  background-color: #c0392b;
}
</style>