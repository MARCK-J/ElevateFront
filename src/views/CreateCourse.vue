<template>
    <div class="create-course-container">
      <h2 class="title">Crear Nuevo Curso</h2>
      <form class="form-container" @submit.prevent="createCourse">
        <!-- Título -->
        <div class="field-group ">
          <MaterialInput
            id="course-title"
            class="input-group-dynamic"
            :label="{ text: 'Título del Curso', class: 'form-label' }"
            v-model="course.title"
            inputClass="mb-4"
          />
        </div>
  
        <!-- Descripción -->
        <div class="field-group">
          <MaterialInput
          class="input-group-dynamic"
            id="course-description"
            :label="{ text: 'Descripción', class: 'form-label' }"
            type="textarea"
            v-model="course.description"
            inputClass="mb-4"
          />
        </div>
  
        <!-- Disponibilidad -->
        <div class="field-group">
          <label class="form-label">Disponibilidad</label>
          <div class="availability-options">
            <label>
              <input
                type="radio"
                v-model="course.availability"
                value="true"
              /> Disponible
            </label>
            <label>
              <input
                type="radio"
                v-model="course.availability"
                value="false"
              /> No disponible
            </label>
          </div>
        </div>
  
        <!-- Categorías -->
        <div class="field-group">
          <label class="form-label">Categoría</label>
          <select v-model="course.category" class="form-control mb-4">
            <option value="" disabled>Selecciona una categoría</option>
            <option value="desarrollo-web">Desarrollo Web</option>
            <option value="ciencia-de-datos">Ciencia de Datos</option>
            <option value="marketing-digital">Marketing Digital</option>
          </select>
        </div>
  
        <!-- Habilidades -->
        <div class="field-group">
          <MaterialInput
            id="course-skills"
            :label="{ text: 'Habilidades', class: 'form-label' }"
            v-model="course.skills"
            class="input-group-dynamic"
            inputClass="mb-4"
          />
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
  import MaterialInput from '@/components/MaterialInput.vue';
  
  // Datos del curso
  const course = ref({
    title: '',
    description: '',
    availability: true,
    category: '',
    skills: '',
  });
  
  // Función para crear el curso
  const createCourse = () => {
    console.log('Curso creado:', course.value);
    // Aquí puedes agregar la lógica para enviar los datos al backend o realizar alguna otra acción
  };
  </script>
  
  <style scoped>
  .create-course-container {
    background-color: rgba(255, 255, 255, 0.9);
    padding: 2.5rem;
    border-radius: 10px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    max-width: 600px;
    margin: 50px auto;
  }
  
  .title {
    text-align: center;
    font-size: 1.8rem;
    margin-bottom: 2rem;
    color: #333;
  }
  
  .form-container {
    display: flex;
    flex-direction: column;
  }
  
  .field-group {
    margin-bottom: 1rem;
  }
  
  .availability-options {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  
  .form-label {
    font-weight: bold;
    margin-bottom: 0.5rem;
    display: block;
  }
  
  .btn-create {
    background-color: #28a745;
    color: white;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    width: 100%;
  }
  
  .btn-create:hover {
    background-color: #218838;
  }
  </style>
  