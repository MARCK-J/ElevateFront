<script setup>
import { RouterLink } from 'vue-router';
defineProps({
  routes: {
    type: Array,
    required: true,
    route: String,
    label: String,
    default: () => [
      {
        route: "/",
        label: "",
      },
    ],
  },
});
</script>
<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li
        v-for="({ route, label }, index) of routes"
        :key="index"
        class="breadcrumb-item"
      >
        <RouterLink v-if="index != routes.length - 1" :to="route">{{ label }}</RouterLink>
        <template v-else>{{ label }}</template>
      </li>
    </ol>
  </nav>
</template>
