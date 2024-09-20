<template>
  <div class="TarjetaLogin">
    <img src="../assets/img/Register_Login/Elevate.png" alt="Logo Elevate" />
    <h3>Bienvenido</h3>
    <p>Inicie su sesión para continuar en Elevate</p>
    <form @submit.prevent="continuar" class="form">
      <div class="CustomInput">
        <p>Correo electronico:</p>
        <input v-model="correo" placeholder="Ingrese su correo electronico" type="email" required>
      </div>
      <div class="CustomInput">
        <p>Contraseña:</p>
        <input v-model="password" placeholder="Ingrese su contraseña" type="password" required/>
      </div>
      <router-link to="" class="enlace">¿Olvidaste tu contraseña?</router-link>
      <button type="submit">CONTINUAR</button>
    </form>
    <div class="registro-enlace-container">
      <span>¿No tienes una cuenta?</span>
      <router-link to="/pages/landing-pages/register" class="enlace">Regístrate</router-link>
    </div>
  </div>
</template>


<script>
import Swal from "sweetalert2";
import axios from "axios";
import { useAppStore } from "@/stores/index.js"; // Ajusta la ruta según tu estructura de carpetas
import { AuthService } from "../services/authService";

export default {
  data() {
    return {
      correo: "",
      password: "",
    };
  },
  methods: {
    async continuar() {
      try {
        const response = await axios.post("http://localhost:9999/api/v1/user/login", {
          email: this.correo,
          password: this.password,
        });

        const { code, result } = response.data;

        if (code === "200-OK") {
          const appStore = useAppStore();
          
          const { userId, role, verification } = result;          
          appStore.setIdentificador(userId);
          if(verification){
            this.randomCode = AuthService.generateCode();

            await AuthService.sendMail(this.correo, this.randomCode);
            // Redirige a la pantalla de verificación
            this.$router.push({ name: 'verification-view', params: { userId: userId, role: role, code: this.randomCode } });
            Swal.fire({
              title: "Código enviado",
              text: "Se ha enviado un código de verificación a tu correo",
              icon: "info",
            });
          } else {
            // Si no requiere verificación, iniciar sesión directamente
            this.iniciarSesion(userId, role);
          }  
          
        } else {
          throw new Error(`Código de respuesta inesperado: ${code}`);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error);
        Swal.fire({
          title: "Error",
          text: error.response && error.response.data ? error.response.data.message : "Correo electrónico o contraseña incorrectos",
          icon: "error",
        });
      }
    },
    iniciarSesion(userId, role) {
      const appStore = useAppStore();
      appStore.setIdentificador(userId);
      appStore.setTipoPersona(role);
      appStore.setLogin(true);
      
      Swal.fire({
        title: "Éxito",
        text: "Inicio de sesión exitoso",
        icon: "success",
      });
      
      this.$router.push("/");
    },
  },
};
</script>

<style>
.CustomInput {
  width: 85%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 10px 0px;
}
.CustomInput p {
  padding: 0;
  margin: 0;
}
.CustomInput input {
  border: 2px solid black;
  border-radius: 25px;
  padding: 10px 20px;
}
.form {
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.TarjetaLogin {
  background: #d5f3fb;
  border: 3px solid black;
  height: fit-content;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px 8px;
  border-radius: 30px;
  color: black;
}

.TarjetaLogin img {
  width: 50%;
}

.enlace {
  margin: 10px 0px;
  color: #0026ff;
  text-decoration: underline;
}

.TarjetaLogin button {
  width: 85%;
  border-radius: 25px;
  padding: 10px;
  background-color: #007bff;
  border: 2px solid black;
  color: #fff;
}

.registro-enlace-container {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.CustomInput {
  width: 85%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 10px 0px;
}
.CustomInput p {
  padding: 0;
  margin: 0;
}
.CustomInput input {
  border: 2px solid black;
  border-radius: 25px;
  padding: 10px 20px;
}
@media (max-width: 860px) {
  .TarjetaLogin {
    width: 70%;
    padding: 10px 2px;
  }
}
</style>
