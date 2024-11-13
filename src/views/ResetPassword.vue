<template>
  <div class="ResetPassword">
    <div class="form-container">
      <h3>Restablecer Contraseña</h3>
      <form @submit.prevent="resetPassword">
        <div class="CustomInput">
          <label for="newPassword">Nueva Contraseña:</label>
          <input
            id="newPassword"
            v-model="newPassword"
            type="password"
            placeholder="Ingrese su nueva contraseña"
            required
            minlength="8"
            @input="checkPasswordStrength"
          />
          <div class="password-indicators">
            <p :class="passwordLengthValid ? 'valid' : 'invalid'">Mínimo 8 caracteres</p>
            <p :class="passwordUpperCaseValid ? 'valid' : 'invalid'">Al menos 1 mayúscula</p>
            <p :class="passwordLowerCaseValid ? 'valid' : 'invalid'">Al menos 1 minúscula</p>
            <p :class="passwordNumberValid ? 'valid' : 'invalid'">Al menos 1 número</p>
          </div>
        </div>

        <div class="CustomInput">
          <label for="confirmPassword">Confirmar Contraseña:</label>
          <input
            id="confirmPassword"
            v-model="confirmPassword"
            type="password"
            placeholder="Confirme su nueva contraseña"
            required
            minlength="8"
          />
        </div>

        <button type="submit" class="submit-button" :disabled="!isPasswordValid">
          Restablecer Contraseña
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { useAppStore } from "@/stores";
import Swal from "sweetalert2";

export default {
  data() {
    return {
      newPassword: "",
      confirmPassword: "",
      passwordLengthValid: false,
      passwordUpperCaseValid: false,
      passwordLowerCaseValid: false,
      passwordNumberValid: false,
    };
  },
  computed: {
    isPasswordValid() {
      return (
        this.passwordLengthValid &&
        this.passwordUpperCaseValid &&
        this.passwordLowerCaseValid &&
        this.passwordNumberValid
      );
    },
  },
  methods: {
    checkPasswordStrength() {
      const password = this.newPassword;
      this.passwordLengthValid = password.length >= 8;
      this.passwordUpperCaseValid = /[A-Z]/.test(password);
      this.passwordLowerCaseValid = /[a-z]/.test(password);
      this.passwordNumberValid = /\d/.test(password);
    },
    resetPassword() {
      if (this.newPassword === this.confirmPassword) {
        // Aquí se puede llamar a un servicio para actualizar la contraseña en la base de datos
        const authStore = useAppStore();
        authStore.updatePassword(this.newPassword); // Actualiza la contraseña en el estado global

        Swal.fire({
          title: "Contraseña Restablecida",
          text: "Su contraseña ha sido actualizada exitosamente",
          icon: "success",
        });

        this.$router.push("/login"); // Redirige al login tras el cambio
      } else {
        Swal.fire({
          title: "Contraseñas no coinciden",
          text: "Las contraseñas ingresadas no coinciden. Intente nuevamente.",
          icon: "error",
        });
      }
    },
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

.form-container {
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

h3 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.CustomInput {
  margin-bottom: 20px;
}

.CustomInput label {
  font-size: 14px;
  color: #333;
  display: block;
  margin-bottom: 8px;
}

.CustomInput input {
  width: 100%;
  padding: 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-top: 8px;
}

.password-indicators {
  margin-top: 10px;
}

.password-indicators p {
  font-size: 14px;
  margin: 5px 0;
}

.password-indicators p.valid {
  color: green;
}

.password-indicators p.invalid {
  color: red;
}

.submit-button {
  width: 100%;
  padding: 12px;
  background-color: #007bff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;
}

.submit-button:hover {
  background-color: #0056b3;
}

.submit-button:disabled {
  background-color: #d6d6d6;
  cursor: not-allowed;
}
</style>
