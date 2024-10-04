<template>
  <div class="container">
    <header class="header">
      <button @click="goBack" class="btn-back">Atrás</button>
    </header>
    
    <main class="main-content">
      <div class="video-container">
        <iframe
          src="https://www.youtube.com/embed/VIDEO_ID" 
          frameborder="0" 
          allowfullscreen
        ></iframe>
      </div>


      
      <div class="lesson-info">
        <h2>Lección 1: Introducción y primeros pasos</h2>
        <p>Duración: 1 hora</p>
        <h3>Clases breves, entretenidas y super claras.</h3>
        <p>
          Nuestro programa está diseñado para que aprendas y practiques, 
          independientemente de tu nivel, con un enfoque de 18 días de clases.
        </p>
        <ul>
          <li>Desde la creación de tu sitio web hasta la creación de una API.</li>
          <li>Clases teóricas y prácticas con recursos para llevar de la mano.</li>
          <li>Acceso a una comunidad para resolver tus dudas y compartir tus experiencias.</li>
        </ul>
      </div>

      <aside class="sidebar">
        <h3>Archivos descargables</h3>
        <ul>
          <li><a href="#">Ejercicios de práctica</a></li>
          <li><a href="#">PDF - Guía de referencia</a></li>
        </ul>
        <h3>Evaluación de la lección</h3>
        <button @click="evaluateLesson" class="btn-evaluate">Ingresar aquí</button>
      </aside>
    </main>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    evaluateLesson() {
      this.$router.push('/evaluate');
    }
  }
}
</script>

<style scoped>
/* Estilos globales */
body {
  font-family: 'Poppins', sans-serif;
  background-color: #f4f7fc;
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

.header h1 {
  font-size: 24px;
  margin: 0;
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
  display: block;
  flex-wrap: wrap;
  gap: 20px;
}

/* Video */
.video-container {
  flex: 2;
  margin-right: 20px;
}

.video-container iframe {
  width: 100%;
  height: 400px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Información de la lección */
.lesson-info {
  flex: 3;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
 
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

.sidebar ul li a {
  text-decoration: none;
  color: #007bff;
  transition: color 0.3s ease;
}

.sidebar ul li a:hover {
  color: #0056b3;
}

.btn-evaluate {
  background-color: #2b2e4a;
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: block;
  width: 100%;
  text-align: center;
}

.btn-evaluate:hover {
  background-color: #1f1e38;
}
</style>
