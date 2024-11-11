<template>
    <div class="password-recovery-container">
      <div class="password-recovery-box">
        <h3>Recuperación de Contraseña</h3>
        <form @submit.prevent="enviarCodigo" class="recovery-form">
          <div class="custom-input">
            <label for="email">Correo electrónico:</label>
            <input 
              v-model="email" 
              type="email" 
              id="email" 
              placeholder="Ingrese su correo electrónico" 
              required 
            />
          </div>
          <button type="submit" class="submit-btn">Enviar Código de Recuperación</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import { AuthService } from "@/services/authService";
  import Swal from "sweetalert2";
  
  export default {
    data() {
      return {
        email: "",
      };
    },
    methods: {
      async enviarCodigo() {
        try {
          await AuthService.sendPasswordRecoveryCode(this.email);
          Swal.fire({
            title: "Código enviado",
            text: "Revisa tu correo electrónico para el código de recuperación",
            icon: "info",
          });
          this.$router.push("/verify-recovery-code");
        } catch (error) {
          Swal.fire({
            title: "Error",
            text: "No se pudo enviar el código. Intenta nuevamente",
            icon: "error",
          });
        }
      },
    },
  };
  </script>
  
  <style scoped>
  
  .password-recovery-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #8be697;
  }
  
  .password-recovery-box {
    background: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    text-align: center;
  }
  
  h3 {
    color: #333;
    margin-bottom: 20px;
    font-family: 'Arial', sans-serif;
  }
  
  .recovery-form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
  
  .custom-input {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  .custom-input label {
    font-size: 14px;
    color: #555;
    margin-bottom: 5px;
  }
  
  .custom-input input {
    padding: 10px 15px;
    font-size: 16px;
    width: 100%;
    border: 2px solid #ddd;
    border-radius: 4px;
    transition: border-color 0.3s;
  }
  
  .custom-input input:focus {
    border-color: #007bff;
    outline: none;
  }
  
  .submit-btn {
    background-color: #007bff;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 25px;
    font-size: 16px;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  
  .submit-btn:hover {
    background-color: #0056b3;
  }
  
  .submit-btn:focus {
    outline: none;
  }
  
  @media (max-width: 500px) {
    .password-recovery-box {
      width: 90%;
    }
  }
  </style>
  