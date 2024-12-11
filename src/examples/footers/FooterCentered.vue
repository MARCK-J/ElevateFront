<script setup>
defineProps({
  
  links: {
    type: Array,
    name: String,
    nombreRutas: String,
    default: () => [
      { nombreRutas: "/", name: "Home" },
      { nombreRutas: "/pages/about-us", name: "About Us" },
      {
        nombreRutas: "/pages/register",
        name: "Registrate",
      },
      { nombreRutas: "/pages/contact-us", name: "Contactanos" },
    ],
  },
});
</script>
<template>
  <footer class="footer py-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mb-4 mx-auto text-center">
          <router-link 
            v-for="{ name, nombreRutas } of links"
            :key="name"
            :to=nombreRutas
            class="text-secondary me-xl-5 me-3 mb-sm-0 mb-2"
          >
            {{ name }}
          </router-link>
        </div>
      </div>
      <div class="row">
        <div class="col-8 mx-auto text-center mt-1">
          <p class="mb-0 text-secondary">
            Copyright © {{ new Date().getFullYear() }}Elevate Company
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
