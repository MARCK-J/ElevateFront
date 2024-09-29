<template>
  <div class="app">
    <div class="background-container">
      <img
        class="background-image"
        src="/src/assets/img/Register_Login/Fondo1.jpg"
        alt="Background Image"
      />
      <div class="form-container">
        <h2 class="form-title">Registro</h2>
        <p>Complete los siguientes campos, por favor</p>
        <form @submit.prevent="createPersona" class="form">
          <div class="form-group">
            <input
              type="text"
              v-model="firstName"
              class="form-control"
              placeholder="Nombres"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              v-model="lastName"
              class="form-control"
              placeholder="Apellidos"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="email"
              v-model="email"
              class="form-control"
              placeholder="Correo electrónico"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              v-model="password"
              class="form-control"
              placeholder="Contraseña"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="password"
              v-model="passwordConf"
              class="form-control"
              placeholder="Confirmar contraseña"
              required
            />
          </div>
          <div class="form-group">
            <select v-model="userType" class="form-control" required>
              
              <option value="" disabled>Selecciona tu rol</option>
              <option value="student">Estudiante</option>
              <option value="teacher">Docente</option>
            </select>
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
            <input type="submit" value="Continuar" class="btn btn-primary" />
          </div>
        </form>
        <p class="login-message">
          ¿Ya tienes una cuenta?
          <router-link to="/pages/landing-pages/login"
            >Inicia sesión aquí</router-link
          >
        </p>
      </div>
    </div>
    <div v-if="showSuccessPopup" class="popup-overlay" @click="closePopup">
      <div class="popup-content" @click.stop>
        <h3>Registro exitoso</h3>
        <p>¡Te has registrado correctamente!</p>
        <button @click="closePopup" class="btn btn-primary">Cerrar</button>
      </div>
    </div>
  </div>
</template>
<script>
import { Icon } from "@iconify/vue";
import Swal from "sweetalert2";
import axios from 'axios';


