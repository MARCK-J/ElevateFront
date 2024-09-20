<template>
  <div class="container center position-relative z-index-sticky top-0">
    <NavbarDefault :sticky="true" />
  </div>
  <div class="profile-container" :style="{ backgroundImage: 'url(' + userImage + ')' }">
    <div class="profile-card">
      <div class="profile-header">
        <img :src="profileImage" alt="User Image" class="profile-pic" />
      </div>
      <div class="profile-info">
        <div class="field-group">
          <label>Nombre</label>
          <input :disabled="!editMode" v-model="firstName" />
        </div>
        <div class="field-group">
          <label>Apellido</label>
          <input :disabled="!editMode" v-model="lastName" />
        </div>
        <div class="field-group">
          <label>Email</label>
          <input :disabled="!editMode" v-model="email" />
        </div>
        <div class="field-group">
          <label>Rol</label>
          <input v-model="role" disabled />
        </div>
        <div class="field-group">
          <label>Verificación</label>
          <div class="verification-options">
            <label><input type="radio" v-model="verification" value="Sí" :disabled="!editMode" /> Sí</label>
            <label><input type="radio" v-model="verification" value="No" :disabled="!editMode" /> No</label>
          </div>
        </div>
        <div class="field-group">
          <label>Fecha de Creación</label>
          <input v-model="creationDate" disabled />
        </div>
        <i v-if="!editMode" class="fas fa-pencil-alt" @click="toggleEdit"></i>
        <div v-if="editMode" class="action-buttons">
          <button @click="cancelEdit" class="btn-cancel">Cancelar</button>
          <button @click="updateProfile" class="btn-submit">Actualizar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarDefault from "../../examples/navbars/NavbarDefault.vue";
import Swal from "sweetalert2";
import axios from "axios";
import { ref, onMounted } from "vue";
import { useAppStore } from "@/stores"; // Pinia store

export default {
  components: {
    NavbarDefault
  },
  setup() {
    // Instancia del store de Pinia
    const appStore = useAppStore();
    const identificador = appStore.getIdentificador; // Obtener el ID desde Pinia

    // Definir propiedades reactivas
    const firstName = ref('');
    const lastName = ref('');
    const email = ref('');
    const role = ref('');
    const creationDate = ref('');

    // Función para obtener los datos del usuario
    const getUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:9999/api/v1/user/${identificador}`);
        const userData = response.data.result; // Supongo que los datos del usuario están en `result`
        
        // Asignar los datos recibidos a las variables reactivas
        firstName.value = userData.firstName;
        lastName.value = userData.lastName;
        email.value = userData.email;
        role.value = userData.role;
        creationDate.value = userData.dateJoin;
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
        Swal.fire('Error', 'No se pudo cargar la información del usuario.', 'error');
      }
    };

    // Llamar a la función getUserData cuando se monte el componente
    onMounted(() => {
      if (identificador) {
        getUserData();
      }
    });

    return {
      identificador,
      firstName,
      lastName,
      email,
      role,
      creationDate,
      getUserData
    };
  },
  data() {
    return {
      editMode: false,
      profileImage: "https://img.freepik.com/vector-premium/icono-circulo-usuario-anonimo-ilustracion-vector-estilo-plano-sombra_520826-1931.jpg",
      userImage: new URL('@/assets/img/dg1.jpg', import.meta.url).href,
    };
  },
  methods: {
    toggleEdit() {
      this.editMode = true;
    },
    cancelEdit() {
      this.editMode = false;
    },
    updateProfile() {
      alert('Perfil actualizado correctamente');
      this.editMode = false;
    }
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
  margin-top: 150px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  width: 500px;
  
}

.profile-header {
  text-align: center;
}

.profile-pic {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  background-color: #f0f0f0;
}


.field-group input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.verification-options label {
  margin-right: 10px;
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

.field-group i {
  cursor: pointer;
  color: #007bff;
  margin-left: 10px;
}
</style>
