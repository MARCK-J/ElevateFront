<template>
  <div class="profile-container" :style="{ backgroundImage: 'url(' + userImage + ')' }">
    <div class="profile-card">
      <div class="profile-header">
        <img :src="profileImage" alt="User Image" class="profile-pic" />
        <button @click="uploadImage" class="update-btn">Actualizar Foto</button>
      </div>
      <div class="profile-info">
        <div class="field-group">
          <label>Nombre</label>
          <input :disabled="!editMode" v-model="firstName" />
          <i class="fas fa-pencil-alt" @click="toggleEdit('firstName')"></i>
        </div>
        <div class="field-group">
          <label>Apellido</label>
          <input :disabled="!editMode" v-model="lastName" />
          <i class="fas fa-pencil-alt" @click="toggleEdit('lastName')"></i>
        </div>
        <div class="field-group">
          <label>Email</label>
          <input :disabled="!editMode" v-model="email" />
          <i class="fas fa-pencil-alt" @click="toggleEdit('email')"></i>
        </div>
        <div class="field-group">
          <label>Nueva Contraseña</label>
          <div class="password-input">
            <input :disabled="!editMode" :type="showPassword ? 'text' : 'password'" v-model="password" @input="validatePassword" />
            <i class="fas" :class="showPassword ? 'fa-eye-slash' : 'fa-eye'" @click="togglePasswordVisibility"></i>
          </div>
          <span v-if="passwordError" class="error-message">{{ passwordError }}</span>
        </div>
        La contraseña debe tener al menos 8 caracteres<br>
        La contraseña debe tener letras, numeros y caracteres especiales
        <div class="action-buttons">
          <button @click="cancelEdit" class="btn-cancel">Cancelar</button>
          <button @click="updateProfile" class="btn-submit">Actualizar</button>
    
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editMode: false,
      showPassword: false,
      profileImage: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png", 
      userImage: new URL('@/assets/img/dg1.jpg', import.meta.url).href,
      firstName: "Juan",
      lastName: "Pérez",
      email: "juan.perez@example.com",
      password: "",
      passwordError: ""
    };
  },
  methods: {
    toggleEdit(field) {
      this.editMode = true;
    },
    cancelEdit() {
      this.editMode = false;
    },
    updateProfile() {
      if (!this.passwordError) {
        alert('Perfil actualizado correctamente');
        this.editMode = false;
      }
    },
    uploadImage() {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            this.profileImage = e.target.result; 
          };
          reader.readAsDataURL(file);
        }
      };
      input.click();
    },
    validatePassword() {
      
      this.passwordError = this.password.length < 8 ? 'Faltan 8 caracteres' : '';
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
  }
};
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-size: cover;
  background-position: center;
}

.profile-card {
  background-color: rgba(255, 255, 255, 0.9); 
  padding: 2.5rem; 
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  width: 500px; 
}

.profile-header {
  text-align: center;
  margin-bottom: 1rem;
}

.profile-pic {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #f0f0f0; 
}

.update-btn {
  background-color: #007bff;
  color: white;
  padding: 0.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem; 
}


.field-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem; 
}

.field-group input {
  width: 70%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.password-input {
  display: flex;
  align-items: center;
}

.password-input input {
  width: calc(70% - 30px); 
}

.password-input i {
  cursor: pointer;
  color: #007bff;
}

.field-group i {
  cursor: pointer;
  color: #007bff;
}

.action-buttons {
  display: flex;
  justify-content: space-between;
  margin-top: 1.5rem; 
}

.btn-cancel {
  background-color: #dc3545;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-submit {
  background-color: #28a745;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.btn-back {
  background-color: #6c757d;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.error-message {
  color: #dc3545;
  font-size: 0.9rem;
  margin-left: 10px;
  margin-top: 5px; 
}
.profile-pic {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #f0f0f0; 
  margin-right: 1rem; 
}

</style>
