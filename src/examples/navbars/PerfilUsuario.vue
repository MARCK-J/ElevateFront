<template>
    <div class="profile-background">
      <div class="container mt-5">
        <div class="card shadow-lg p-4">
          <h3 class="text-center mb-4">Editar Perfil</h3>
          <form @submit.prevent="updateProfile">
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="nombre" class="form-label">Nombre</label>
                <div class="input-group">
                  <span class="input-group-text"><i class="material-icons">person</i></span>
                  <input type="text" class="form-control" v-model="user.nombre" id="nombre" placeholder="Nombre" />
                </div>
              </div>
              <div class="col-md-6">
                <label for="apellidoPaterno" class="form-label">Apellido Paterno</label>
                <div class="input-group">
                  <span class="input-group-text"><i class="material-icons">person_outline</i></span>
                  <input type="text" class="form-control" v-model="user.apellidoPaterno" id="apellidoPaterno" placeholder="Apellido Paterno" />
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="apellidoMaterno" class="form-label">Apellido Materno</label>
                <div class="input-group">
                  <span class="input-group-text"><i class="material-icons">person_outline</i></span>
                  <input type="text" class="form-control" v-model="user.apellidoMaterno" id="apellidoMaterno" placeholder="Apellido Materno" />
                </div>
              </div>
              <div class="col-md-6">
                <label for="correo" class="form-label">Correo</label>
                <div class="input-group">
                  <span class="input-group-text"><i class="material-icons">email</i></span>
                  <input type="email" class="form-control" v-model="user.correo" id="correo" placeholder="Correo electrónico" />
                </div>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="telefono" class="form-label">Teléfono</label>
                <div class="input-group">
                  <span class="input-group-text"><i class="material-icons">phone</i></span>
                  <input type="tel" class="form-control" v-model="user.telefono" id="telefono" placeholder="Teléfono" />
                </div>
              </div>
              <div class="col-md-6">
                <label for="contrasena" class="form-label">Contraseña</label>
                <div class="input-group">
                  <span class="input-group-text"><i class="material-icons">lock</i></span>
                  <input
                    type="password"
                    class="form-control"
                    v-model="user.contrasena"
                    id="contrasena"
                    placeholder="Contraseña"
                    @input="validatePassword"
                  />
                </div>
                <ul class="password-rules mt-2">
                  <li :class="{ 'text-success': passwordValid.length }">Al menos 8 caracteres</li>
                  <li :class="{ 'text-success': passwordValid.lowercase }">Al menos una minúscula</li>
                  <li :class="{ 'text-success': passwordValid.uppercase }">Al menos una mayúscula</li>
                  <li :class="{ 'text-success': passwordValid.special }">Al menos un carácter especial</li>
                  <li :class="{ 'text-success': passwordValid.number }">Al menos un número</li>
                </ul>
              </div>
            </div>
            <div class="d-flex justify-content-center">
              <button type="submit" class="btn btn-primary mt-4 px-5 shadow-sm" :disabled="!isPasswordValid">
                Guardar Cambios
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        user: {
          nombre: '',
          apellidoPaterno: '',
          apellidoMaterno: '',
          correo: '',
          telefono: '',
          contrasena: '',
        },
        passwordValid: {
          length: false,
          lowercase: false,
          uppercase: false,
          special: false,
          number: false,
        },
      };
    },
    computed: {
      isPasswordValid() {
        return Object.values(this.passwordValid).every(Boolean);
      },
    },
    methods: {
      validatePassword() {
        const password = this.user.contrasena;
        this.passwordValid.length = password.length >= 8;
        this.passwordValid.lowercase = /[a-z]/.test(password);
        this.passwordValid.uppercase = /[A-Z]/.test(password);
        this.passwordValid.special = /[!@#$%^&*(),.?":{}|<>]/.test(password);
        this.passwordValid.number = /[0-9]/.test(password);
      },
      updateProfile() {
        if (this.isPasswordValid) {
          
          console.log("Perfil actualizado:", this.user);
        } else {
          alert("La contraseña no cumple con los requisitos.");
        }
      },
    },
  };
  </script>
  
  <style>
  
  .profile-background {
    background-color: #d4edda; 
    min-height: 100vh; 
    padding: 20px;
  }
  
  .text-primary {
    color: #2e7a2e !important; 
  }
  
  .container {
    max-width: 800px;
  }
  
  .card {
    border-radius: 15px;
    background: linear-gradient(to right, #f8f9fa, #e9ecef); 
  }
  
  .form-label {
    font-weight: bold;
    color: #495057;
  }
  
  .input-group-text {
    background-color: #e9ecef;
    border: none;
    color: #004d00; 
  }
  
  .input-group .form-control {
    border-left: none;
  }
  
  .btn-primary {
    background-color: #004d00; 
    border-color: #004d00;
    transition: background-color 0.3s ease, transform 0.3s ease;
  }
  
  .btn-primary:hover {
    background-color: #003300; 
    border-color: #002600;
    transform: translateY(-2px); 
  }
  
  .shadow-lg {
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
  
 
  .password-rules {
    list-style: none;
    padding: 0;
    font-size: 0.9em;
    color: #dc3545;
  }
  
  .password-rules li {
    margin-bottom: 5px;
  }
  
  .password-rules .text-success {
    color: #004d00; 
  }
  </style>
  