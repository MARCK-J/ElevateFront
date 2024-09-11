<script setup>
import MaterialButton from "@/components/MaterialButton.vue";
import { ref } from "vue";

// Imagen de fondo
const bgImage = "https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2019/03/hipertextual-cursos-online-aprender-javascript-2019180345.jpg?fit=1200%2C800&quality=55&strip=all&ssl=1";

// Estado para controlar la visibilidad del pop-up
const showPopup = ref(false);

// Función para abrir el pop-up
const openPopup = () => {
  showPopup.value = true;
};

// Función para cerrar el pop-up
const closePopup = () => {
  showPopup.value = false;
};

// Función para confirmar la inscripción
const confirmInscription = () => {
  showPopup.value = false;
  alert("¡Inscripción confirmada!"); // Aquí puedes manejar la lógica de inscripción
};
</script>
<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-transparent shadow-none">
      <div class="container">
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbar-header-2"
          aria-controls="navbar-header-2"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbar-header-2"></div>
      </div>
    </nav>

    <div
      class="page-header min-vh-100 d-flex align-items-center"
      :style="{ backgroundImage: `url(${bgImage})` }"
    >
      <span class="mask bg-gradient-dark opacity-7"></span>
      <div class="container text-center text-white">
        <div class="row">
          <div class="col-lg-8 mx-auto">
            <h1 class="display-3 mb-4">JavaScript desde Cero a Experto</h1>
            <p class="lead mb-4">
              Aprende a programar en este maravilloso lenguaje de principio a fin con clases y ejercicios guiados por un experto en el tema.
            </p>
            <MaterialButton color="white" class="mt-4" @click="openPopup">Inscribirse</MaterialButton>
          </div>
        </div>
      </div>
    </div>

    <section class="skills py-5">
      <div class="container">
        <h2 class="text-center mb-4">Habilidades que Obtendrás</h2>
        <ul class="list-unstyled">
          <li><i class="fas fa-check-circle"></i> Desarrollo de aplicaciones web</li>
          <li><i class="fas fa-check-circle"></i> Desarrollo de aplicaciones móviles</li>
          <li><i class="fas fa-check-circle"></i> Desarrollo de videojuegos</li>
          <li><i class="fas fa-check-circle"></i> Desarrollo de aplicaciones de escritorio</li>
        </ul>
      </div>
    </section>

    <!-- Sección del Instructor -->
    <section class="instructor py-5 bg-light">
      <div class="container">
        <h2 class="text-center mb-4">Instructor</h2>
        <div class="instructor-info d-flex align-items-center justify-content-center">
          <img :src="'https://cdn-icons-png.flaticon.com/512/3135/3135768.png'" alt="Instructor Photo" class="instructor-photo">
          <div class="instructor-bio">
            <h3 class="mb-2">Nombre del Instructor: Camilo Mendez</h3>
            <p class="mb-1">Información académica: Ph.D. en Ciencias de la Computación, Universidad de XYZ</p>
            <p class="mb-1">Experiencia laboral: 10 años de experiencia en desarrollo de software, incluyendo 5 años como instructor de cursos de programación</p>
            <p class="mb-0">Áreas de especialización: Desarrollo web, aplicaciones móviles, videojuegos</p>
          </div>
        </div>
      </div>
    </section>
  </header>

  <!-- Popup de confirmación -->
  <div v-if="showPopup" class="popup-overlay">
    <div class="popup">
      <h2>Confirmar Inscripción</h2>
      <p>¿Estás seguro de que deseas inscribirte en este curso?</p>
      <div class="popup-buttons">
        <MaterialButton color="white" @click="confirmInscription">Confirmar</MaterialButton>
        <MaterialButton color="none" @click="closePopup">Cancelar</MaterialButton>
      </div>
    </div>
  </div>
</template>
<style scoped>
.page-header {
  position: relative;
  background-size: cover;
  background-position: center;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
}

.instructor-info {
  margin-top: 20px;
}

.instructor-photo {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  margin-right: 20px;
  border: 2px solid #ddd;
}

.instructor-bio {
  max-width: 600px;
}

.skills {
  background-color: #f8f9fa;
}

.skills ul {
  list-style-type: none;
  padding: 0;
}

.skills li {
  font-size: 18px;
  margin-bottom: 10px;
}

.skills .fas {
  color: #28a745;
  margin-right: 10px;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.popup-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
</style>
