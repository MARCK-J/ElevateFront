<template>
  <div class="create-course-container">
    <div class="header-container">
      <button class="btn-back">Atrás</button>
      <h2 class="title">Crear Nuevo Curso</h2>
    </div><br>
    <form class="form-container" @submit.prevent="createCourse">
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

      <!-- Disponibilidad -->
      <div class="field-group">
        <label class="form-label">Disponibilidad</label>
        <div class="availability-options">
          <label class="radio-option">
            <input
              type="radio"
              v-model="course.availability"
              value="true"
              required
            />
            Disponible
          </label>
          <label class="radio-option">
            <input
              type="radio"
              v-model="course.availability"
              value="false"
              required
            />
            No disponible
          </label>
        </div>
      </div>

      <!-- Categorías -->
      <div class="field-group">
        <label for="course-category" class="form-label">Categoría</label>
        <select id="course-category" v-model="course.category" class="form-control" required>
          <option value="" disabled>Selecciona una categoría</option>
          <option value="programacion">Programación</option>
          <option value="matematicas">Matemáticas</option>
          <option value="fisica">Física</option>
          <option value="quimica">Química</option>
          <option value="historia">Historia</option>
        </select>
      </div>

      <!-- Habilidades -->
      <div class="field-group">
        <label class="form-label">Habilidades</label>
        <div v-for="(skill, index) in course.skills" :key="index" class="skill-input">
          <input
            type="text"
            v-model="course.skills[index]"
            class="form-control skill-input-field"
            placeholder="Habilidad"
            required
          />
        </div>
        <button type="button" @click="addSkill" class="btn-add-skill">Agregar Habilidad</button>
      </div>

      <!-- Botón de crear curso -->
      <div class="action-buttons">
        <button type="submit" class="btn-create">Crear Curso</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Datos del curso
const course = ref({
  profileImage: '',
  title: '',
  description: '',
  availability: true,
  category: '',
  skills: [''],
});

// Función para crear el curso
const createCourse = () => {
  console.log('Curso creado:', course.value);
  // Aquí puedes agregar la lógica para enviar los datos al backend o realizar alguna otra acción
};

// Función para añadir más habilidades
const addSkill = () => {
  course.value.skills.push('');
};
</script>

<style scoped>
/* Estilo general del formulario */
.create-course-container {
  background-color: #FBEBD5;
  padding: 3rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  max-width: 700px;
  margin: 60px auto;
  transition: transform 0.3s ease-in-out;
}

.create-course-container:hover {
  transform: translateY(-5px);
}

.header-container {
  background-color: #599ce4; /* Fondo azul */
  padding: 1.5rem;
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
  flex-direction: column;
}

.field-group {
  margin-bottom: 1.5rem;
}

.form-label {
  font-size: 1rem;
  font-weight: 500;
  color: #555;
  margin-bottom: 0.5rem;
  display: block;
}

.form-control {
  width: 100%;
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

/* Estilo del botón 'Atrás' */
.btn-back {
  background-color: #dc3545; /* Fondo rojo */
  color: white; /* Texto en blanco */
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

.btn-back:hover {
  background-color: #c82333;
  transform: translateY(-3px);
}

.btn-back:active {
  transform: translateY(1px);
}

/* Estilo de los botones */
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

/* Estilos específicos para inputs */
.skill-input-field {
  margin-bottom: 0.75rem;
  background-color: #f0f4f8;
  border-color: #d1d9e6;
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