export default {
  data() {
    return {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      passwordConf: "",
      userType:"",
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
          message: "La contraseña debe contener al menos una mayuscula",
        },
        {
          key: "specialChar",
          icon: "fluent:error-circle-20-regular",
          color: "red",
          class: "validation_error",
          message: "La contraseña debe contener al menos un caracter especial",
        },
        {
          key: "number",
          icon: "fluent:error-circle-20-regular",
          color: "red",
          class: "validation_error",
          message: "La contraseña debe contener al menos un numero",
        },
      ],
    };
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
    showError(message) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: message,
        showClass: {
          popup: 'animate__animated animate__bounceIn'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOut'
        }
      });
    },
    getCurrentDate() {
      const today = new Date();
      const year = today.getFullYear();
      const month = String(today.getMonth() + 1).padStart(2, '0'); // Mes en formato MM
      const day = String(today.getDate()).padStart(2, '0'); // Día en formato DD
      return `${year}-${month}-${day}`; // Devuelve la fecha en formato YYYY-MM-DD
    },
    async createPersona() {
      try{
        if (
          !this.firstName ||
          !this.lastName ||
          !this.email ||
          !this.password ||
          !this.passwordConf
        ) {
          this.showError("Todos los campos obligatorios deben estar llenos.");
          return;
        }
        if (this.password !== this.passwordConf) {
          this.showError("Las contraseñas no coinciden.");
          return;
        }
  
        if (!this.validatePassword(this.password)) {
          this.showError("La contraseña no cumple con los requisitos.");
          return;
        }

        // Validar tipo de usuario
        const userRole = this.userType === "student" ? 1 : this.userType === "teacher" ? 2 : null;
        if (userRole === null) {
          this.showError("Debe seleccionar un tipo de usuario válido.");
          return;
        }

        const currentDate = this.getCurrentDate(); // Obtener la fecha actual

        // Enviar solicitud para crear la persona
        const response = await axios.post(
          "http://localhost:9999/api/v1/user/signup",
          {
            firstName: this.firstName,
            lastName: this.lastName,
            email: this.email,
            password: this.password,
            role: userRole,
            verification: false,
            dateJoin: currentDate // Usar la fecha actual
          }
        );
        // Mostrar éxito y reiniciar el formulario
        Swal.fire({
          icon: "success",
          title: "Registro exitoso",
          text: "Te has registrado correctamente.",
          timer: 2000,
          showConfirmButton: false
        });
        this.resetForm(); // Reiniciar formulario
        this.$router.push('/'); // Redirigir a la página principal


      }catch (error){
        console.error("Error al crear la persona", error);
        this.showError("Error al crear la persona");
      }
    },
    resetForm() {
      this.firstName = "";
      this.lastName = "";
      this.email = "";
      this.password = "";
      this.passwordConf = "";
      this.userType = "";
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
    validateForm() {
      this.validations.forEach((validation) => {
        switch (validation.key) {
          case "confirmPassword":
            validation.icon =
              this.password === this.passwordConf
                ? "lets-icons:check-fill"
                : "fluent:error-circle-20-regular";
            validation.color =
              this.password === this.passwordConf ? "green" : "red";
            validation.class =
              this.password === this.passwordConf
                ? "validation_check"
                : "validation_error";
            break;
          case "minLength":
            validation.icon =
              this.password.length >= 8
                ? "lets-icons:check-fill"
                : "fluent:error-circle-20-regular";
            validation.color = this.password.length >= 8 ? "green" : "red";
            validation.class =
              this.password.length >= 8
                ? "validation_check"
                : "validation_error";
            break;
          case "lowercase":
            validation.icon = /[a-z]/.test(this.password)
              ? "lets-icons:check-fill"
              : "fluent:error-circle-20-regular";
            validation.color = /[a-z]/.test(this.password) ? "green" : "red";
            validation.class = /[a-z]/.test(this.password)
              ? "validation_check"
              : "validation_error";
            break;
          case "uppercase":
            validation.icon = /[A-Z]/.test(this.password)
              ? "lets-icons:check-fill"
              : "fluent:error-circle-20-regular";
            validation.color = /[A-Z]/.test(this.password) ? "green" : "red";
            validation.class = /[A-Z]/.test(this.password)
              ? "validation_check"
              : "validation_error";
            break;
          case "specialChar":
            validation.icon = /[^a-zA-Z0-9]/.test(this.password)
              ? "lets-icons:check-fill"
              : "fluent:error-circle-20-regular";
            validation.color = /[^a-zA-Z0-9]/.test(this.password)
              ? "green"
              : "red";
            validation.class = /[^a-zA-Z0-9]/.test(this.password)
              ? "validation_check"
              : "validation_error";
            break;
          case "number":
            validation.icon = /\d/.test(this.password)
              ? "lets-icons:check-fill"
              : "fluent:error-circle-20-regular";
            validation.color = /\d/.test(this.password) ? "green" : "red";
            validation.class = /\d/.test(this.password)
              ? "validation_check"
              : "validation_error";
            break;
        }
      });
    },
    correctRegister() {
      this.$swal({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        icon: "success",
        title: "Felicidades",
        text: "Su registro se realizo correctamente, ahora puede iniciar sesion en la pagina",
      });
    },
  },
  watch: {
    password() {
      this.validateForm();
    },
    passwordConf() {
      this.validateForm();
    },
  },
  components: {
    Icon,
  },
};
</script>
<style scoped>
.validation {
  padding: 8px;
  border: 1px solid black;
  border-radius: 15px;
}
.validation div {
  display: flex;
  align-items: center;
}
.validation_error {
  margin-left: 8px;
  font-size: 12px;
  padding: 0;
  margin: 0;
  color: red;
}
.validation_check {
  margin-left: 8px;
  font-size: 12px;
  padding: 0;
  margin: 0;
  color: green;
}
.app {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.background-container {
  position: relative;
  width: 100%;
  height: 100%;
}
.background-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.form-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 30px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 32%;
}
.form-title {
  color: #333;
  font-size: 24px;
  text-align: center;
}
.form-group {
  width: 90%;
}
.form {
  display: flex;
}

.form-control {
  padding: 10px;
  border: none;
  border-bottom: 1px solid #ccc;
  background-color: transparent;
  width: 100%;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.form-control:focus {
  border-bottom-color: #007bff;
  outline: none;
}

.button-group {
  margin-top: 10px;
  display: flex;
  justify-content: space-between;
}

.btn {
  padding: 8px 20px;
  margin: 0px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  text-transform: uppercase;
  transition: all 0.3s ease;
  margin: 0 10px;
}

.btn-secondary {
  background-color: #999;
  color: #fff;
  border: 1px solid #999;
}

.btn-primary {
  background-color: #007bff;
  color: #fff;
  border: none;
}

.btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.login-message {
  margin-top: 5px;
  text-align: center;
  color: #666;
  font-size: 14px;
  margin-bottom: 5px;
}

.alert {
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 5px;
}

.alert-danger {
  background-color: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
}

.alert-success {
  background-color: #c6dbcb;
  border: 1px solid #c3e6cb;
  color: #155724;
}

@media only screen and (max-width: 768px) {
  .form-container {
    padding: 20px;
  }
}

@media only screen and (max-width: 576px) {
  .form-container {
    padding: 15px;
    width: 90%;
  }
}
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  animation: fadeIn 0.3s ease-in;
}

.popup-content {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 90%;
  max-width: 400px;
  animation: scaleUp 0.3s ease-in;
}

.popup-content h3 {
  margin: 0;
  font-size: 24px;
}

.popup-content p {
  margin: 10px 0;
  font-size: 16px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes scaleUp {
  from {
    transform: scale(0.9);
  }
  to {
    transform: scale(1);
  }
}

.popup-content .btn-primary {
  margin-top: 10px;
}
</style>
