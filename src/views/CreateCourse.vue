<template>
  <div class="create-course-container">
    <div class="header-container">
      <h2 class="title">Crear Nuevo Curso</h2>
    </div>
    <br />
    <form @submit.prevent="createCourse">
      <div class="form-container">
        <div class="first-part">
          <!-- Imagen de perfil (por URL) -->
          <div class="field-group">
            <label for="profile-image-url" class="form-label">Imagen de Perfil (URL)</label>
            <input
              id="profile-image-url"
              type="url"
              class="form-control"
              v-model="course.profileImage"
              placeholder="https://example.com/imagen.jpg"
              required
            />
          </div>

          <!-- Título del curso -->
          <div class="field-group">
            <label for="course-title" class="form-label">Título del Curso</label>
            <input
              id="course-title"
              type="text"
              class="form-control"
              v-model="course.title"
              placeholder="Introduzca el título del curso"
              required
            />
          </div>

          <!-- Descripción -->
          <div class="field-group">
            <label for="course-description" class="form-label">Descripción</label>
            <textarea
              id="course-description"
              class="form-control"
              v-model="course.description"
              placeholder="Introduzca la descripción del curso"
              rows="4"
              required
            ></textarea>
          </div>
        </div>

        <div class="second-part">
          <!-- Disponibilidad -->
          <div class="field-group">
            <label class="form-label">Disponibilidad</label>
            <div class="availability-options">
              <label class="radio-option">
                <input type="radio" v-model="course.availability" value="true" required />
                Disponible
              </label>
              <label class="radio-option">
                <input type="radio" v-model="course.availability" value="false" required />
                No disponible
              </label>
            </div>
          </div>

          <!-- Categorías -->
          <div class="field-group">
            <label for="course-category" class="form-label">Categoría</label>
            <select id="course-category" v-model="course.category" class="form-control" required>
              <option value="" disabled>Selecciona una categoría</option>
              <!-- Cambiar a 'category' en el bucle -->
              <option v-for="category in categories" :key="category.id" :value="category.id">
                {{ category.nameCategory }}
              </option>

            </select>
          </div>

          <!-- Habilidades -->
          <div class="field-group">
            <label class="form-label">Habilidades</label>
            <div v-for="(skill, index) in course.skills" :key="index" class="skill-input">
              <div class="input-with-remove">
                <input
                  type="text"
                  v-model="course.skills[index]"
                  class="form-control skill-input-field"
                  placeholder="Habilidad"
                  required
                />
                <button type="button" @click="removeSkill(index)" class="btn-remove-skill">X</button>
              </div>
            </div>
            <button type="button" @click="addSkill" class="btn-add-skill">
              Agregar Habilidad
            </button>
          </div>
        </div>
      </div>

      <!-- Botón de crear curso -->
      <div class="action-buttons">
        <button type="submit" class="btn-create">Crear Curso</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

// Datos del curso
const course = ref({
  profileImage: "",
  title: "",
  description: "",
  availability: true,
  categories: "",
  skills: [""],
});

// Lista de categorías
const categories = ref([]);

// Función para obtener las categorías de la API
const fetchCategories = async () => {
  try {
    const response = await axios.get("http://localhost:9999/api/v1/category/all");
    categories.value = response.data.result; // Asegúrate de acceder al array correcto
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    Swal.fire({
      title: "Error",
      text: "No se pudieron cargar las categorías. Intente nuevamente.",
      icon: "error",
      confirmButtonText: "Aceptar",
    });
  }
};


// Ejecutar fetchCategories cuando el componente se monte
onMounted(fetchCategories);

// Función para crear el curso
const createCourse = () => {
  console.log("Curso creado:", course.value);
  // Lógica para enviar los datos al backend

  // Mostrar mensaje de éxito
  Swal.fire({
    title: "¡Curso creado con éxito!",
    text: "El curso ha sido creado y guardado correctamente.",
    icon: "success",
    confirmButtonText: "Aceptar",
  });
};

// Función para añadir más habilidades
const addSkill = () => {
  course.value.skills.push("");
};

// Función para eliminar habilidades
const removeSkill = (index) => {
  course.value.skills.splice(index, 1);
};
</script>


<style scoped>
/* Estilo general del formulario */
.create-course-container {
  background-color: #fbebd5;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  max-width: 900px;
  margin: 20px auto;
  transition: transform 0.3s ease-in-out;
}

.create-course-container:hover {
  transform: translateY(-5px);
}

.header-container {
  background-color: #599ce4; /* Fondo azul */
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px 12px 12px 12px;
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
  align-items: center;
  flex-direction: row;
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
  background-color: #ffffff;
}

.form-control:focus {
  border-color: #5b5f97;
  outline: none;
}

.availability-options {
  display: flex;
  gap: 1.5rem;
}

.radio-option {
  font-size: 1rem;
  color: #333;
}

.radio-option input {
  margin-right: 0.5rem;
}

/* Estilo de los botones */
.input-with-remove {
  position: relative;
}

.btn-remove-skill {
  position: absolute;
  right: 5px;
  top: 50%;
  transform: translateY(-50%);
  background-color: transparent;
  color: rgb(0, 0, 0);
  border: none;
  border-radius: 50%;
  cursor: pointer;
  padding: 0.3rem 0.6rem;
  font-size: 0.6rem;
  transition: background-color 0.3s ease;
}

.btn-remove-skill:hover {
  background-color: #c82333;
}

.btn-add-skill {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 0.5rem;
}

.btn-add-skill:hover {
  background-color: #0056b3;
}

.btn-create {
  background-color: #28a745;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 600;
  text-align: center;
  transition: background-color 0.3s ease;
  width: 100%;
}

.btn-create:hover {
  background-color: #218838;
}

/* Responsivo */
@media (max-width: 768px) {
  .create-course-container {
    padding: 2rem;
  }

  .btn-create {
    font-size: 1rem;
  }
}
</style>
