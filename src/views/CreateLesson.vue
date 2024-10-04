<template>
  <div class="create-lesson-container">
    <div class="header-container">
      <h2 class="title">Crear Nueva Lección</h2>
    </div>
    <br />
    <form @submit.prevent="createLesson">
      <div class="form-container">
        <div class="first-part">
          <!-- Selección de Curso -->
          <div class="field-group">
            <label for="course-select" class="form-label">Seleccionar Curso</label>
            <select
              id="course-select"
              class="form-control"
              v-model="lesson.course_id"
              required
            >
              <option value="" disabled selected>Seleccione un curso</option>
              <option v-for="course in courses" :key="course.id" :value="course.id">
                {{ course.name }}
              </option>
            </select>
          </div>

          <!-- Título de la Lección -->
          <div class="field-group">
            <label for="lesson-title" class="form-label">Título de la Lección</label>
            <input
              id="lesson-title"
              type="text"
              class="form-control"
              v-model="lesson.title"
              placeholder="Título de la lección"
              required
            />
          </div>

          <!-- Descripción -->
          <div class="field-group">
            <label for="lesson-description" class="form-label">Descripción</label>
            <textarea
              id="lesson-description"
              class="form-control"
              v-model="lesson.description"
              placeholder="Descripción de la lección"
              rows="4"
              required
            ></textarea>
          </div>

          <!-- Duración -->
          <div class="field-group">
            <label for="lesson-duration" class="form-label">Duración</label>
            <input
              id="lesson-duration"
              type="text"
              class="form-control"
              v-model="lesson.duration"
              placeholder="Ej. 1h 30m"
              required
            />
          </div>
        </div>

        <div class="second-part">
          <!-- Contenido -->
          <div class="field-group">
            <label for="lesson-content" class="form-label">Contenido</label>
            <textarea
              id="lesson-content"
              class="form-control"
              v-model="lesson.content"
              placeholder="Contenido de la lección"
              rows="4"
              required
            ></textarea>
          </div>

          <!-- Enlace de Video -->
          <div class="field-group">
            <label for="lesson-video" class="form-label">Enlace del Video</label>
            <input
              id="lesson-video"
              type="url"
              class="form-control"
              v-model="lesson.video"
              placeholder="URL del video (opcional)"
            />
          </div>

          <!-- Orden -->
          <div class="field-group">
            <label for="lesson-order" class="form-label">Orden</label>
            <input
              id="lesson-order"
              type="number"
              class="form-control"
              v-model="lesson.order"
              placeholder="Orden de la lección"
              required
            />
          </div>

          <!-- Subida de archivos para la lección -->
          <div class="field-group">
            <label for="lesson-file-upload" class="form-label">Subir archivos de lección</label>
            <input
              id="lesson-file-upload"
              type="file"
              class="form-control"
              @change="handleFileUpload"
              multiple
            />
          </div>
        </div>
      </div>

      <!-- Botón para crear lección -->
      <div class="action-buttons">
        <button type="submit" class="btn-create">Crear Lección</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

// Lista de cursos simulada
const courses = ref([
  { id: 1, name: "Curso de Matemáticas" },
  { id: 2, name: "Curso de Física" },
  { id: 3, name: "Curso de Programación" },
  { id: 4, name: "Curso de Inteligencia Artificial" },
]);

// Estado inicial de la lección
const initialLessonState = {
  course_id: "",
  title: "",
  description: "",
  duration: "",
  content: "",
  video: "",
  order: 1,
  files: [],
};

const lesson = ref({ ...initialLessonState });

const handleFileUpload = (event) => {
  const files = event.target.files;
  lesson.value.files = files;
};

const createLesson = async () => {
  const formData = new FormData();
  formData.append("course_id", lesson.value.course_id);
  formData.append("title", lesson.value.title);
  formData.append("description", lesson.value.description);
  formData.append("duration", lesson.value.duration);
  formData.append("content", lesson.value.content);
  formData.append("video", lesson.value.video || null);
  formData.append("order", lesson.value.order);

  // Agregar archivos al FormData
  for (let i = 0; i < lesson.value.files.length; i++) {
    formData.append("files", lesson.value.files[i]);
  }

  try {
    const response = await axios.post('http://localhost:9999/api/v1/lessons/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    Swal.fire({
      title: "Creación de lección",
      text: "Lección creada con éxito.",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
    lesson.value = { ...initialLessonState }; // Resetear formulario
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "No se pudo crear la lección. Intente nuevamente.",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
    console.error('Error al crear la lección:', error);
  }
};
</script>

<style scoped>
/* Estilos del formulario y diseño general */
.create-lesson-container {
  background-color: #fbebd5;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 20px auto;
  transition: transform 0.3s ease-in-out;
}

.create-lesson-container:hover {
  transform: translateY(-5px);
}

.header-container {
  background-color: #599ce4;
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px;
}

.title {
  color: white;
  font-size: 2rem;
  font-weight: 600;
  margin: 0;
}

.form-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.field-group {
  margin-bottom: 1rem;
}

.form-label {
  font-size: 1rem;
  font-weight: 500;
  color: #555;
  margin-bottom: 0.5rem;
  display: block;
}

.form-control {
  width: 50vh;
  padding: 0.75rem 1rem;
  border: 1px solid #151010;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.2s ease-in-out;
}

.availability-options {
  display: flex;
  gap: 1.5rem;
}

/* Botón de crear lección */
.btn-create {
  background-color: #28a745;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.btn-create:hover {
  background-color: #218838;
}
</style>
