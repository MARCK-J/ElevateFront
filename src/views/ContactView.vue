<script setup>
import { onMounted } from "vue";

//example components
import DefaultNavbar from "@/examples/navbars/NavbarDefault.vue";
//import DefaultFooter from "@/examples/footers/FooterDefault.vue";

//image
import image from "@/assets/img/illustrations/illustration-signin.jpg";

//material components
import MaterialInput from "@/components/MaterialInput.vue";
import MaterialTextArea from "@/components/MaterialTextArea.vue";
import MaterialButton from "@/components/MaterialButton.vue";

// material-input
import setMaterialInput from "@/assets/js/material-input";
import { AuthService } from "../services/authService";
onMounted(() => {
  setMaterialInput();
});


const data = () => ({
  name: '',
  email: '',
  comment: '',
});

const methods = {
  async submitForm() {
    console.log('cambios' + this.name + " ahora el email" + this.email + 'Ahora el comentario ' + this.comment);
    try {
      // await AuthService.sendFeedbackEmail(this.name, this.email, this.comment);
      alert('Comentario/Queja enviado exitosamente.');
      // Limpiar el formulario después de enviar
      this.name = '';
      this.email = '';
      this.comment = '';
    } catch (error) {
      console.error('Error al enviar el comentario/queja:', error);
      alert('Hubo un error al enviar su comentario/queja. Por favor, inténtelo de nuevo.');
    }
  },
};
</script>

<template>
  <div class="container position-sticky z-index-sticky top-0">
    <div class="row">
      <div class="col-12">
        <DefaultNavbar
          :sticky="true"
          :action="{
            route: 'https://www.creative-tim.com/product/vue-material-kit-pro',
            color: 'bg-gradient-success',
            label: 'Buy Now',
          }"
        />
      </div>
    </div>
  </div>
  <section>
    <div class="page-header min-vh-100 custom-background"> <!-- Color de fondo de la página -->
      <div class="container">
        <div class="row">
          <div
            class="col-6 d-lg-flex d-none h-100 my-auto pe-0 position-absolute top-0 start-0 text-center justify-content-center flex-column"
          >
            <div
              class="position-relative h-100 m-3 px-7 border-radius-lg d-flex flex-column justify-content-center"
              :style="{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
              }"
              loading="lazy"
            ></div>
          </div>
          <div
            class="mt-8 col-xl-5 col-lg-6 col-md-7 d-flex flex-column ms-auto me-auto ms-lg-auto me-lg-5"
          >
            <div class="card custom-card d-flex justify-content-center shadow-lg my-sm-0 my-sm-6 mt-8 mb-5">
              <div class="card-header p-0 position-relative mt-n4 mx-3 z-index-2 bg-transparent">
                <div class="header-title p-3">
                  <h3 class="text-white mb-0">Contáctanos</h3>
                </div>
              </div>
              <div class="card-body">
                <p class="pb-3">
                  Si tienes algún problema o duda respecto a nuestro sistema, no dudes en contactarnos.
                </p>
                <form id="contact-form" method="post" autocomplete="off" @submit.prevent="submitForm">
                  <div class="card-body p-0 my-3">
                    <div class="row">
                      <div class="col-md-6">
                        <MaterialInput
                          class="input-group-static mb-4"
                          type="text"
                          label="Nombre Completo"
                          placeholder="Nombre Completo"
                          v-model="name"
                          required
                        />
                      </div>
                      <div class="col-md-6 ps-md-2">
                        <MaterialInput
                          class="input-group-static mb-4"
                          type="email"
                          label="Correo electrónico"
                          placeholder="NombreUsuario@gmail.com"
                          v-model="email"
                          required
                        />
                      </div>
                    </div>
                    <div class="form-group mb-0 mt-md-0 mt-4">
                      <MaterialTextArea
                        id="message"
                        class="input-group-static mb-4"
                        :rows="6"
                        placeholder="Describe tu problema o duda"
                        v-model="comment"
                        required
                      >¿En qué podemos ayudarte?</MaterialTextArea>
                    </div>
                    <div class="row">
                      <div class="col-md-12 text-center">
                        <MaterialButton
                          variant="gradient"
                          color="success"
                          class="mt-3 mb-0 custom-button"
                          type="submit"
                        >Enviar mensaje</MaterialButton>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <DefaultFooter />
</template>

<style scoped>
/* Fondo personalizado */
.custom-background {
  background-color: #c2d1b9; /* Fondo gris claro para toda la página */
  padding-top: 20px;
  padding-bottom: 20px;
}

/* Estilo personalizado para la tarjeta */
.custom-card {
  background: #ffffff; /* Fondo blanco */
  border-radius: 10px; /* Bordes ligeramente redondeados */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Sombra para darle profundidad */
  padding: 20px; /* Espaciado interno */
}

/* Estilo para el encabezado de la tarjeta */
.header-title {
  background: #4caf50; /* Fondo verde */
  border-radius: 10px 10px 0 0; /* Bordes redondeados solo en la parte superior */
  text-align: center;
}

/* Estilo para el botón */
.custom-button {
  background-color: #4caf50; /* Fondo verde */
  color: white;
  border-radius: 20px; /* Bordes redondeados */
  padding: 10px 20px;
  transition: background-color 0.3s ease; /* Transición suave */
}

.custom-button:hover {
  background-color: #388e3c; /* Cambiar color al pasar el ratón */
}
</style>
