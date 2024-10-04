<template>
    <div>
      <div class="sidebar-container" :class="{ collapsed: isCollapsed }">
        <button class="toggle-sidebar-button" @click="toggleCollapse">
          <span v-if="isCollapsed">☰</span>
          <span v-else>☰</span>
        </button>
        <nav class="sidebar" :style="{ width: isCollapsed ? '5%' : '20%' }">
          <ul class="nav flex-column">
            <!-- Perfil -->
            <li class="nav-item">
              <div class="nav-link" @click="selectOption('profile')">
                <span v-if="isCollapsed">👤</span>
                <span v-else>👤 Perfil</span>
              </div>
            </li>
            <!-- Mostrar estas opciones solo si el identificador es 2 (Docente) -->
            <template v-if="identificador == '2'">
              <!-- Creación de Cursos -->
              <li class="nav-item">
                <div class="nav-link" @click="selectOption('create_courses')">
                  <span v-if="isCollapsed">📚</span>
                  <span v-else>📚 Crear Cursos</span>
                </div>
              </li>
  
              <!-- Creación de Lecciones -->
              <li class="nav-item">
                <div class="nav-link" @click="selectOption('create_lessons')">
                  <span v-if="isCollapsed">✍️</span>
                  <span v-else>✍️ Crear Lecciones</span>
                </div>
              </li>
            </template>
          </ul>
        </nav>
      </div>
    </div>
  </template>
  
  <script>
  import { defineComponent, ref } from "vue";
  import { useAppStore } from "../stores";
  
  export default defineComponent({
    name: "Sidebar",
    emits: ["optionSelected"],
    setup(props, { emit }) {
      const isCollapsed = ref(false);
  
      // Acceder al store de Pinia
      const appStore = useAppStore();
      const identificador = appStore.tipoPersona;
      console.log("Identificador de rol: " + identificador);
  
      const toggleCollapse = () => {
        isCollapsed.value = !isCollapsed.value;
      };
  
      const selectOption = (option) => {
        emit("optionSelected", option);
      };
  
      return {
        isCollapsed,
        toggleCollapse,
        selectOption,
        identificador, // Exponer el identificador desde el store
      };
    },
  });
  </script>
  
  <style scoped>
  .sidebar-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    transition: width 0.3s ease;
  }
  
  .sidebar-container.collapsed .sidebar {
    width: 60px;
  }
  
  .sidebar {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px;
  }
  
  .nav {
    width: 100%;
  }
  
  .nav-item {
    width: 100%;
  }
  
  .nav-link {
    color: #000;
    cursor: pointer;
  }
  
  .nav-link:hover {
    color: #939292;
  }
  
  .toggle-sidebar-button {
    background-color: rgb(84, 84, 239);
    border: 1px solid black;
    margin: 10px 20px;
    cursor: pointer;
  }
  
  .toggle-sidebar-button:hover {
    background-color: rgb(50, 50, 150);
  }
  
  .toggle-sidebar-button span {
    color: white;
  }
  </style>