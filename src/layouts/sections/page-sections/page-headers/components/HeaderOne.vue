<script setup>
// Vue Material Kit 2 components
import MaterialButton from "@/components/MaterialButton.vue";
import { ref } from "vue";

// image
const bgImage =
  "https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2019/03/hipertextual-cursos-online-aprender-javascript-2019180345.jpg?fit=1200%2C800&quality=55&strip=all&ssl=1";

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
    <nav
      class="navbar navbar-expand-lg navbar-dark navbar-absolute bg-transparent shadow-none"
    >
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
      class="page-header min-vh-100"
      :style="{ backgroundImage: `url(${bgImage})` }"
      loading="lazy"
    >
      <span class="mask bg-gradient-dark opacity-5"></span>
      <div class="container">
        <div class="row">
          <div
            class="col-lg-6 col-md-7 d-flex justify-content-center flex-column"
          >
            <h1 class="text-white mb-4">Javascript desde cero a experto</h1>
            <p class="text-white opacity-8 lead pe-5 me-5">
              Aprende a programar en este maravilloso lenguaje de principio a
              fin con clases y ejercicios guiados por un experto en el tema.
            </p>
            <div class="buttons">
              <MaterialButton color="white" class="mt-4" @click="openPopup"
                >Inscribirse</MaterialButton
              >
              
            </div>
          </div>
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
        <MaterialButton color="none" @click="closePopup">Cancelar</MaterialButton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.popup-buttons {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
</style>
