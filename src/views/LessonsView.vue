<template>
  <div class="container">
    <header class="header">
      <button @click="goBack" class="btn-back">Atrás</button>
    </header>

    <main class="main-content">
      <div class="video-container">
        <iframe
          src="https://youtu.be/vHv7n0wJD18?si=qWddZfC-xme7B8Im" 
          frameborder="0" 
          allowfullscreen
        ></iframe>
      </div>

      <aside class="sidebar">
        <div class="download-section">
          <h3>Archivos descargables</h3>
          <ul>
            <li>
              <a href="#" class="btn-download-exercise">Ejercicios de práctica</a>
            </li>
            <li>
              <a href="#" class="btn-download-resource">PDF - Teoría de la lección</a>
            </li>
          </ul>
        </div>
        <div class="evaluation-section">
          <h3>Evaluación de la lección</h3>
          <p>Una vez terminada la lección, realice la evaluación.</p>
          <button @click="evaluateLesson" class="btn-evaluate">Ingresar aquí</button>
        </div>
      </aside>
    </main>

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
  background-color: #f8f8d9;
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
  display: flex;
  align-items: stretch;
  flex-wrap: wrap;
  gap: 20px;
}

/* Video */
.video-container {
  flex: 2;
}

.video-container iframe {
  width: 100%;
  height: 400px;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* Sección de descarga y evaluación */
.download-section,
.evaluation-section {
  background-color: #f8f8d9;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.btn-download-exercise {
  display: inline-block;
  background-color: #1231e0; /* Color de fondo azul */
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.btn-download-resource {
  display: inline-block;
  background-color: #f50e21; /* Color de fondo azul */
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.btn-download:hover {
  background-color: #0056b3; /* Color al pasar el mouse */
}

.evaluation-section {
  background-color: #e0f7e9; /* Color de fondo verde claro */
}

.btn-evaluate {
  background-color: #086b1d;
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

/* Información de la lección */
.lesson-info {
  flex: 1 0 100%; /* Full width */
  background-color: #f8f8d9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-top: 20px; /* Espacio adicional en la parte superior */
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
</style>
