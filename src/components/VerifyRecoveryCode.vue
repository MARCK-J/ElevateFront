<template>
    <div class="VerifyRecoveryCode">
      <h3>Verificar Código de Recuperación</h3>
      <form @submit.prevent="verificarCodigo">
        <div class="CustomInput">
          <p>Código de Verificación:</p>
          <input v-model="recoveryCode" placeholder="Ingrese el código" type="text" required>
        </div>
        <button type="submit">Verificar Código</button>
      </form>
    </div>
  </template>
  
  <script>
  import { useAppStore } from "@/stores";
  import Swal from "sweetalert2";
  
  export default {
    data() {
      return {
        recoveryCode: "",
      };
    },
    methods: {
      verificarCodigo() {
        const authStore = useAppStore();
        if (this.recoveryCode === authStore.recoveryCode) {
          Swal.fire({
            title: "Código verificado",
            text: "Puede continuar para restablecer su contraseña",
            icon: "success",
          });
          this.$router.push("/reset-password"); // Redirige a la vista de restablecimiento de contraseña
        } else {
          Swal.fire({
            title: "Código incorrecto",
            text: "El código ingresado no coincide",
            icon: "error",
          });
        }
      },
    },
  };
  </script>
  