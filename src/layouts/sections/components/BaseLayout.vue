<script setup>
import { ref } from "vue";
import DefaultNavbar from "@/examples/navbars/NavbarDefault.vue";
import CenteredFooter from "@/examples/footers/FooterCentered.vue";
import Breadcrumbs from "@/examples/Breadcrumbs.vue";
import PopUp from "../../../components/PopUp.vue";
import { useAppStore } from "../../../stores";
// Acceder al store de Pinia
const appStore = useAppStore();
const userId = appStore.tipoPersona;
console.log("Identificador de rol: " + userId);

// Define reactive properties
const showPopUp = ref(false);
const isDocente = ref(userId === 2); // Define isDocente como verdadero si userId es 2


// Function to toggle the popup visibility
function togglePopUp() {
  showPopUp.value = !showPopUp.value;
}

// Define props
const props = defineProps({
  breadcrumb: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
</script>
<template>
  <DefaultNavbar light />
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-12 mx-auto">
        <div class="mb-4 w-100 w-md-50 w-lg-25">
          <Breadcrumbs :routes="props.breadcrumb" />
          <h3>{{ props.title }}</h3>
          <div v-if="isDocente">
            <button class="btn btn-primary" @click="togglePopUp">
              Subir Archivos
            </button>
          </div>
          <transition name="fade">
            <PopUp v-if="showPopUp" @close="togglePopUp" />
          </transition>
        </div>
        <slot />
      </div>
    </div>
  </div>
  <CenteredFooter />
</template>
