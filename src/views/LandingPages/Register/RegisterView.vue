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
        <form @submit.prevent="createPersona" class="form">
          <div class="form-group">
            <input
              type="text"
              v-model="nombre"
              class="form-control"
              placeholder="Nombre"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              v-model="apellidoP"
              class="form-control"
              placeholder="Apellido Paterno"
              required
            />
          </div>
          <div class="form-group">
            <input
              type="text"
              v-model="apellidoM"
              class="form-control"
              placeholder="Apellido Materno"
            />
          </div>
          <div class="form-group">
            <input
              type="tel"
              v-model="telefono"
              class="form-control"
              placeholder="Teléfono"
            />
          </div>
          <div class="form-group">
            <input
              type="email"
              v-model="correo"
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
          <div class="validation">
            <div>
              <Icon
                :icon="icon_validacion0"
                width="16"
                height="16"
                :color="estilo_validacion0"
              />
              <p :class="confirmacion0">Las contraseñas deben ser iguales</p>
            </div>
            <div>
              <Icon
                :icon="icon_validacion1"
                width="16"
                height="16"
                :color="estilo_validacion1"
              />
              <p :class="confirmacion1">
                La contraseña debe ser de al menos 8 caracteres
              </p>
            </div>
            <div>
              <Icon
                :icon="icon_validacion2"
                width="16"
                height="16"
                :color="estilo_validacion2"
              />
              <p :class="confirmacion2">
                La contraseña debe contener al menos una minuscula
              </p>
            </div>
            <div>
              <Icon
                :icon="icon_validacion3"
                width="16"
                height="16"
                :color="estilo_validacion3"
              />
              <p :class="confirmacion3">
                La contraseña debe contener al menos una mayuscula
              </p>
            </div>
            <div>
              <Icon
                :icon="icon_validacion4"
                width="16"
                height="16"
                :color="estilo_validacion4"
              />
              <p :class="confirmacion4">
                La contraseña debe contener al menos un caracter especial
              </p>
            </div>
            <div>
              <Icon
                :icon="icon_validacion5"
                width="16"
                height="16"
                :color="estilo_validacion5"
              />
              <p :class="confirmacion5">
                La contraseña debe contener al menos un numero
              </p>
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
  </div>
</template>
<script>
import { Icon } from "@iconify/vue";

export default {
  data() {
    return {
      nombre: "",
      apellidoP: "",
      apellidoM: "",
      telefono: "",
      correo: "",
      password: "",
      passwordConf: "",
      // validacion de igualdad
      icon_validacion0:"fluent:error-circle-20-regular",
      estilo_validacion0:'red',
      confirmacion0:'validation_error',
      // validacion de longitud
      icon_validacion1:"fluent:error-circle-20-regular",
      estilo_validacion1:'red',
      confirmacion1:'validation_error',
      // validacion de minuscula
      icon_validacion2:"fluent:error-circle-20-regular",
      estilo_validacion2:'red',
      confirmacion2:'validation_error',
      // validacion de mayuscula
      icon_validacion3:"fluent:error-circle-20-regular",
      estilo_validacion3:'red',
      confirmacion3:'validation_error',
      // validacion de caracter especial
      icon_validacion4:"fluent:error-circle-20-regular",
      estilo_validacion4:'red',
      confirmacion4:'validation_error',
      // validacion de numero
      icon_validacion5:"fluent:error-circle-20-regular",
      estilo_validacion5:'red',
      confirmacion5:'validation_error',
    };
  },
  methods: {
    goBack() {
      this.$router.push("/");
    },
    // Función para validar la complejidad de la contraseña
    validatePassword(password) {
      console.log(password);
      // Al menos 8 caracteres
      if (password.length < 8) {
        console.log("Tamanio");
        return false;
      }
      // Al menos un número
      if (!/\d/.test(password)) {
        console.log("un numero");
        return false;
      }
      // Al menos una letra minúscula
      if (!/[a-z]/.test(password)) {
        console.log("minu");
        return false;
      }
      // Al menos una letra mayúscula
      if (!/[A-Z]/.test(password)) {
        console.log("mayu");
        return false;
      }
      // Al menos un carácter especial
      if (!/[^a-zA-Z0-9]/.test(password)) {
        console.log("espec");
        return false;
      }
      return true;
    },

    validaciones(password, passwordConf) {
      // Restablecer estados de validación
      this.icon_validacion0 = 'fluent:error-circle-20-regular';
      this.estilo_validacion0 = 'red';
      this.confirmacion0 = 'validation_error';
      this.icon_validacion1 = 'fluent:error-circle-20-regular';
      this.estilo_validacion1 = 'red';
      this.confirmacion1 = 'validation_error';
      this.icon_validacion2 = 'fluent:error-circle-20-regular';
      this.estilo_validacion2 = 'red';
      this.confirmacion2 = 'validation_error';
      this.icon_validacion3 = 'fluent:error-circle-20-regular';
      this.estilo_validacion3 = 'red';
      this.confirmacion3 = 'validation_error';
      this.icon_validacion4 = 'fluent:error-circle-20-regular';
      this.estilo_validacion4 = 'red';
      this.confirmacion4 = 'validation_error';
      this.icon_validacion5 = 'fluent:error-circle-20-regular';
      this.estilo_validacion5 = 'red';
      this.confirmacion5 = 'validation_error';

      if (password.length > 0 || passwordConf.length > 0) {
        if (password === passwordConf) {
          this.icon_validacion0 = 'lets-icons:check-fill';
          this.estilo_validacion0 = 'green';
          this.confirmacion0 = 'validation_check';
          
          if (password.length >= 8) {
            this.icon_validacion1 = 'lets-icons:check-fill';
            this.estilo_validacion1 = 'green';
            this.confirmacion1 = 'validation_check';
          }
          
          if (/[a-z]/.test(password)) {
            this.icon_validacion2 = 'lets-icons:check-fill';
            this.estilo_validacion2 = 'green';
            this.confirmacion2 = 'validation_check';
          }
          
          if (/[A-Z]/.test(password)) {
            this.icon_validacion3 = 'lets-icons:check-fill';
            this.estilo_validacion3 = 'green';
            this.confirmacion3 = 'validation_check';
          }
          
          if (/[^a-zA-Z0-9]/.test(password)) {
            this.icon_validacion4 = 'lets-icons:check-fill';
            this.estilo_validacion4 = 'green';
            this.confirmacion4 = 'validation_check';
          }
          
          if (/\d/.test(password)) {
            this.icon_validacion5 = 'lets-icons:check-fill';
            this.estilo_validacion5 = 'green';
            this.confirmacion5 = 'validation_check';
          }
        }
      }
    },
  },
  watch:{
    password(newPassword) {
      this.validaciones(newPassword, this.passwordConf);
    },
    passwordConf(newPasswordConf) {
      this.validaciones(this.password, newPasswordConf);
    }
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
  width: 80%; 
  max-width: 550px; 
}
.form-title {
  color: #333;
  font-size: 24px;
  text-align: center;
}
.form-group {
  width: 75%;
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
</style>
