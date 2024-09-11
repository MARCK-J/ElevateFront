<template>
    <div class="info-curso">
      <!-- Botón de Atrás -->
      <button @click="goBack" class="btn-back">Atrás</button>
      
      <!-- Títulos y Descripción -->
      <h1>Listado de Lecciones de JavaScript</h1><br>
  
      <!-- Listado de Lecciones -->
      <div class="lecciones-list">
        <div v-for="(leccion, index) in lecciones" :key="index" class="leccion-card">
          <img :src="leccion.image" alt="Lección" class="leccion-image" />
          <div class="leccion-content">
            <h2>{{ leccion.title }}</h2>
            <p><strong>Duración:</strong> {{ leccion.duration }}</p>
            <p>{{ leccion.description }}</p>
            <button @click="startLesson(leccion.title)" class="btn-start">Iniciar</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  
  // Datos de lecciones
  const lecciones = ref([
    {
      title: 'Introducción a JavaScript',
      duration: '1 hora',
      description: 'Aprende los conceptos básicos de JavaScript, incluyendo variables, operadores y estructuras de control.',
      image: 'https://www.thoughtco.com/thmb/094YF3bQBiuV_13n92GFQZWkM7k=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/JavaScript-58acbb8a3df78c345bad32c2.jpg'
    },
    {
      title: 'Funciones y Objetos',
      duration: '2 horas',
      description: 'Profundiza en la creación y uso de funciones y objetos en JavaScript.',
      image: 'https://www.in2code.de/fileadmin/_processed_/0/b/csm_code_javascript_49d002a67e.webp'
    },
    {
      title: 'Manipulación del DOM',
      duration: '1.5 horas',
      description: 'Aprende a interactuar y modificar el DOM usando JavaScript.',
      image: 'https://global.discourse-cdn.com/sitepoint/original/3X/b/5/b59a78e2ed76c705f3c0dcb300f3f222aefdcd99.png'
    },
    {
      title: 'Programación Asíncrona',
      duration: '2 horas',
      description: 'Explora las técnicas de programación asíncrona como callbacks, promesas y async/await.',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAg2n68y5tSKqRK_tw4ioZHQGT7zi1Piutng&s'
    },
    {
      title: 'Proyecto Final',
      duration: '3 horas',
      description: 'Aplica lo aprendido en un proyecto práctico que involucra todos los aspectos del curso.',
      image: 'https://www.grupocodesi.com/images/curso-de-javascript.png'
    }
  ]);
  
  // Función para iniciar una lección
  const startLesson = (title) => {
    alert(`Iniciando la lección: ${title}`);
  };
  
  // Usar el router para navegar
  const router = useRouter();
  
  // Función para ir hacia atrás
  const goBack = () => {
    router.push('/sections/page-sections/page-headers'); // Cambia el path según sea necesario
  };
  </script>
  
  <style scoped>
  .info-curso {
    padding: 20px;
    background-color: #d8cfc4; /* Café claro */
  }
  
  .btn-back {
    background-color: #6c757d;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
    margin-bottom: 20px;
  }
  
  .btn-back:hover {
    background-color: #5a6268;
  }
  
  .lecciones-list {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .leccion-card {
    border: 1px solid #97794b;
    border-radius: 8px;
    overflow: hidden;
    width: 300px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: #f5f5f5; /* Fondo de las tarjetas */
  }
  
  .leccion-image {
    width: 100%;
    height: 150px;
    object-fit: cover;
  }
  
  .leccion-content {
    padding: 15px;
  }
  
  .btn-start {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .btn-start:hover {
    background-color: #0056b3;
  }
  </style>
  