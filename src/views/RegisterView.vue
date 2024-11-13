<template>
  <div class="ResetPassword">
    <div class="background-container">
      <img
        class="background-image"
        src="/src/assets/img/Register_Login/Fondo1.jpg"
        alt="Background Image"
      />
      <div class="form-container">
        <h2 class="form-title">Restablecer Contraseña</h2>
        <form @submit.prevent="resetPassword" class="form">
          <div class="form-group">
            <input
              type="password"
              v-model="newPassword"
              class="form-control"
              placeholder="Nueva Contraseña"
              required
              minlength="8"
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              v-model="confirmPassword"
              class="form-control"
              placeholder="Confirmar Contraseña"
              required
              minlength="8"
            />
          </div>
          <div class="validation">
            <div v-for="(validation, index) in validations" :key="index">
              <Icon
                :icon="validation.icon"
                width="16"
                height="16"
                :color="validation.color"
              />
              <p :class="validation.class">{{ validation.message }}</p>
            </div>
          </div>
          <div class="button-group">
            <button type="button" @click="goBack" class="btn btn-secondary">
              Regresar
            </button>
            <input type="submit" value="Restablecer Contraseña" class="btn btn-primary" />
          </div>
        </form>
        <div v-if="showSuccessPopup" class="popup-overlay" @click="closePopup">
          <div class="popup-content" @click.stop>
            <h3>Contraseña Restablecida</h3>
            <p>¡Su contraseña ha sido actualizada correctamente!</p>
            <button @click="closePopup" class="btn btn-primary">Cerrar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";
import Swal from "sweetalert2";
import { useAppStore } from "@/stores"; // Reemplazar con tu lógica de manejo de contraseña

export default {
  data() {
    return {
      newPassword: "",
      confirmPassword: "",
      showSuccessPopup: false,
      validations: [
        {
          key: "confirmPassword",
          icon: "fluent:error-circle-20-regular",
          color: "red",
          class: "validation_error",
          message: "Las contraseñas deben ser iguales",
        },
        {
          key: "minLength",
          icon: "fluent:error-circle-20-regular",
          color: "red",
          class: "validation_error",
          message: "La contraseña debe ser de al menos 8 caracteres",
        },
        {
          key: "lowercase",
          icon: "fluent:error-circle-20-regular",
          color: "red",
          class: "validation_error",
          message: "La contraseña debe contener al menos una minuscula",
        },
        {
          key: "uppercase",
          icon: "fluent:error-circle-20-regular",
          color: "red",
          class: "validation_error",
          message: "La contraseña debe contener al menos una mayúscula",
        },
        {
          key: "specialChar",
          icon: "fluent:error-circle-20-regular",
          color: "red",
          class: "validation_error",
          message: "La contraseña debe contener al menos un carácter especial",
        },
        {
          key: "number",
          icon: "fluent:error-circle-20-regular",
          color: "red",
          class: "validation_error",
          message: "La contraseña debe contener al menos un número",
        },
      ],
    };
  },
  methods: {
    goBack() {
      this.$router.push("/"); // Regresar a la página principal o login
    },
    showError(message) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: message,
        showClass: {
          popup: "animate__animated animate__bounceIn",
        },
        hideClass: {
          popup: "animate__animated animate__fadeOut",
        },
      });
    },
    async resetPassword() {
      if (this.newPassword !== this.confirmPassword) {
        this.showError("Las contraseñas no coinciden.");
        return;
      }

      if (!this.validatePassword(this.newPassword)) {
        this.showError("La contraseña no cumple con los requisitos.");
        return;
      }

      // Aquí se puede agregar la lógica para actualizar la contraseña en la base de datos
      const authStore = useAppStore();
      authStore.updatePassword(this.newPassword); // Llamada a tu método de actualización de contraseña

      Swal.fire({
        title: "Contraseña Restablecida",
        text: "Su contraseña ha sido actualizada exitosamente",
        icon: "success",
      });

      this.showSuccessPopup = true; // Mostrar popup de éxito
      setTimeout(() => {
        this.$router.push("/login"); // Redirigir al login
      }, 2000); // Redirige después de 2 segundos
    },
    validatePassword(password) {
      return (
        password.length >= 8 &&
        /\d/.test(password) &&
        /[a-z]/.test(password) &&
        /[A-Z]/.test(password) &&
        /[^a-zA-Z0-9]/.test(password)
      );
    },
    closePopup() {
      this.showSuccessPopup = false;
    },
  },
  watch: {
    newPassword() {
      this.validateForm();
    },
    confirmPassword() {
      this.validateForm();
    },
  },
  components: {
    Icon,
  },
};
</script>

<style scoped>
.ResetPassword {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f4f6f9;
  padding: 20px;
}

.background-container {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.background-image {
  width: 100%;
  height: auto;
}

.form-container {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

.form-title {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-control {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
}

.validation {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 20px;
}

.validation_error {
  margin-left: 8px;
  font-size: 12px;
  color: red;
}

.button-group {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn {
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-primary {
  background-color: #007bff;
  color: white;
}

.btn-primary:hover {
  background-color: #0056b3;
}

.btn-secondary {
  background-color: #ccc;
}

.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
}

.popup-content {
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  text-align: center;
}
</style>
