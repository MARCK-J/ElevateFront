<script setup>
import { RouterLink } from "vue-router";
import { computed, ref, watch } from "vue";
import { useWindowsWidth } from "../../assets/js/useWindowsWidth";
import { useAppStore } from "@/stores"; // Pinia store
import Swal from "sweetalert2";


import ArrDark from "@/assets/img/down-arrow-dark.svg";
import DownArrWhite from "@/assets/img/down-arrow-white.svg";

// Variables relacionadas con el props
const props = defineProps({
  action: {
    type: Object,
    route: String,
    color: String,
    label: String,
  },
  transparent: {
    type: Boolean,
    default: false,
  },
  light: {
    type: Boolean,
    default: false,
  },
  dark: {
    type: Boolean,
    default: false,
  },
  sticky: {
    type: Boolean,
    default: false,
  },
  darkText: {
    type: Boolean,
    default: false,
  },
});

// Acceso al store de la aplicación
const appStore = useAppStore();
const isLoggedIn = ref(appStore.login); // Estado reactivo para el login
const identidad = ref(appStore.identificador);

// Escuchar cambios en el estado de 'login'
watch(
  () => appStore.login,
  (newValue) => {
    console.log("Login state changed:", newValue); // Depuración
    isLoggedIn.value = newValue;
  }
);

// Logs iniciales para verificar el estado de login al cargar
console.log("Is Logged In:", isLoggedIn.value);
console.log("Identificador del usuario:", identidad.value);

// set arrow  color
function getArrowColor() {
  if (props.transparent && textDark.value) {
    return ArrDark;
  } else if (props.transparent) {
    return DownArrWhite;
  } else {
    return ArrDark;
  }
}
function cerrarSesion() {
  Swal.fire('Éxito', 'Cierre de sesión exitoso', 'success').then(() => {
    window.location.href = '/'; // Asegúrate de ajustar la ruta a la correcta
  });
}


// set text color
const getTextColor = () => {
  let color;
  if (props.transparent && textDark.value) {
    color = "text-dark";
  } else if (props.transparent) {
    color = "text-white";
  } else {
    color = "text-dark";
  }

  return color;
};

// set nav color on mobile && desktop
let textDark = ref(props.darkText);
const { type } = useWindowsWidth();

if (type.value === "mobile") {
  textDark.value = true;
} else if (type.value === "desktop" && textDark.value == false) {
  textDark.value = false;
}

watch(
  () => type.value,
  (newValue) => {
    if (newValue === "mobile") {
      textDark.value = true;
    } else {
      textDark.value = false;
    }
  }
);

const showProfileButton = computed(() => isLoggedIn.value);
</script>

<template>
  <nav
    class="navbar navbar-expand-lg top-0"
    :class="{
      'z-index-3 w-100 shadow-none navbar-transparent position-absolute my-3':
        props.transparent,
      'my-3 blur border-radius-lg z-index-3 py-2 shadow py-2 start-0 end-0 mx-4 position-absolute mt-4':
        props.sticky,
      'navbar-light bg-white py-3': props.light,
      ' navbar-dark bg-gradient-dark z-index-3 py-3': props.dark,
    }"
  >
    <div
      :class="
        props.transparent || props.light || props.dark
          ? 'container'
          : 'container-fluid px-0'
      "
    >
      <RouterLink
        class="navbar-brand d-none d-md-block"
        :class="[
          (props.transparent && textDark.value) || !props.transparent
            ? 'text-dark font-weight-bolder ms-sm-3'
            : 'text-white font-weight-bolder ms-sm-3',
        ]"
        to="/"
        rel="tooltip"
        title="Navbar Pc"
        data-placement="bottom"
      >
        ELEVATE
      </RouterLink>
      <RouterLink
        class="navbar-brand d-block d-md-none"
        :class="
          props.transparent || props.dark
            ? 'text-white'
            : 'font-weight-bolder ms-sm-3'
        "
        to="/"
        rel="tooltip"
        title="Navbar cel"
        data-placement="bottom"
      >
        ELEVATE
      </RouterLink>
      <div
        class="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0"
        id="navigation"
      >
        <ul class="navbar-nav navbar-nav-hover ms-auto">
          <li class="nav-item dropdown dropdown-hover mx-2">
            <a
              role="button"
              class="nav-link ps-2 d-flex cursor-pointer align-items-center"
              :class="getTextColor()"
              id="dropdownMenuPages"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i
                class="material-icons opacity-6 me-2 text-md"
                :class="getTextColor()"
                >dashboard</i
              >
              Paginas
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-2 d-lg-block d-none"
              />
              <img
                :src="getArrowColor()"
                alt="down-arrow"
                class="arrow ms-1 d-lg-none d-block ms-auto"
              />
            </a>
            <div
              class="dropdown-menu dropdown-menu-animation ms-n3 dropdown-md p-3 border-radius-xl mt-0 mt-lg-3"
              aria-labelledby="dropdownMenuPages"
            >
              <div class="row d-none d-lg-block">
                <div class="col-12 px-4 py-2">
                  <div class="row">
                    <div class="position-relative">
                      <div
                        class="dropdown-header text-dark font-weight-bolder d-flex align-items-center px-1"
                      >
                        Paginas de destino
                      </div>
                      <RouterLink
                        :to="{ name: 'about' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span>Sobre nosotros</span>
                      </RouterLink>
                      <RouterLink
                        :to="{ name: 'contactus' }"
                        class="dropdown-item border-radius-md"
                      >
                        <span>Contactanos</span>
                      </RouterLink>

                      <div v-if="isLoggedIn"></div>

                      <div class="RegisterLogin" v-else>
                        <div
                          class="dropdown-header text-dark font-weight-bolder d-flex align-items-center px-0 mt-3"
                        >
                          Cuenta
                        </div>
                        <RouterLink
                          :to="{ name: 'login-view' }"
                          class="dropdown-item border-radius-md"
                        >
                          <span>Iniciar Sesion</span>
                        </RouterLink>
                        <RouterLink
                          :to="{ name: 'register-view' }"
                          class="dropdown-item border-radius-md"
                        >
                          <span>Registro</span>
                        </RouterLink>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <!-- fin de paginas de pc -->              
            </div>
          </li>
          <li v-if="isLoggedIn" class="nav-item mx-2">
            <router-link
              role="button"
              class="nav-link ps-2 d-flex cursor-pointer align-items-center"
              :class="getTextColor()"
              to="/perfil-usuario"
            >
              <i
                class="material-icons opacity-6 me-2 text-md"
                :class="getTextColor()"
                >person</i
              >
              Mi perfil
            </router-link>
          </li>
          <li v-if="isLoggedIn">
            <button @click="cerrarSesion" class="btn btn-danger ms-2" href="/">
              Cerrar Sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
