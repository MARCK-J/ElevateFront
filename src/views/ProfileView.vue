<template>
  <div class="profile-container">
    <div class="profile-card">
      <div class="profile-header">
        <img :src="profileImage" alt="User Image" class="profile-pic" />
      </div>
      <div class="profile-info">
        <div class="first-part">
          <div class="field-group">
            <label>Username</label>
            <input disabled v-model="this.username" />
          </div>
          <div class="field-group">
            <label>Nombre</label>
            <input :disabled="!this.editMode" v-model="this.firstName" />
          </div>
          <div class="field-group">
            <label>Apellido</label>
            <input :disabled="!this.editMode" v-model="this.lastName" />
          </div>
          <div class="field-group">
            <label>Email</label>
            <input :disabled="!this.editMode" v-model="this.email" />
          </div>
        </div>
        <div class="second-part">
          <div class="field-group">
            <label>Contraseña</label>
            <input type="password" :disabled="!this.editMode" v-model="this.password" />
          </div>
          <div class="field-group">
            <label>Rol</label>
            <input v-model="this.roleName" disabled />
          </div>
          <div class="field-group">
            <label>Verificación</label>
            <div class="verification-options">
              <label
                ><input
                  type="radio"
                  v-model="this.verification"
                  value="true"
                  :disabled="!this.editMode"
                />
                Sí</label
              >
              <label
                ><input
                  type="radio"
                  v-model="this.verification"
                  value="false"
                  :disabled="!this.editMode"
                />
                No</label
              >
            </div>
          </div>
          <div class="field-group">
            <label>Fecha de Creación</label>
            <input v-model="this.creationDate" disabled />
          </div>
          <i v-if="!this.editMode" class="fas fa-pencil-alt" @click="toggleEdit()"></i>
          <div v-if="this.editMode" class="action-buttons">
            <button @click="cancelEdit()" class="btn-cancel">Cancelar</button>
            <button @click="updateProfile()" class="btn-submit">
              Actualizar
            </button>
          </div>
        </div>
      </div>
      <br />
      <div>
        <div
          class="d-flex justify-content-between align-items-center"
          v-if="!this.activation"
        >
          <div class="d-flex align-items-center">
            <Icon
              icon="mdi:account-alert"
              width="25"
              height="25"
              style="color: red"
            />
            <span class="ms-2">Su cuenta no se encuentra verificada</span>
          </div>
          <MaterialButton
          variant="gradient"
          color="info"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal">
            Verificar Cuenta
          </MaterialButton>
          <!-- Modal -->
          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">
                    Verificación de cuenta
                  </h5>
                  <MaterialButton
                    color="none"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  >
                  </MaterialButton>
                </div>
                <div class="modal-body">
                  Estimado usuario, <br>

Se le envio una confirmacion de activacion de cuenta a la dirección de correo electrónico asociada con su perfil. Una vez recibido su correo de activacion podra acceder a todas las funcionalidades de la plataforma.

Le recomendamos revisar su bandeja de entrada. <br> 
Al hacer clic en "Continuar", se enviará el mensaje de activacion a su correo. Si desea cancelar este proceso, presione el botón "Cancelar".
                </div>
                <div class="modal-footer justify-content-between">
                  <MaterialButton
                    variant="gradient"
                    color="dark"
                    data-bs-dismiss="modal"

                  >
                    Cancelar
                  </MaterialButton>
                  <MaterialButton
                    variant="gradient"
                    color="success"
                    class="mb-0"
                    @click="profileActivation()"
                    data-bs-dismiss="modal"

                  >
                    Continuar
                  </MaterialButton>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-between align-items-center" v-else>
          <div class="d-flex align-items-center">
            <Icon
              icon="mdi:account-check"
              width="25"
              height="25"
              style="color: green"
            />
            <span class="ms-2">Su cuenta se encuentra verificada</span>
          </div>
        </div>
      </div>
    </div>
  </div>
 

</template>

<script>
import NavbarDefault from "../examples/navbars/NavbarDefault.vue";
import Swal from "sweetalert2";
import axios from "axios";
import { useAppStore } from "@/stores"; // Pinia store
import { Icon } from "@iconify/vue";
import MaterialButton from "@/components/MaterialButton.vue";
import { AuthService } from "../services/authService";
import { Modal } from 'bootstrap'; // Importa Bootstrap Modal para cerrarlo programáticamente


