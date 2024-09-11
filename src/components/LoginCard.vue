<template>
  <div class="TarjetaLogin">
    <img src="../assets/img/Register_Login/Elevate.png" alt="Logo Elevate" />
    <h3>Bienvenido</h3>
    <p>Inicie su sesión para continuar en Elevate</p>
    <form @submit.prevent="continuar" class="form">
      <div class="CustomInput">
        <p>Correo electronico:</p>
        <input
          placeholder="Ingrese su correo electronico"
          type="text"
          v-model="correo"
        />
      </div>
      <div class="CustomInput">
        <p>Contraseña:</p>
        <input
          placeholder="Ingrese su contraseña"
          type="password"
          v-model="password"
        />
      </div>
      <router-link to="" @click="olvideContrasena" class="enlace"
        >¿Olvidaste tu contraseña?</router-link
      >
      <button type="submit">CONTINUAR</button>
    </form>
    <div class="registro-enlace-container">
      <span>¿No tienes una cuenta?</span>
      <router-link to="/pages/landing-pages/register" class="enlace">Regístrate</router-link>
    </div>
  </div>
</template>

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
  background: #D5F3FB;
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
  color: #0026FF;
  text-decoration: underline;
}

.TarjetaLogin button {
  width: 85%;
  border-radius: 25px;
  padding: 10px;
  background-color: #007BFF;
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