export default {
  components: {
    NavbarDefault,
    Icon,
    MaterialButton,
  },
  data(){
    return {
      username: "",
      firstName: "",
      lastName: "",
      email: '',
      role: '',
      creationDate: '',
      verification: false,
      activation: false,
      editMode:false, // Usar ref para el modo de edición
      password:'',
      profileImage:
        "https://img.freepik.com/vector-premium/icono-circulo-usuario-anonimo-ilustracion-vector-estilo-plano-sombra_520826-1931.jpg",
      userImage: new URL("@/assets/img/dg1.jpg", import.meta.url).href,
      appStore: useAppStore(),
      identificador:'',
      userData:[],
      roleName:''
    };
  },
  methods:{
    getidentificador() {
      this.identificador = this.appStore.getIdentificador;
    },
    async getUserData(){
      try {
        const response = await axios.get(
          `http://localhost:9999/api/v1/user/${this.identificador}`
        );
        this.userData = response.data.result;

        this.username = this.userData.username;
        this.firstName = this.userData.firstName;
        this.lastName = this.userData.lastName;
        this.email = this.userData.email;
        this.role = this.userData.role;
        this.creationDate = this.userData.dateJoin;
        this.verification = this.userData.verification;
        this.activation = this.userData.activation;
        this.password= "";
        this.roleName = this.roleText();

      } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
        Swal.fire(
          "Error",
          "No se pudo cargar la información del usuario.",
          "error"
        );
      }
    },
    async updateProfile(){
      try {
        const updatedPassword = this.password
          ? this.password
          : null;
  
        const payload = {
          username: this.username,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: updatedPassword, // Actualizar con la nueva o mantener la original
          verification: this.verification, // Asegurar que sea booleano
          activation: this.activation,
        };
        // Hacer la solicitud PUT para actualizar el perfil
        await axios.put(
          `http://localhost:9999/api/v1/user/${this.identificador}`,
          payload
        );
  
        Swal.fire("Éxito", "Perfil actualizado correctamente.", "success");
        this.editMode = false; // Desactivar el modo de edición después de actualizar
      } catch (error) {
        console.error("Error al actualizar el perfil:", error);
        Swal.fire("Error", "No se pudo actualizar el perfil.", "error");
      }
    },
    toggleEdit () {
      this.editMode = true;
    },
  
    // Función para cancelar la edición
    cancelEdit () {
      this.editMode = false;
    },
    async profileActivation (){
      try {
        // Usar la nueva contraseña si fue cambiada, si no mantener la original
        const updatedPassword = this.password
          ? this.password
          : null;

        // Preparar el payload para la solicitud PUT
        const payload = {
          username: this.username,
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: updatedPassword, // Actualizar con la nueva o mantener la original
          verification: this.verification, // Asegurar que sea booleano
          activation: true,
        };

        await AuthService.sendActivation(this.email);
        // Hacer la solicitud PUT para actualizar el perfil
        await axios.put(
          `http://localhost:9999/api/v1/user/${this.identificador}`,
          payload
        );
        this.getUserData(); // Actualizar los datos del usuario
        // Mostrar el SweetAlert cuando se complete el proceso
        Swal.fire("Éxito", "Proceso de activación completado.", "success").then(() => {
          // Cierra el modal programáticamente
          const modalElement = document.getElementById('exampleModal');
          const modal = Modal.getInstance(modalElement); // Obtener la instancia del modal
          modal.hide(); // Cerrar el modal
        });      
      } catch (error) {
        console.error("Error al actualizar el perfil:", error);
      }
    },
    roleText () {
      return this.role === 1
        ? "Estudiante"
        : this.role === 2
        ? "Docente"
        : "Otro";
    },

  },
  mounted(){
    this.getidentificador()
    if (this.identificador) {
      this.getUserData();
    }
    },
};
</script>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  height: 100vh;
  background-size: cover;
  background-position: center;
  background-color: #ccc;
}
.profile-card {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 2.5rem;
  margin-top: 50px;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  width: 70%;
  height: fit-content;
}
.profile-info {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
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
